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

const testData = `UserName, Password, URL, Title, Notes
"fred","fr3d","https://www.fred.fred","the TITLE","some NOTES yep yep"`;

describe("Imports from generic CSV", async () => {

    test("entry with no group", async () => {
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
});

function getFieldText (field: string | ProtectedValue) {
    return field instanceof ProtectedValue ? field.getText() : field;
}
