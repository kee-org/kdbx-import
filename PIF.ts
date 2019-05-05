// Generated from plgx project OnePIF's data model. Experimental. May
// be inaccurate and is currently used only for manual reference.
//
// Config used:
//
// {
//     "include": [
//         "../OnePIF/OnePIF/Dropdown List Types/**/*.cs",
//         "../OnePIF/OnePIF/Records/**/*.cs"
//     ],
//     "exclude": [
//         "./models/foo/bar.cs"
//     ],
//     "namespace": "OnePIF",
//     "output": "./PIF.ts",
//     "camelCase": false,
//     "camelCaseEnums": false,
//     "numericEnums": false,
//     "stringLiteralTypesInsteadOfEnums": false,
//     "customTypeTranslations": {
//         "ProductName": "string",
//         "ProductNumber": "string"
//     }
// }
//
// Namespace manually removed.

// ../OnePIF/OnePIF/Dropdown List Types/EMailV2POPSecurity.cs
export enum EMailV2POPSecurity {
    unknown = "unknown",
    none = "none",
    ssl = "ssl",
    tls = "tls"
}

// ../OnePIF/OnePIF/Dropdown List Types/WebFormFieldType.cs
export enum WebFormFieldType {
    unknown = "unknown",
    T = "T",
    P = "P",
    E = "E",
    R = "R",
    N = "N",
    TEL = "TEL",
    C = "C",
    U = "U",
    B = "B",
    I = "I",
    S = "S",
    RNG = "RNG",
    A = "A"
}

// ../OnePIF/OnePIF/Dropdown List Types/EMailV2SMTPSecurity.cs
export enum EMailV2SMTPSecurity {
    unknown = "unknown",
    none = "none",
    ssl = "ssl",
    tls = "tls"
}

// ../OnePIF/OnePIF/Dropdown List Types/EMailV2POPType.cs
export enum EMailV2POPType {
    unknown = "unknown",
    pop3 = "pop3",
    imap = "imap",
    either = "either"
}

// ../OnePIF/OnePIF/Dropdown List Types/BankAccountType.cs
export enum BankAccountType {
    unknown = "unknown",
    savings = "savings",
    checking = "checking",
    loc = "loc",
    atm = "atm",
    money_market = "money_market",
    other = "other"
}

// ../OnePIF/OnePIF/Dropdown List Types/FieldDesignation.cs
export enum FieldDesignation {
    unknown = "unknown",
    nothing = "nothing",
    username = "username",
    password = "password"
}

// ../OnePIF/OnePIF/Dropdown List Types/CreditCardType.cs
export enum CreditCardType {
    unknown = "unknown",
    mc = "mc",
    visa = "visa",
    amex = "amex",
    diners = "diners",
    carteblanche = "carteblanche",
    discover = "discover",
    jcb = "jcb",
    solo = "solo",
    switch = "switch",
    maestro = "maestro",
    visaelectron = "visaelectron",
    laser = "laser",
    unionpay = "unionpay"
}

// ../OnePIF/OnePIF/Dropdown List Types/DatabaseType.cs
export enum DatabaseType {
    unknown = "unknown",
    db2 = "db2",
    filemaker = "filemaker",
    msaccess = "msaccess",
    mssql = "mssql",
    mysql = "mysql",
    oracle = "oracle",
    postresql = "postresql",
    postgresql = "postgresql",
    sqlite = "sqlite",
    other = "other"
}

// ../OnePIF/OnePIF/Dropdown List Types/EMailPOPAuthentication.cs
export enum EMailPOPAuthentication {
    unknown = "unknown",
    none = "none",
    password = "password",
    md5_challenge_response = "md5_challenge_response",
    kerberized_pop = "kerberized_pop",
    kerberos_v4 = "kerberos_v4",
    kerberos_v5 = "kerberos_v5",
    ntlm = "ntlm"
}

