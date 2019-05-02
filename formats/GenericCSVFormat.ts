import { ImportDTO } from "../ImportDTO";
import * as papaparse from "papaparse";
import * as kdbxweb from "kdbxweb";

type CSVFieldMapping = { [x: string]: { col: string; protectedField: boolean; }};

export class GenericCSVFormat {
    private groupMapping: { [x: string]: kdbxweb.KdbxGroup} = {};

    constructor (protected db: kdbxweb.Kdbx) {
    }

    convert (csv: string) {

        const { data, errors, meta } = papaparse.parse(csv, { header: true, skipEmptyLines: true });
        if (!data || data.length < 1) return ImportDTO.createError("missing data");
        if (errors && errors.length >= 1) return ImportDTO.createError(errors);
        if (!meta || !meta.fields || meta.fields.length < 5) return ImportDTO.createError("bad meta fields found");

        const mapping: CSVFieldMapping = {};

        meta.fields.forEach(field => {
            switch (field.trim().toLowerCase()) {
            case "notes": mapping["Notes"] = { col: field, protectedField: this.db.meta.memoryProtection.Notes }; break;
            case "title": mapping["Title"] = { col: field, protectedField: this.db.meta.memoryProtection.Title }; break;
            case "password": mapping["Password"] = { col: field, protectedField: this.db.meta.memoryProtection.Password }; break;
            case "username": mapping["UserName"] = { col: field, protectedField: this.db.meta.memoryProtection.UserName }; break;
            case "user name": mapping["UserName"] = { col: field, protectedField: this.db.meta.memoryProtection.UserName }; break;
            case "url": mapping["URL"] = { col: field, protectedField: this.db.meta.memoryProtection.URL }; break;
            case "group": mapping["Group"] = { col: field, protectedField: false }; break;
            }
        });

        if (!mapping.Title || !mapping.Password || !mapping.UserName || !mapping.URL) return ImportDTO.createError("mapping column names failed");

        try {
            const result = this.convertFromCSVRows(data, mapping);
            return result;
        } catch (e) {
            return ImportDTO.createError(e);
        }
    }

    protected convertFromCSVRows (dataRows: string[], fieldMapping: CSVFieldMapping, groupSeparator: string = "") {
        const importDTO = new ImportDTO();
        const rootGroup = this.db.getDefaultGroup();

        dataRows.forEach(row => {
            const groupName = fieldMapping["Group"];
            const groupValue = groupName && groupName.col ? row[groupName.col] : undefined;
            const group = !groupValue ? rootGroup : this.groupFromKey(groupValue, rootGroup, groupSeparator);
            const entry = this.db.createEntry(group);
            Object.keys(fieldMapping).forEach(kdbxField => {
                const { col: csvField, protectedField } = fieldMapping[kdbxField];
                const value = row[csvField];
                if (value) {
                    entry.fields[kdbxField] = protectedField
                        ? kdbxweb.ProtectedValue.fromString(value)
                        : value;
                }
            });
        });

        importDTO.db = this.db;
        importDTO.attachmentsSize = 0;
        return importDTO;
    }

    private groupFromKey (key: string, rootGroup: kdbxweb.KdbxGroup, groupSeparator: string) {
        if (groupSeparator) throw new Error("Group separators not implemented");
        if (this.groupMapping[key]) return this.groupMapping[key];
        const group = this.db.createGroup(rootGroup, key);
        this.groupMapping[key] = group;
        return group;
    }
}
