import { KdbxEntryField, KdbxMeta, ProtectedValue } from "kdbxweb";
import { KdbxImport } from "../main";

const meta =
    {
        defaultUser: "",
        memoryProtection: {
            title: false,
            userName: false,
            password: true,
            url: false,
            notes: false
        }
    } as KdbxMeta;

describe("Imports from generic CSV", () => {

    test("entry with no group", () => {
        const testData = `UserName, Password, URL, Title, Notes, Tags
"fred","fr3d","https://www.fred.fred","the TITLE","some NOTES yep yep","Tag1,tag 2"`;

        const importDTO = KdbxImport.fromGenericCSV(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const group = importDTO.db.getDefaultGroup();
        expect(group.entries.length).toEqual(1);
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.get("Title"))).toEqual("the TITLE");
        expect(getFieldText(entry.fields.get("URL"))).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.get("UserName"))).toEqual("fred");
        expect(getFieldText(entry.fields.get("Notes"))).toEqual("some NOTES yep yep");
        expect(getFieldText(entry.fields.get("Password"))).toEqual("fr3d");
        expect(entry.tags).toEqual(["Tag1", "tag 2"]);
    });

    test("entry with a group", () => {
        const testData = `UserName, Password, URL, Title, Notes, Group
"fred","fr3d","https://www.fred.fred","the TITLE","some NOTES yep yep","Group name 1"`;

        const importDTO = KdbxImport.fromGenericCSV(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const rootGroup = importDTO.db.getDefaultGroup();
        expect(rootGroup.entries.length).toEqual(0);
        expect(rootGroup.groups.length).toEqual(2); // Recycle bin = [0]
        const group = rootGroup.groups[1];
        expect(group.entries.length).toEqual(1);
        expect(group.name).toEqual("Group name 1");
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.get("Title"))).toEqual("the TITLE");
        expect(getFieldText(entry.fields.get("URL"))).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.get("UserName"))).toEqual("fred");
        expect(getFieldText(entry.fields.get("Notes"))).toEqual("some NOTES yep yep");
        expect(getFieldText(entry.fields.get("Password"))).toEqual("fr3d");
        expect(entry.tags).toEqual([]);
    });

    test("entry with custom fields", () => {
        const testData = `UserName, Password, URL, Title, Notes, Cust1, Custom FIELD 2, cf3
"fred","fr3d","https://www.fred.fred","the TITLE","some NOTES yep yep","cust1",,"cust3"`;

        const importDTO = KdbxImport.fromGenericCSV(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const group = importDTO.db.getDefaultGroup();
        expect(group.entries.length).toEqual(1);
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.get("Title"))).toEqual("the TITLE");
        expect(getFieldText(entry.fields.get("URL"))).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.get("UserName"))).toEqual("fred");
        expect(getFieldText(entry.fields.get("Notes"))).toEqual("some NOTES yep yep");
        expect(getFieldText(entry.fields.get("Password"))).toEqual("fr3d");
        expect(getFieldText(entry.fields.get("cust1"))).toEqual("cust1");
        expect(getFieldText(entry.fields.get("cf3"))).toEqual("cust3");
        expect(getFieldText(entry.fields.get("Custom FIELD 2"))).toBeUndefined();
    });
});

function getFieldText (field?: KdbxEntryField) {
    return field instanceof ProtectedValue ? field.getText() : field;
}
