import { KdbxGroup, Kdbx, KdbxEntry, ProtectedValue } from "kdbxweb";

export class Format {
    protected groupMapping: { [x: string]: KdbxGroup} = {};
    private invalidCharsRegex = /((?:[\0-\x08\x0B\f\x0E-\x1F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]))/g;

    constructor (protected db: Kdbx) {
    }

    protected isIgnoredField (col: string) {
        if (["uuid"].indexOf(col) >= 0) return true;
        return false;
    }

    protected groupFromKey (key: string, rootGroup: KdbxGroup, groupSeparator: string) {
        if (this.groupMapping[key]) return this.groupMapping[key];
        const groupNames = groupSeparator ? key.split(groupSeparator) : [key];
        let targetGroup = rootGroup;
        for (const name of groupNames) {
            const nextGroup = targetGroup.groups.find(g => g.name === name);
            if (nextGroup) {
                targetGroup = nextGroup;
            } else {
                targetGroup = this.db.createGroup(targetGroup, name);
            }
        }
        this.groupMapping[key] = targetGroup;
        return targetGroup;
    }

    protected addField (origName: string, value: string, entry: KdbxEntry, forceProtection: boolean = false) {
        if (origName === "Tags") {
            this.processTags(this.removeInvalidCharacters(value), entry);
            return;
        }
        let name = this.normaliseFieldNameCase(origName);
        while (this.hasValue(entry.fields.get(name))) {
            name = name + " (copy)";
        }
        entry.fields.set(name, (forceProtection || this.db.meta.memoryProtection[this.normaliseFieldNameCaseMemoryProt(origName)])
                ? ProtectedValue.fromString(this.removeInvalidCharacters(value))
                : this.removeInvalidCharacters(value));
    }

    processTags (tags: string, entry: KdbxEntry) {
        if (!tags) return;
        entry.tags = [];
        for (const tag of tags.split(",")) {
            entry.tags.push(tag);
        }
    }

    protected convertURLs (urls: string[], entry: KdbxEntry) {

        const altURLs: string[] = [];
        for (let i=0; i < urls.length; i++) {
            if (i === 0) {
                this.addField("URL", urls[i], entry);
                continue;
            }
            altURLs.push(urls[i]);
        }

        // Support KPRPC additional URLs. No other KPRPC config except that.
        if (altURLs.length === 0) return;

        // In future we might want to take a dependency on the full kprpc library and
        // manipulate extra information but for now multiple URLs is likely to be useful
        // for a number of external export formats.

        const kprpcEntryConfig = `{"version":1,"priority":0,"hide":false,"formFieldList":[],` +
            `"altURLs":${altURLs},"regExURLs":[],"blockedURLs":[],"regExBlockedURLs":[],"alwaysAutoFill":false,"alwaysAutoSubmit":false,"neverAutoFill":false,` +
            `"neverAutoSubmit":false,"blockDomainOnlyMatch":false,"blockHostnameOnlyMatch":false}`;
        this.addField("KPRPC JSON", kprpcEntryConfig, entry, true);
    }

    protected normaliseLineEndings (s: string) {
        return s.split(/(?:\r\n|\r|\n)/).join("\n");
    }

    private normaliseFieldNameCase (name: string) {
        const normalised = name.toLowerCase();
        switch (normalised) {
        case "username": return "UserName";
        case "password": return "Password";
        case "notes": return "Notes";
        case "title": return "Title";
        case "url": return "URL";
        default: return normalised;
        }
    }
    private normaliseFieldNameCaseMemoryProt (name: string) {
        const normalised = name.toLowerCase();
        switch (normalised) {
        case "username": return "userName";
        default: return normalised;
        }
    }

    private hasValue (val: string | ProtectedValue | undefined) {
        if (!val) return false;
        if (val instanceof ProtectedValue) return val.getText().length > 0;
        return val.length > 0;
    }

    protected removeInvalidCharacters (text: string) {
        if (!text) return text;
        return text.replace(this.invalidCharsRegex, "");
    }

}
