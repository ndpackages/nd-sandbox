import AesEncryption from "./AesEncryption";

export default class FormatEncryption {

    aes = null;
    format = null;

    constructor(aes: AesEncryption, format) {
        this.aes = aes;
        this.format = format;
    }

    encrypt(text) {
        let encrypted = this.aes.encrypt(text);
        return this.format.stringify(encrypted);
    }

    decrypt(encryptedStringify) {
        let encryptedParsed = this.format.parse(encryptedStringify);
        return this.aes.decrypt(encryptedParsed);
    }
}
