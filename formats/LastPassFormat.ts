import { ImportDTO } from "../ImportDTO";
import * as papaparse from "papaparse";
import * as kdbxweb from "kdbxweb";

type CSVFieldMapping = { [x: string]: { col: string; protectedField: boolean; }};

export class LastPassFormat {
    constructor (private db: kdbxweb.Kdbx) {
    }

    convert (csv: string) {

        const { data, errors, meta } = papaparse.parse(csv, { header: true, skipEmptyLines: true });
        if (!data || data.length < 1) return ImportDTO.createError("missing data");
        if (errors && errors.length >= 1) return ImportDTO.createError(errors);
        if (!meta || !meta.fields || meta.fields.length < 5) return ImportDTO.createError("bad meta fields found");

        const mapping: CSVFieldMapping = {
            Notes: { col: "extra", protectedField: this.db.meta.memoryProtection.Notes },
            Title: { col: "name", protectedField: this.db.meta.memoryProtection.Title },
            Password: { col: "password", protectedField: this.db.meta.memoryProtection.Password },
            URL: { col: "url", protectedField: this.db.meta.memoryProtection.URL },
            UserName: { col: "username", protectedField: this.db.meta.memoryProtection.UserName }
        };

        try {
            const result = this.convertFromCSVRows(data, mapping);
            return result;
        } catch (e) {
            return ImportDTO.createError(e);
        }
    }

    private convertFromCSVRows (dataRows: string[], fieldMapping: CSVFieldMapping) {
        const importDTO = new ImportDTO();
        const group = this.db.getDefaultGroup();

        dataRows.forEach(row => {
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
}
