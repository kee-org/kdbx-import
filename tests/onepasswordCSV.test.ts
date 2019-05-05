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


describe("Imports from OnePassword CSV", () => {

    test("entry with nested groups", () => {

        const testData = `,address,infos,AOL/AIM,autosubmit,birth date,blog,business,cell,company,default phone,department,email,first name,forum,forum signature,home,ICQ,initial,job title,last name,master-password,MSN,Notes,occupation,Password,reminder answer,reminder question,scope,secret key,section:address,section:bj3hmwyn555q3now6aagyydssu,section:fewpsq7qfiz2gphlpyackzj4fe,section:internet,section:ivwx2nbz6kt5rhhr3zsgqcmtfu,section:name,section:norwmkdck5oa2xxbsbm2fy7iyy,section:rdts5fiuwupb6u54ytdxueq7pi,section:wooosw7tmszw7bpctuuorwqgj4,section:znewkwbrj5gzj7lzareraknpre,sex,skype,support library,Type,Title,twitter,URL,Username,uuid,videos,website,Yahoo
,,ostqxi,,Default,,,,,,,,,,,,,,,,,,,,,D<INNeT?#?Bf4%\`zA/4i!/'$T,,,,,,,,,,,,,,,,,,Social,mastodon.social,,https://mastodon.social/,ostqxi,,,,
,,ostqxi,,Default,,,,,,,,,,,,,,,,,,,,,"SoNEwvU,kJ%-cIKJ9[c#S;]jB",,,,,,,,,,,,,,,,,,Social,twitter.com,,https://twitter.com/,ostqxi,,,,
,,ostqxi,,Default,,,,,,,,,,,,,,,,,,,,,"1)Btf2EI~Tfb7g2A!Sy',*Sj#",,,,,,,,,,,,,,,,,,Social,news.ycombinator.com,,https://news.ycombinator.com,ostqxi,,,,
,,jsdkyvbwjn,,Default,,,,,,,,,,,,,,,,,,,,,^Vr/|o>_H8X%T]7>f}7|:U!Zs,,,,,,,,,,,,,,,,,,Servers,ovh.com,,https://www.ovh.com/manager/web/,jsdkyvbwjn,,,,
,,bynbyjhqjz,,Default,,,,,,,,,,,,,,,,,,,,,"3Z-VW!i,j(&!zRGPu(hFe]s'(",,,,,,,,,,,,,,,,,,Servers,ovh.com,,https://www.ovh.com/manager/web/,bynbyjhqjz,,,,
,,dpbx@fner.ws,,Default,,,,,,,,,,,,,,,,,,,Pin: 462916,,"ws5T@;_UB[Q|P!8'\`~z%XC'JHFUbf#IX _E0}:HF,[{ei0hBg14",,,,,,,,,,,,,,,,,,Bank,aib,,https://onlinebanking.aib.ie,dpbx@fner.ws,,,,
,,dpbx,,Default,,,,,,,,,,,,,,,,,,,Some freddy notes,,9KVHnx:.S_S;cF\`=CE@e\p{v6,,,,,,,,,,,,,,section data,,,,Emails,dpbx@afoqwdr.tx,,https://afoqwdr.tx,dpbx,someUUID,,,
,,dpbx,,Default,,,,,,,,,,,,,,,,,,,This is a garbage address,,"2cUqe}e9}>IVZf)Ye>3C8ZN,r",,,,,,,,,,,,,,,,,,Emails,dpbx@klivak.xb,,,dpbx,,,,
,,dpbx,,Default,,,,,,,,,,,,,,,,,,,,,rPCkmNkhIa>{izt3C3F823!Go,,,,,,,,,,,,,,,,,,Emails/WS,dpbx@mnyfymt.ws,,https://mail.mnyfymt.ws,dpbx,,,,
,,dpbx,,Default,,,,,,,,,,,,,,,,,,,For financial purpose only!,,mt}h'hSUCY;SU;;A!l[8y3O:8,,,,,,,,,,,,,,,,,,Emails/WS,dpbx@fner.ws,,,dpbx,,,,
,,vkeelpbu,,Default,,,,,,,,,,,,,,,,,,,,,]stDKo{%pk,,,,,,,,,,,,,,,,,,CornerCases,space title,,https://nhysdo.wg,vkeelpbu,,,,
,,,,Default,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,CornerCases,empty entry,,,,,,,
,,vkeelpbu,,Default,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,CornerCases,empty password,,https://nhysdo.wg,vkeelpbu,,,,
,,,,Default,,,,,,,,,,,,,,,,,,,"This is a multiline note entry. Cube shank petroleum guacamole dart mower
acutely slashing upper cringing lunchbox tapioca wrongful unbeaten sift.",,,,,,,,,,,,,,,,,,,,CornerCases,note,,,,,,,`;

        const importDTO = KdbxImport.fromOnePasswordCSV(meta, testData);
        expect(importDTO.error).toBeUndefined();
        expect(importDTO.attachmentsSize).toEqual(0);
        const rootGroup = importDTO.db.getDefaultGroup();
        expect(rootGroup.entries.length).toEqual(0);
        expect(rootGroup.groups.length).toEqual(6); // Recycle bin = [0]
        const group = rootGroup.groups[4];
        expect(group.entries.length).toEqual(2);
        expect(group.name).toEqual("Emails");
        const nestedGroup = group.groups[0];
        expect(nestedGroup.entries.length).toEqual(2);
        expect(nestedGroup.name).toEqual("WS");
        const entry = group.entries[0];
        expect(getFieldText(entry.fields.Title)).toEqual("dpbx@afoqwdr.tx");
        expect(getFieldText(entry.fields.URL)).toEqual("https://afoqwdr.tx");
        expect(getFieldText(entry.fields.UserName)).toEqual("dpbx");
        expect(getFieldText(entry.fields.Notes)).toEqual("Some freddy notes");
        expect(getFieldText(entry.fields.Password)).toEqual("9KVHnx:.S_S;cF`=CE@e\p{v6");
        expect(getFieldText(entry.fields.uuid)).toBeUndefined();
        expect(getFieldText(entry.fields["section:znewkwbrj5gzj7lzareraknpre"])).toBeUndefined();
    });
});

function getFieldText (field: string | ProtectedValue) {
    return field instanceof ProtectedValue ? field.getText() : field;
}
