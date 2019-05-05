import { KdbxMeta, Credentials, Kdbx, ProtectedValue } from "kdbxweb";
import { GenericCSVFormat } from "./formats/GenericCSVFormat";
import { LastPassFormat } from "./formats/LastPassFormat";
import { OnePasswordCSVFormat } from "./formats/OnePasswordCSVFormat";
import { OnePasswordPIFFormat } from "./formats/OnePasswordPIFFormat";

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

    public static fromLastPass (meta: KdbxMeta, data: string) {
        const db = KdbxImport.createDb(meta, new Credentials(ProtectedValue.fromString("whatever")));
        const converter = new LastPassFormat(db);
        const result = converter.convert(data);
        return result;
    }

    public static fromOnePasswordCSV (meta: KdbxMeta, data: string) {
        const db = KdbxImport.createDb(meta, new Credentials(ProtectedValue.fromString("whatever")));
        const converter = new OnePasswordCSVFormat(db);
        const result = converter.convert(data);
        return result;
    }

    public static fromOnePasswordPIF (meta: KdbxMeta, data: string) {
        const db = KdbxImport.createDb(meta, new Credentials(ProtectedValue.fromString("whatever")));
        const converter = new OnePasswordPIFFormat(db);
        const result = converter.convert(data);
        return result;
    }
}
