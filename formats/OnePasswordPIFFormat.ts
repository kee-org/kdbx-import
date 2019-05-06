import { ImportDTO } from "../ImportDTO";
import { Consts, ProtectedValue, KdbxEntry } from "kdbxweb";
import { Format } from "./Format";

type PIFRecordTypeMap = { [key: string]: { groupName: string, icon: number }; };
const Icons = Consts.Icons;

export class OnePasswordPIFFormat extends Format {

    private recordTypesByItemType: PIFRecordTypeMap = {
        "webforms.WebForm": { groupName: "", icon: Icons.Key },
        "securenotes.SecureNote": { groupName: "", icon: Icons.Note },
        "wallet.financial.CreditCard": { groupName: "Finance", icon: Icons.Homebanking },
        "passwords.Password": { groupName: "", icon: Icons.Key },
        "identities.Identity": { groupName: "Identity", icon: Icons.Identity },
        "wallet.financial.BankAccountUS": { groupName: "Finance", icon: Icons.Homebanking },
        "wallet.computer.Database": { groupName: "Server", icon: Icons.FolderPackage },
        "wallet.government.DriversLicense": { groupName: "Identity", icon: Icons.Identity },
        "wallet.membership.Membership": { groupName: "Identity", icon: Icons.Identity },
        "wallet.onlineservices.Email.v2": { groupName: "Email", icon: Icons.EMail },
        "wallet.government.HuntingLicense": { groupName: "Identity", icon: Icons.Identity },
        "wallet.membership.RewardProgram": { groupName: "Identity", icon: Icons.Package },
        "wallet.government.Passport": { groupName: "Identity", icon: Icons.Identity },
        "wallet.computer.UnixServer": { groupName: "Server", icon: Icons.NetworkServer },
        "wallet.government.SsnUS": { groupName: "Identity", icon: Icons.Identity },
        "wallet.computer.Router": { groupName: "Server", icon: Icons.ProgramIcons },
        "wallet.computer.License": { groupName: "Identity", icon: Icons.Identity },
        // Legacy
        "wallet.onlineservices.Email": { groupName: "Email", icon: Icons.EMail },
        "wallet.onlineservices.iTunes": { groupName: "Identity", icon: Icons.Identity },
        "wallet.computer.MySQLConnection": { groupName: "Server", icon: Icons.FolderPackage },
        "wallet.onlineservices.FTP": { groupName: "Server", icon: Icons.Key },
        "wallet.onlineservices.DotMac": { groupName: "", icon: Icons.Key },
        "wallet.onlineservices.GenericAccount": { groupName: "", icon: Icons.Key },
        "wallet.onlineservices.InstantMessenger": { groupName: "Identity", icon: Icons.Key },
        "wallet.onlineservices.ISP": { groupName: "Server", icon: Icons.WorldSocket },
        "wallet.onlineservices.AmazonS3": { groupName: "Server", icon: Icons.WorldSocket }
    };

    convert (pif: string) {
        if (!pif || pif.length < 1) return ImportDTO.createError("missing data");

        try {
            const importDTO = new ImportDTO();
            const rootGroup = this.db.getDefaultGroup();
            const recycleBin = this.db.getGroup(this.db.meta.recycleBinUuid);
            this.groupMapping = {};

            pif.split(/(?:\r\n|\r|\n)/).forEach(line => {
                if (!line || line[0] !== "{") {
                    return;
                }
                const item = JSON.parse(line);

                // Ignore things that aren't really entries
                if (["system.folder.Regular", "system.folder.SavedSearch"].indexOf(item.typeName) >= 0) return;

                const typeConfig = this.recordTypesByItemType[item.typeName] || {
                    groupName: "",
                    icon: Consts.Icons.Key
                };
                const group = !typeConfig.groupName ? rootGroup : this.groupFromKey(typeConfig.groupName, rootGroup, "");
                const entry = item.trashed && recycleBin ? this.db.createEntry(recycleBin) : this.db.createEntry(group);
                entry.icon = typeConfig.icon;

                this.addField("Title", item.title, entry);

                const urls: string[] = [];
                if (item.location) {
                    urls.push(item.location);
                }

                if (item.secureContents) {
                    const sc = item.secureContents;
                    if (sc.URLs) {
                        sc.URLs.forEach(url => {
                            if (url.url) urls.push(url.url);
                        });
                    }
                    if (sc.password) {
                        this.addField("Password", sc.password, entry);
                    }
                    if (sc.notesPlain) {
                        this.addField("Notes", this.normaliseLineEndings(sc.notesPlain), entry);
                    }
                    if (sc.fields) {
                        this.convertFields(sc.fields, "designation", "value", "name", entry);
                    }
                    if (sc.sections) {
                        sc.sections.forEach(section => {
                            if (section.fields) {
                                this.convertFields(section.fields, "n", "v", "t", entry);
                            }
                        });
                    }
                }

                this.convertURLs(urls, entry);

                entry.tags = [];
                if (item.openContents) {
                    if (item.openContents.faveIndex) entry.tags.push("Favourite");
                    if (item.openContents.tags) {
                        for (const tag of item.openContents.tags) {
                            entry.tags.push(tag);
                        }
                    }
                }

                if (item.secureContents && item.secureContents.passwordHistory) {
                    this.createPasswordHistory(item.secureContents.passwordHistory, entry);
                }
            });

            importDTO.db = this.db;
            importDTO.attachmentsSize = 0;
            return importDTO;
        } catch (e) {
            return ImportDTO.createError(e);
        }
    }

    private convertFields (fields: any[], designationKey: string, valueKey: string, nameKey: string, entry: KdbxEntry) {
        fields.forEach((field: any) => {
            if (field[valueKey] == null || field[valueKey].toString().trim() === "") {
                return;
            }

            const value = field[valueKey].toString();
            const designation = field[designationKey] != null ? field[designationKey].toString() : null;

            if (designation === "username") {
                this.addField("UserName", value, entry);
                return;
            } else if (designation === "password") {
                this.addField("Password", value, entry);
                return;
            } else if (designation != null && designation.startsWith("TOTP_")) {
                this.addField("otp", value, entry, true);
                return;
            }

            if (!field[nameKey]) return;

            if (this.isIgnoredField(field[nameKey])) return;
            if (value) {
                this.addField(field[nameKey], value, entry, field.k === "concealed");
            }
        });
    }

    private createPasswordHistory (items: any[], entry: KdbxEntry) {
        const importLimit = items.length > this.db.meta.historyMaxItems ? this.db.meta.historyMaxItems : items.length;
        const importStart = items.length - importLimit;

        const currentPassword = entry.fields.Password;
        // const currentModTime = (entry.times as any).lastModTime;

        items.sort((a, b) => a.time - b.time)
            .slice(importStart).forEach((oldPassword: any) => {
                entry.fields.Password = this.db.meta.memoryProtection.password
                    ? ProtectedValue.fromString(oldPassword.value)
                    : oldPassword.value;
                //TODO: kdbxweb doesn't support editing times yet
                //entry.times.lastModTime = oldPassword.time;

                entry.pushHistory();
            });
        entry.fields.Password = currentPassword;
    }
}
