import { Kdbx } from "kdbxweb";

export class ImportDTO {
    db: Kdbx;
    attachments: ArrayBuffer[];
    attachmentsSize: number;
    error?: any;

    static createError (e: any) {
        const errorDto = new ImportDTO();
        errorDto.error = e;
        return errorDto;
    }
}
