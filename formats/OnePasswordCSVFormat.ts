import { ImportDTO } from "../ImportDTO";
import * as papaparse from "papaparse";
import { GenericCSVFormat, CSVFieldMapping } from "./GenericCSVFormat";

export class OnePasswordCSVFormat extends GenericCSVFormat {

    convert (csv: string) {

        const { data, errors, meta } = papaparse.parse(csv, this.defaultCSVParseConfig);
        if (!data || data.length < 1) return ImportDTO.createError("missing data");
        if (errors && errors.length >= 1) return ImportDTO.createError(errors);
        if (!meta || !meta.fields || meta.fields.length < 5) return ImportDTO.createError("bad meta fields found");

        const mapping: CSVFieldMapping = {
            Notes: { col: "Notes", protectedField: this.db.meta.memoryProtection.Notes },
            Title: { col: "Title", protectedField: this.db.meta.memoryProtection.Title },
            Password: { col: "Password", protectedField: this.db.meta.memoryProtection.Password },
            URL: { col: "URL", protectedField: this.db.meta.memoryProtection.URL },
            UserName: { col: "Username", protectedField: this.db.meta.memoryProtection.UserName },
            Group: { col: "Type", protectedField: false }
        };

        try {
            const result = this.convertFromCSVRows(data, mapping, "/");
            return result;
        } catch (e) {
            return ImportDTO.createError(e);
        }
    }

    isIgnoredField (col: string) {
        if (col.startsWith("section:")) return true;
        return super.isIgnoredField(col);
    }
}
