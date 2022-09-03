import AesDataEntity from "../entities/AesDataEntity";
import * as crypto from "crypto";
import Utf8Encoder from "../../../../ext/string/libs/encoders/Utf8Encoder";
import aesjs from 'aes-js';

var hash = require('hash.js');

// https://www.npmjs.com/package/aes-js

export default class AesEncryption {

    protected keyEntity;
    protected isCheckMac: boolean = true;

    constructor(keyEntity, isCheckMac: boolean = true) {
        this.keyEntity = keyEntity;
        this.isCheckMac = isCheckMac;
    }

    encrypt(message, iv = null): AesDataEntity {
        let messageBytes;
        if (message instanceof Uint8Array) {
            messageBytes = message;
        } else {
            let utf8Encoder = new Utf8Encoder();
            messageBytes = utf8Encoder.decode(message);
        }


        if (iv == null) {
            iv = crypto.randomBytes(16);
        }
        let aesCbc = new aesjs.ModeOfOperation.ctr(this.keyEntity.encryptKey, iv);

        let aesDataEntity = new AesDataEntity();
        aesDataEntity.encrypted = aesCbc.encrypt(messageBytes);
        aesDataEntity.iv = iv;
        aesDataEntity.mac = this.generateHmac(messageBytes);
        return aesDataEntity;
    }

    decrypt(aesDataEntity: AesDataEntity) {
// The cipher-block chaining mode of operation maintains internal
// state, so to decrypt a new instance must be instantiated.
        let aesCbc = new aesjs.ModeOfOperation.ctr(this.keyEntity.encryptKey, aesDataEntity.iv);
        let decryptedBytes = aesCbc.decrypt(aesDataEntity.encrypted);
        this.checkMac(decryptedBytes, aesDataEntity.mac);
        return decryptedBytes;
    }

    protected generateHmac(message) {
        let arr = hash
            .hmac(hash.sha256)
            .update(this.keyEntity.hmacKey)
            .update(message)
            .digest();
        return new Uint8Array(arr);
    }

    protected checkMac(decryptedData, recipientMacBuffer): void {
        if (this.isCheckMac === false) {
            return;
        }
        let macBuffer = this.generateHmac(decryptedData);
        let isVerifiedMac = macBuffer.toString() === recipientMacBuffer.toString();
        if (!isVerifiedMac) {
            throw new Error('Message Authentication Code (MAC) not valid!');
        }
    }
}