// ../OnePIF/OnePIF/Dropdown List Types/InstantMessengerAccountType.cs
export enum InstantMessengerAccountType {
    unknown = "unknown",
    aol = "aol",
    jabber = "jabber",
    msn = "msn",
    yahoo = "yahoo",
    mobileme = "mobileme",
    dotmac = "dotmac",
    gadu = "gadu",
    gtalk = "gtalk",
    icq = "icq",
    livejournal = "livejournal",
    sametime = "sametime",
    groupwise = "groupwise",
    qq = "qq",
    sip = "sip",
    skype = "skype",
    gizmo = "gizmo"
}

// ../OnePIF/OnePIF/Dropdown List Types/EMailSMTPAuthentication.cs
export enum EMailSMTPAuthentication {
    unknown = "unknown",
    none = "none",
    password = "password",
    md5_challenge_response = "md5_challenge_response",
    kerberized_pop = "kerberized_pop",
    kerberos_v4 = "kerberos_v4",
    kerberos_v5 = "kerberos_v5",
    ntlm = "ntlm"
}

// ../OnePIF/OnePIF/Dropdown List Types/EMailPOPType.cs
export enum EMailPOPType {
    unknown = "unknown",
    pop3 = "pop3",
    imap = "imap",
    either = "either"
}

// ../OnePIF/OnePIF/Dropdown List Types/WirelessSecurity.cs
export enum WirelessSecurity {
    unknown = "unknown",
    none = "none",
    wpa2p = "wpa2p",
    wap2e = "wap2e",
    wpa = "wpa",
    wep = "wep"
}

// ../OnePIF/OnePIF/Dropdown List Types/EMailV2SMTPAuthentication.cs
export enum EMailV2SMTPAuthentication {
    unknown = "unknown",
    none = "none",
    password = "password",
    md5_challenge_response = "md5_challenge_response",
    kerberized_pop = "kerberized_pop",
    kerberos_v4 = "kerberos_v4",
    kerberos_v5 = "kerberos_v5",
    ntlm = "ntlm"
}

// ../OnePIF/OnePIF/Dropdown List Types/EMailSMTPUseSSL.cs
export enum EMailSMTPUseSSL {
    unknown = "unknown",
    yes = "yes",
    no = "no"
}

// ../OnePIF/OnePIF/Dropdown List Types/EMailV2POPAuthentication.cs
export enum EMailV2POPAuthentication {
    unknown = "unknown",
    none = "none",
    password = "password",
    md5_challenge_response = "md5_challenge_response",
    kerberized_pop = "kerberized_pop",
    kerberos_v4 = "kerberos_v4",
    kerberos_v5 = "kerberos_v5",
    ntlm = "ntlm"
}

// ../OnePIF/OnePIF/Dropdown List Types/SectionFieldType.cs
export enum SectionFieldType {
    unknown = "unknown",
    string = "string",
    cctype = "cctype",
    URL = "URL",
    email = "email",
    concealed = "concealed",
    phone = "phone",
    address = "address",
    date = "date",
    monthYear = "monthYear",
    menu = "menu",
    gender = "gender"
}

// ../OnePIF/OnePIF/Dropdown List Types/Gender.cs
export enum Gender {
    unknown = "unknown",
    male = "male",
    female = "female"
}

// ../OnePIF/OnePIF/Dropdown List Types/EMailPOPUseSSL.cs
export enum EMailPOPUseSSL {
    unknown = "unknown",
    yes = "yes",
    no = "no"
}

// ../OnePIF/OnePIF/Records/FTPRecord.cs
export interface FTPSecureContents extends ItemSecureContents {
    server: string;
    path: string;
    username: string;
    password: string;
    provider: string;
    provider_website: string;
    phone_local: string;
    phone_tollfree: string;
}

