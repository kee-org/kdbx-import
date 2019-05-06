import { ImportDTO } from "../ImportDTO";
import { Format } from "./Format";

export class DashlaneFormat extends Format {

    convert (data: string) {
        if (!data || data.length < 1) return ImportDTO.createError("missing data");

        try {
            const importDTO = new ImportDTO();
            const rootGroup = this.db.getDefaultGroup();

            const obj = JSON.parse(data);
            const logins = obj.AUTHENTIFIANT;
            if (!logins) return ImportDTO.createError("no logins found");

            for (const login of logins) {
                if (!login) continue;
                const entry = this.db.createEntry(rootGroup);

                this.addField("Title", login.title, entry);
                this.addField("Password", login.password, entry);
                this.addField("Notes", this.normaliseLineEndings(login.note), entry);
                this.addField("UserName", login.login || login.email, entry);

                const urls: string[] = [];
                if (login.domain) {
                    urls.push(login.domain);
                    this.convertURLs(urls, entry);
                }
            }

            importDTO.db = this.db;
            importDTO.attachmentsSize = 0;
            return importDTO;
        } catch (e) {
            return ImportDTO.createError(e);
        }
    }
}
