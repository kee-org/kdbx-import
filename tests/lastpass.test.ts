// tslint:disable:ter-no-irregular-whitespace
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


describe("Imports from LastPass CSV", () => {

    test("entries with no group", () => {
        const testData = `url,username,password,extra,name,grouping,fav
https://www.fred.fred,fred1,fr3d1,Some freddy notes,fred,,0
https://www.fredfred.fred,fred2,fr3d2,,fred 2,,0
file:///C:/development/kee/keefox/Firefox%20addon/Test%20Pages/SimpleFormInIFrameContents.htm,test,0Es7qAUv6gaD,,file,,0`;

        const importDTO = KdbxImport.fromLastPass(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const group = importDTO.db.getDefaultGroup();
        expect(group.entries.length).toEqual(3);
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.get("Title"))).toEqual("fred");
        expect(getFieldText(entry.fields.get("URL"))).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.get("UserName"))).toEqual("fred1");
        expect(getFieldText(entry.fields.get("Notes"))).toEqual("Some freddy notes");
        expect(getFieldText(entry.fields.get("Password"))).toEqual("fr3d1");
    });

    test("entry with a group", () => {
        const testData = `url,username,password,extra,name,grouping,fav
https://www.fred.fred,fred1,fr3d1,Some freddy notes,fred,Group name 1,0
https://www.fredfred.fred,fred2,fr3d2,,fred 2,Group name 1,0
file:///C:/development/kee/keefox/Firefox%20addon/Test%20Pages/SimpleFormInIFrameContents.htm,test,0Es7qAUv6gaD,,file,,0`;

        const importDTO = KdbxImport.fromLastPass(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const rootGroup = importDTO.db.getDefaultGroup();
        expect(rootGroup.entries.length).toEqual(1);
        expect(rootGroup.groups.length).toEqual(2); // Recycle bin = [0]
        const group = rootGroup.groups[1];
        expect(group.entries.length).toEqual(2);
        expect(group.name).toEqual("Group name 1");
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.get("Title"))).toEqual("fred");
        expect(getFieldText(entry.fields.get("URL"))).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.get("UserName"))).toEqual("fred1");
        expect(getFieldText(entry.fields.get("Notes"))).toEqual("Some freddy notes");
        expect(getFieldText(entry.fields.get("Password"))).toEqual("fr3d1");
    });

    test("entry with nested groups", () => {
        const testData = `url,username,password,extra,name,grouping,fav
https://www.fred.fred,fred1,fr3d1,Some freddy notes,fred,Group name 1,0
https://www.fredfred.fred,fred2,fr3d2,,fred 2,Group name 1\\Group name 2,0
file:///C:/development/kee/keefox/Firefox%20addon/Test%20Pages/SimpleFormInIFrameContents.htm,test,0Es7qAUv6gaD,,file,,0`;

        const importDTO = KdbxImport.fromLastPass(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const rootGroup = importDTO.db.getDefaultGroup();
        expect(rootGroup.entries.length).toEqual(1);
        expect(rootGroup.groups.length).toEqual(2); // Recycle bin = [0]
        const group = rootGroup.groups[1];
        expect(group.entries.length).toEqual(1);
        expect(group.name).toEqual("Group name 1");
        const nestedGroup = group.groups[0];
        expect(nestedGroup.entries.length).toEqual(1);
        expect(nestedGroup.name).toEqual("Group name 2");
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.get("Title"))).toEqual("fred");
        expect(getFieldText(entry.fields.get("URL"))).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.get("UserName"))).toEqual("fred1");
        expect(getFieldText(entry.fields.get("Notes"))).toEqual("Some freddy notes");
        expect(getFieldText(entry.fields.get("Password"))).toEqual("fr3d1");
        const nestedEntry = nestedGroup.entries[0];
        expect(getFieldText(nestedEntry.fields.get("Title"))).toEqual("fred 2");
        expect(getFieldText(nestedEntry.fields.get("URL"))).toEqual("https://www.fredfred.fred");
        expect(getFieldText(nestedEntry.fields.get("UserName"))).toEqual("fred2");
        expect(getFieldText(nestedEntry.fields.get("Notes"))).toEqual("");
        expect(getFieldText(nestedEntry.fields.get("Password"))).toEqual("fr3d2");
    });

    test("entries get correct tags", () => {
        const testData = `url,username,password,extra,name,grouping,fav
https://www.fred.fred,fred1,fr3d1,Some freddy notes,fred,,0
https://www.fredfred.fred,fred2,fr3d2,,fred 2,,1`;

        const importDTO = KdbxImport.fromLastPass(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const group = importDTO.db.getDefaultGroup();
        expect(group.entries.length).toEqual(2);
        expect(group.entries[0].tags).toEqual([]);
        expect(getFieldText(group.entries[0].fields.get('tags'))).toBeUndefined();
        expect(group.entries[1].tags).toEqual(["Favourite"]);
    });

    test("entry with bad data", () => {
        const testData = `url,username,password,extra,name,grouping,fav
https://www.fred.fred,fred1,fr3d1,"Some
freddy \tnotes",fred,,0`;

        const importDTO = KdbxImport.fromLastPass(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const group = importDTO.db.getDefaultGroup();
        expect(group.entries.length).toEqual(1);
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.get("Title"))).toEqual("fred");
        expect(getFieldText(entry.fields.get("URL"))).toEqual("https://www.fred.fred");
        expect(getFieldText(entry.fields.get("UserName"))).toEqual("fred1");
        expect(getFieldText(entry.fields.get("Notes"))).toEqual(`Some
freddy\tnotes`);
        expect(getFieldText(entry.fields.get("Password"))).toEqual("fr3d1");
    });
});

function getFieldText (field?: KdbxEntryField) {
    return field instanceof ProtectedValue ? field.getText() : field;
}