// ../OnePIF/OnePIF/Records/FTPRecord.cs
export interface FTPRecord extends ItemRecord {
    secureContents: FTPSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/CreditCardRecord.cs
export interface CreditCardSecureContents extends PasswordHistorySecureContents {
    cardholder: string;
    type: CreditCardType;
    ccnum: string;
    cvv: string;
    expiry_yy: string;
    expiry_mm: string;
    validFrom_yy: string;
    validFrom_mm: string;
    bank: string;
    phoneLocal: string;
    phoneTollFree: string;
    phoneIntl: string;
    website: string;
    pin: string;
    creditLimit: string;
    cashLimit: string;
    interest: string;
    issuenumber: string;
}

// ../OnePIF/OnePIF/Records/CreditCardRecord.cs
export interface CreditCardRecord extends ItemRecord {
    secureContents: CreditCardSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/SavedSearchRecord.cs
export interface SavedSearchRecord extends BaseRecord {
    secureContents: SavedSearchSecureContents;
    openContents: SavedSearchOpenContents;
}

// ../OnePIF/OnePIF/Records/SiteItemRecord.cs
export interface SiteItemRecord extends ItemRecord {
    locationKey: string;
    location: string;
}

// ../OnePIF/OnePIF/Records/EMailRecord.cs
export interface EmailSecureContents extends PasswordHistorySecureContents {
    pop_type: EMailPOPType;
    pop_username: string;
    pop_server: string;
    pop_port: string;
    pop_password: string;
    pop_use_ssl: EMailPOPUseSSL;
    pop_authentication: EMailPOPAuthentication;
    smtp_server: string;
    smtp_port: string;
    smtp_username: string;
    smtp_password: string;
    smtp_use_ssl: EMailSMTPUseSSL;
    smtp_authentication: EMailSMTPAuthentication;
    provider: string;
    provider_website: string;
    phone_local: string;
    phone_tollfree: string;
}

// ../OnePIF/OnePIF/Records/EMailRecord.cs
export interface EMailRecord extends ItemRecord {
    secureContents: EmailSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/AmazonS3Record.cs
export interface AmazonS3SecureContents extends ItemSecureContents {
    email: string;
    password: string;
    access_key_id: string;
    access_key: string;
    path: string;
}

// ../OnePIF/OnePIF/Records/AmazonS3Record.cs
export interface AmazonS3Record extends ItemRecord {
    secureContents: AmazonS3SecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/ItemRecord.cs
export interface ItemRecord extends BaseRecord {
    faveIndex: number;
    trashed: boolean;
}

// ../OnePIF/OnePIF/Records/BankAccountUsRecord.cs
export interface BankAccountUsSecureContents extends PasswordHistorySecureContents {
    bankName: string;
    owner: string;
    accountType: BankAccountType;
    routingNo: string;
    accountNo: string;
    swift: string;
    iban: string;
    telephonePin: string;
    branchPhone: string;
    branchAddress: string;
}

// ../OnePIF/OnePIF/Records/BankAccountUsRecord.cs
export interface BankAccountUsRecord extends ItemRecord {
    secureContents: BankAccountUsSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/DotMacRecord.cs
export interface DotMacSecureContents extends ItemSecureContents {
    email: string;
    member_name: string;
    password: string;
    idisk_storage: string;
    renewal_date_yy: string;
    renewal_date_mm: string;
    renewal_date_dd: string;
    activation_key: string;
}

// ../OnePIF/OnePIF/Records/DotMacRecord.cs
export interface DotMacRecord extends ItemRecord {
    secureContents: DotMacSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/HuntingLicenseRecord.cs
export interface HuntingLicenseSecureContents extends ItemSecureContents {
    name: string;
    valid_from_yy: string;
    valid_from_mm: string;
    valid_from_dd: string;
    expires_yy: string;
    expires_mm: string;
    expires_dd: string;
    game: string;
    quota: string;
    state: string;
    country: string;
}

// ../OnePIF/OnePIF/Records/HuntingLicenseRecord.cs
export interface HuntingLicenseRecord extends ItemRecord {
    secureContents: HuntingLicenseSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/UnixServerRecord.cs
export interface UnixServerSecureContents extends PasswordHistorySecureContents {
    url: string;
    username: string;
    password: string;
    admin_console_url: string;
    admin_console_username: string;
    admin_console_password: string;
    name: string;
    website: string;
    support_contact_url: string;
    support_contact_phone: string;
}

// ../OnePIF/OnePIF/Records/UnixServerRecord.cs
export interface UnixServerRecord extends ItemRecord {
    secureContents: UnixServerSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/DriversLicenseRecord.cs
export interface DriversLicenseSecureContents extends ItemSecureContents {
    fullname: string;
    address: string;
    birthdate_yy: string;
    birthdate_mm: string;
    birthdate_dd: string;
    sex: Gender;
    height: string;
    number: string;
    class: string;
    conditions: string;
    state: string;
    country: string;
    expiry_date_yy: string;
    expiry_date_mm: string;
}

// ../OnePIF/OnePIF/Records/DriversLicenseRecord.cs
export interface DriversLicenseRecord extends ItemRecord {
    secureContents: DriversLicenseSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/ITunesRecord.cs
export interface ITunesSecureContents extends ItemSecureContents {
    username: string;
    password: string;
    question: string;
    answer: string;
}

// ../OnePIF/OnePIF/Records/ITunesRecord.cs
export interface ITunesRecord extends ItemRecord {
    secureContents: ITunesSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/IdentityRecord.cs
export interface IdentitySecureContents extends ItemSecureContents {
    firstname: string;
    initial: string;
    lastname: string;
    sex: Gender;
    birthdate_yy: string;
    birthdate_mm: string;
    birthdate_dd: string;
    occupation: string;
    company: string;
    department: string;
    jobtitle: string;
    address1: string;
    address2: string;
    zip: string;
    city: string;
    state: string;
    region: string;
    country: string;
    defphone_local: string;
    defphone: string;
    homephone_local: string;
    homephone: string;
    cellphone_local: string;
    cellphone: string;
    busphone_local: string;
    busphone: string;
    username: string;
    reminderq: string;
    remindera: string;
    email: string;
    website: string;
    icq: string;
    skype: string;
    aim: string;
    yahoo: string;
    msn: string;
    forumsig: string;
}

// ../OnePIF/OnePIF/Records/IdentityRecord.cs
export interface IdentityRecord extends ItemRecord {
    secureContents: IdentitySecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/WebFormRecord.cs
export interface WebFormRecord extends SiteItemRecord {
    secureContents: WebFormSecureContents;
    openContents: SubmittableOpenContents;
}

// ../OnePIF/OnePIF/Records/DatabaseRecord.cs
export interface DatabaseSecureContents extends PasswordHistorySecureContents {
    database_type: DatabaseType;
    hostname: string;
    port: string;
    database: string;
    username: string;
    password: string;
    sid: string;
    alias: string;
    options: string;
}

// ../OnePIF/OnePIF/Records/DatabaseRecord.cs
export interface DatabaseRecord extends ItemRecord {
    secureContents: DatabaseSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/RegularFolderRecord.cs
export interface RegularFolderRecord extends BaseRecord {
    secureContents: ItemSecureContents | SavedSearchSecureContents;
}

// ../OnePIF/OnePIF/Records/MySQLConnectionRecord.cs
export interface MySQLConnectionSecureContents extends ItemSecureContents {
    hostname: string;
    port: string;
    database: string;
    username: string;
    password: string;
}

// ../OnePIF/OnePIF/Records/MySQLConnectionRecord.cs
export interface MySQLConnectionRecord extends ItemRecord {
    secureContents: MySQLConnectionSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/SecureNoteRecord.cs
export interface SecureNoteRecord extends ItemRecord {
    secureContents: ItemSecureContents;
    openContents: OpenContents;
}

// ../OnePIF/OnePIF/Records/RouterRecord.cs
export interface RouterSecureContents extends PasswordHistorySecureContents {
    name: string;
    password: string;
    server: string;
    airport_id: string;
    network_name: string;
    wireless_security: WirelessSecurity;
    wireless_password: string;
    disk_password: string;
}

// ../OnePIF/OnePIF/Records/RouterRecord.cs
export interface RouterRecord extends ItemRecord {
    secureContents: RouterSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/RewardProgramRecord.cs
export interface RewardProgramSecureContents extends PasswordHistorySecureContents {
    company_name: string;
    member_name: string;
    membership_no: string;
    pin: string;
    additional_no: string;
    member_since_yy: string;
    member_since_mm: string;
    customer_service_phone: string;
    reservations_phone: string;
    website: string;
}

// ../OnePIF/OnePIF/Records/RewardProgramRecord.cs
export interface RewardProgramRecord extends ItemRecord {
    secureContents: RewardProgramSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/PassportRecord.cs
export interface PassportSecureContents extends ItemSecureContents {
    type: string;
    issuing_country: string;
    number: string;
    fullname: string;
    sex: Gender;
    nationality: string;
    issuing_authority: string;
    birthdate_yy: string;
    birthdate_mm: string;
    birthdate_dd: string;
    birthplace: string;
    issue_date_yy: string;
    issue_date_mm: string;
    issue_date_dd: string;
    expiry_date_yy: string;
    expiry_date_mm: string;
    expiry_date_dd: string;
}

// ../OnePIF/OnePIF/Records/PassportRecord.cs
export interface PassportRecord extends ItemRecord {
    secureContents: PassportSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/SsnUsRecord.cs
export interface SsnUsSecureContents extends PasswordHistorySecureContents {
    name: string;
    number: string;
}

// ../OnePIF/OnePIF/Records/SsnUsRecord.cs
export interface SsnUsRecord extends ItemRecord {
    secureContents: SsnUsSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/ISPRecord.cs
export interface ISPSecureContents extends ItemSecureContents {
    userid: string;
    password: string;
    pin: string;
    dialup_number: string;
    website: string;
    phone_local: string;
    phone_tollfree: string;
}

// ../OnePIF/OnePIF/Records/ISPRecord.cs
export interface ISPRecord extends ItemRecord {
    secureContents: ISPSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/BaseRecord.cs
export interface BaseRecord {
    uuid: string;
    folderUuid: string;
    typeName: RecordType;
    title: string;
    securityLevel: string;
    contentsHash: string;
    txTimestamp: string;
    createdAt: string;
    updatedAt: string;
}

// ../OnePIF/OnePIF/Records/InstantMessengerRecord.cs
export interface InstantMessengerSecureContents extends ItemSecureContents {
    username: string;
    password: string;
    account_type: InstantMessengerAccountType;
    server: string;
    port: string;
}

// ../OnePIF/OnePIF/Records/InstantMessengerRecord.cs
export interface InstantMessengerRecord extends ItemRecord {
    secureContents: InstantMessengerSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/LicenseRecord.cs
export interface LicenseSecureContents extends ItemSecureContents {
    product_version: string;
    reg_code: string;
    reg_name: string;
    reg_email: string;
    company: string;
    download_link: string;
    publisher_name: string;
    publisher_website: string;
    retail_price: string;
    support_email: string;
    order_date_yy: string;
    order_date_mm: string;
    order_date_dd: string;
    order_number: string;
    order_total: string;
}

// ../OnePIF/OnePIF/Records/LicenseRecord.cs
export interface LicenseRecord extends ItemRecord {
    secureContents: LicenseSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/RecordType.cs
export enum RecordType {
    Unknown = "Unknown",
    RegularFolder = "RegularFolder",
    WebForm = "WebForm",
    SecureNote = "SecureNote",
    CreditCard = "CreditCard",
    Password = "Password",
    Identity = "Identity",
    BankAccountUS = "BankAccountUS",
    Database = "Database",
    DriversLicense = "DriversLicense",
    Membership = "Membership",
    EmailV2 = "EmailV2",
    HuntingLicense = "HuntingLicense",
    RewardProgram = "RewardProgram",
    Passport = "Passport",
    UnixServer = "UnixServer",
    SsnUS = "SsnUS",
    Router = "Router",
    License = "License",
    SavedSearch = "SavedSearch",
    Email = "Email",
    iTunes = "iTunes",
    MySQLConnection = "MySQLConnection",
    FTP = "FTP",
    DotMac = "DotMac",
    GenericAccount = "GenericAccount",
    InstantMessenger = "InstantMessenger",
    ISP = "ISP",
    AmazonS3 = "AmazonS3"
}

// ../OnePIF/OnePIF/Records/PasswordRecord.cs
export interface PasswordSecureContents extends URLListSecureContents {
    password: string;
}

// ../OnePIF/OnePIF/Records/PasswordRecord.cs
export interface PasswordRecord extends SiteItemRecord {
    secureContents: PasswordSecureContents;
    openContents: OpenContents;
}

// ../OnePIF/OnePIF/Records/MembershipRecord.cs
export interface MembershipSecureContents extends PasswordHistorySecureContents {
    org_name: string;
    website: string;
    phone: string;
    member_name: string;
    member_since_yy: string;
    member_since_mm: string;
    expiry_date_yy: string;
    expiry_date_mm: string;
    membership_no: string;
    pin: string;
}

// ../OnePIF/OnePIF/Records/MembershipRecord.cs
export interface MembershipRecord extends ItemRecord {
    secureContents: MembershipSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/GenericAccountRecord.cs
export interface GenericAccountSecureContents extends ItemSecureContents {
    username: string;
    password: string;
}

// ../OnePIF/OnePIF/Records/GenericAccountRecord.cs
export interface GenericAccountRecord extends ItemRecord {
    secureContents: GenericAccountSecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/EMailV2Record.cs
export interface EmailV2SecureContents extends PasswordHistorySecureContents {
    pop_type: EMailV2POPType;
    pop_username: string;
    pop_server: string;
    pop_port: string;
    pop_password: string;
    pop_security: EMailV2POPSecurity;
    pop_authentication: EMailV2POPAuthentication;
    smtp_server: string;
    smtp_port: string;
    smtp_username: string;
    smtp_password: string;
    smtp_security: EMailV2SMTPSecurity;
    smtp_authentication: EMailV2SMTPAuthentication;
    provider: string;
    provider_website: string;
    phone_local: string;
    phone_tollfree: string;
}

// ../OnePIF/OnePIF/Records/EMailV2Record.cs
export interface EmailV2Record extends ItemRecord {
    secureContents: EmailV2SecureContents;
    openContents: ScopedOpenContents;
}

// ../OnePIF/OnePIF/Records/SecureContents/WebFormSecureContents.cs
export interface WebFormField {
    id: string;
    name: string;
    value: string;
    designation: FieldDesignation;
    type: WebFormFieldType;
}

// ../OnePIF/OnePIF/Records/SecureContents/WebFormSecureContents.cs
export interface WebFormSecureContents extends URLListSecureContents {
    fields: WebFormField[];
    htmlAction: string;
    htmlID: string;
    htmlMethod: string;
    htmlName: string;
}

// ../OnePIF/OnePIF/Records/SecureContents/ItemSecureContents.cs
export interface SectionField {
    n: string;
    t: string;
    k: SectionFieldType;
    a: SectionFieldAttributes;
}

// ../OnePIF/OnePIF/Records/SecureContents/ItemSecureContents.cs
export interface SectionFieldAttributes {
    guarded: boolean;
    multiline: boolean;
    generate: boolean;
    clipboardFilter: string;
}

// ../OnePIF/OnePIF/Records/SecureContents/ItemSecureContents.cs
export interface GeneralSectionField extends SectionField {
    v: string;
}

// ../OnePIF/OnePIF/Records/SecureContents/ItemSecureContents.cs
export interface DateSectionField extends SectionField {
    v: string;
}

// ../OnePIF/OnePIF/Records/SecureContents/ItemSecureContents.cs
export interface MonthYearSectionField extends SectionField {
    v: string;
}

// ../OnePIF/OnePIF/Records/SecureContents/ItemSecureContents.cs
export interface AddressValue {
    street: string;
    zip: string;
    city: string;
    state: string;
    country: string;
    region: string;
}

// ../OnePIF/OnePIF/Records/SecureContents/ItemSecureContents.cs
export interface AddressSectionField extends SectionField {
    v: AddressValue;
}

// ../OnePIF/OnePIF/Records/SecureContents/ItemSecureContents.cs
export interface SecureContentsSection {
    name: string;
    title: string;
    fields: SectionField[];
}

// ../OnePIF/OnePIF/Records/SecureContents/ItemSecureContents.cs
export interface ItemSecureContents {
    notesPlain: string;
    sections: SecureContentsSection[];
    customIcon: number;
    PwCustomIcon: any;
}

// ../OnePIF/OnePIF/Records/SecureContents/SavedSearchSecureContents.cs
export interface SavedSearchSecureContents {
    predicate_b64_v4: string;
}

// ../OnePIF/OnePIF/Records/SecureContents/URLListSecureContents.cs
export interface URL {
    label: string;
    url: string;
}

// ../OnePIF/OnePIF/Records/SecureContents/URLListSecureContents.cs
export interface URLListSecureContents extends PasswordHistorySecureContents {
    URLs: URL[];
}

// ../OnePIF/OnePIF/Records/SecureContents/PasswordHistorySecureContents.cs
export interface PasswordHistory {
    value: string;
    time: string;
}

// ../OnePIF/OnePIF/Records/SecureContents/PasswordHistorySecureContents.cs
export interface PasswordHistorySecureContents extends ItemSecureContents {
    passwordHistory: PasswordHistory[];
}

// ../OnePIF/OnePIF/Records/OpenContents/OpenContents.cs
export interface OpenContents {
    tags: string[];
    faveIndex: number;
}

// ../OnePIF/OnePIF/Records/OpenContents/SubmittableOpenContents.cs
export interface SubmittableOpenContents extends ScopedOpenContents {
    autosubmit: string;
}

// ../OnePIF/OnePIF/Records/OpenContents/SavedSearchOpenContents.cs
export interface SavedSearchOpenContents extends OpenContents {
    smartFolderVersion: number;
}

// ../OnePIF/OnePIF/Records/OpenContents/ScopedOpenContents.cs
export interface ScopedOpenContents extends OpenContents {
    scope: string;
}

// ../OnePIF/OnePIF/Records/Attributes/ItemFieldAttribute.cs
export interface ItemFieldAttribute {
    type: SectionFieldType;
    multiline: boolean;
    sectionName: string;
    fieldName: string;
}

// ../OnePIF/OnePIF/Records/Attributes/DateComponentAttribute.cs
export interface DateComponentAttribute {
    datePart: DatePart;
}

// ../OnePIF/OnePIF/Records/Attributes/DateComponentAttribute.cs
export enum DatePart {
    Day = "Day",
    Month = "Month",
    Year = "Year"
}

// ../OnePIF/OnePIF/Records/Attributes/AddressComponentAttribute.cs
export interface AddressComponentAttribute {
    addressPart: AddressPart;
}

// ../OnePIF/OnePIF/Records/Attributes/AddressComponentAttribute.cs
export enum AddressPart {
    Address1 = "Address1",
    Address2 = "Address2",
    ZIP = "ZIP",
    City = "City",
    State = "State",
    Region = "Region",
    Country = "Country"
}

// ../OnePIF/OnePIF/Records/Attributes/MonthYearComponentAttribute.cs
export interface MonthYearComponentAttribute {
    monthYearPart: MonthYearPart;
}

// ../OnePIF/OnePIF/Records/Attributes/MonthYearComponentAttribute.cs
export enum MonthYearPart {
    Month = "Month",
    Year = "Year"
}
