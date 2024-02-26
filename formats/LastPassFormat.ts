import { ImportDTO } from "../ImportDTO";
import * as papaparse from "papaparse";
import { GenericCSVFormat, CSVFieldMapping } from "./GenericCSVFormat";
import { KdbxEntry } from "kdbxweb";

export class LastPassFormat extends GenericCSVFormat {

    convert (csv: string) {

        const { data, errors, meta } = papaparse.parse<string>(csv, this.defaultCSVParseConfig);
        if (!data || data.length < 1) return ImportDTO.createError("missing data");
        if (errors && errors.length >= 1) return ImportDTO.createError(errors);
        if (!meta || !meta.fields || meta.fields.length < 5) return ImportDTO.createError("bad meta fields found");

        const mapping: CSVFieldMapping = {
            Notes: { col: "extra", protectedField: this.db.meta.memoryProtection.notes ?? false },
            Title: { col: "name", protectedField: this.db.meta.memoryProtection.title ?? false },
            Password: { col: "password", protectedField: this.db.meta.memoryProtection.password ?? false },
            URL: { col: "url", protectedField: this.db.meta.memoryProtection.url ?? false },
            UserName: { col: "username", protectedField: this.db.meta.memoryProtection.userName ?? false },
            Group: { col: "grouping", protectedField: false },
            Tags: { col: "fav", protectedField: false }
        };

        try {
            const result = this.convertFromCSVRows(data, mapping, "\\");
            return result;
        } catch (e) {
            return ImportDTO.createError(e);
        }
    }

    processTags (tags: string, entry: KdbxEntry) {
        if (tags && tags === "1") {
            entry.tags = ["Favourite"];
        }
    }
}
