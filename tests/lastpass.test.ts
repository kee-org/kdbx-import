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

const testData = `url,username,password,extra,name,grouping,fav
https://www.fred.fred,fred1,fr3d1,Some freddy notes,fred,,0
https://www.fredfred.fred,fred2,fr3d2,,fred 2,,0
file:///C:/development/kee/keefox/Firefox%20addon/Test%20Pages/SimpleFormInIFrameContents.htm,test,0Es7qAUv6gaD,,file,,0`;

describe("Imports from LastPass CSV", () => {

    test("entries with no group", () => {
        const importDTO = KdbxImport.fromLastPass(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const group = importDTO.db.getDefaultGroup();
        expect(group.entries.length).toEqual(3);
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.Title)).toEqual("fred");
        expect(getFieldText(entry.fields.URL)).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.UserName)).toEqual("fred1");
        expect(getFieldText(entry.fields.Notes)).toEqual("Some freddy notes");
        expect(getFieldText(entry.fields.Password)).toEqual("fr3d1");
    });
});

function getFieldText (field: string | ProtectedValue) {
    return field instanceof ProtectedValue ? field.getText() : field;
}
