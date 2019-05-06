// tslint:disable:max-line-length
import { KdbxMeta, ProtectedValue } from "kdbxweb";
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


describe("Imports from Dashlane JSON", () => {

    test("Dashlane JSON", () => {

        const testData = JSON.stringify(
            {
                AUTHENTIFIANT: [
                    {
                        note: "Test note",
                        domain: "https://www.google.com",
                        login: "Username",
                        email: "email@email.com",
                        password: "pass",
                        title: "Title example"
                    },
                    {
                        note: "Test note 2",
                        domain: "www.google.com",
                        login: "",
                        email: "email@email.com",
                        password: "pass2",
                        title: "Title example 2"
                    }
                ] }
        );

        const importDTO = KdbxImport.fromDashlane(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const rootGroup = importDTO.db.getDefaultGroup();
        expect(rootGroup.entries.length).toEqual(2);
        expect(rootGroup.groups.length).toEqual(1); // Recycle bin = [0]
        const entry1 = rootGroup.entries[0];
        const entry2 = rootGroup.entries[1];
        expect(getFieldText(entry1.fields.Title)).toEqual("Title example");
        expect(getFieldText(entry1.fields.URL)).toEqual("https://www.google.com");
        expect(getFieldText(entry1.fields.UserName)).toEqual("Username");
        expect(getFieldText(entry1.fields.Notes)).toEqual("Test note");
        expect(getFieldText(entry1.fields.Password)).toEqual("pass");
        expect(getFieldText(entry1.fields.uuid)).toBeUndefined();
        expect(entry1.history.length).toEqual(0);
        expect(entry1.tags).toEqual([]);
        expect(getFieldText(entry2.fields.Title)).toEqual("Title example 2");
        expect(getFieldText(entry2.fields.URL)).toEqual("www.google.com");
        expect(getFieldText(entry2.fields.UserName)).toEqual("email@email.com");
        expect(getFieldText(entry2.fields.Notes)).toEqual("Test note 2");
        expect(getFieldText(entry2.fields.Password)).toEqual("pass2");
    });
});

function getFieldText (field: string | ProtectedValue) {
    return field instanceof ProtectedValue ? field.getText() : field;
}
