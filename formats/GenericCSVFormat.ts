import { ImportDTO } from "../ImportDTO";
import * as papaparse from "papaparse";
import { Format } from "./Format";

type CSVFieldMapping = { [x: string]: { col: string; protectedField: boolean; }};

export class GenericCSVFormat extends Format {
    protected defaultCSVParseConfig = { header: true, skipEmptyLines: true, trimHeaders: true };

    convert (csv: string) {

        const { data, errors, meta } = papaparse.parse(csv, this.defaultCSVParseConfig);
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
        this.groupMapping = {};

        dataRows.forEach(row => {
            const processedStandardFields: string[] = [];
            const groupName = fieldMapping["Group"];
            const groupValue = groupName && groupName.col ? row[groupName.col] : undefined;
            const group = !groupValue ? rootGroup : this.groupFromKey(groupValue, rootGroup, groupSeparator);
            const entry = this.db.createEntry(group);
            Object.keys(fieldMapping).forEach(kdbxField => {
                const { col: csvField, protectedField } = fieldMapping[kdbxField];
                const value = row[csvField];
                if (value) {
                    this.addField(kdbxField, value, entry, protectedField);
                    processedStandardFields.push(csvField);
                }
            });
            Object.keys(row).forEach(col => {
                if (processedStandardFields.indexOf(col) >= 0 || this.isIgnoredField(col)) return;
                const value = row[col];
                if (value) {
                    this.addField(col, value, entry);
                }
            });
        });

        importDTO.db = this.db;
        importDTO.attachmentsSize = 0;
        return importDTO;
    }

}
