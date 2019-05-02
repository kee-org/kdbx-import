import { KdbxMeta, ProtectedValue } from "kdbxweb";
import { KdbxImport } from "../main";

const meta =
    {
        defaultUser: "none",
        memoryProtection: {
            title: false,
            userName: false,
            password: true,
            url: false,
            notes: false
        }
    } as KdbxMeta;

describe("Imports from generic CSV", async () => {

    test("entry with no group", async () => {
        const testData = `UserName, Password, URL, Title, Notes
"fred","fr3d","https://www.fred.fred","the TITLE","some NOTES yep yep"`;

        const importDTO = KdbxImport.fromGenericCSV(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const group = importDTO.db.getDefaultGroup();
        expect(group.entries.length).toEqual(1);
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.Title)).toEqual("the TITLE");
        expect(getFieldText(entry.fields.URL)).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.UserName)).toEqual("fred");
        expect(getFieldText(entry.fields.Notes)).toEqual("some NOTES yep yep");
        expect(getFieldText(entry.fields.Password)).toEqual("fr3d");
    });

    test("entry with a group", async () => {
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
        expect(getFieldText(entry.fields.Title)).toEqual("the TITLE");
        expect(getFieldText(entry.fields.URL)).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.UserName)).toEqual("fred");
        expect(getFieldText(entry.fields.Notes)).toEqual("some NOTES yep yep");
        expect(getFieldText(entry.fields.Password)).toEqual("fr3d");
    });
});

function getFieldText (field: string | ProtectedValue) {
    return field instanceof ProtectedValue ? field.getText() : field;
}
