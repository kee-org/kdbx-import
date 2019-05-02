import { KdbxMeta, Credentials, Kdbx, ProtectedValue } from "kdbxweb";
import { GenericCSVFormat } from "./formats/GenericCSVFormat";

export class KdbxImport {

    private static createDb (meta: KdbxMeta, credentials: Credentials) {
        const db = Kdbx.create(credentials, "Imported DB");
        db.meta.defaultUser = meta.defaultUser;
        Object.assign(db.meta.memoryProtection, meta.memoryProtection);
        return db;
    }

    public static fromGenericCSV (meta: KdbxMeta, data: string) {
        const db = KdbxImport.createDb(meta, new Credentials(ProtectedValue.fromString("whatever")));
        const converter = new GenericCSVFormat(db);
        const result = converter.convert(data);
        return result;
    }

}