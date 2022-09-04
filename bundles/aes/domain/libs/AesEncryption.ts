import AesDataEntity from "../entities/AesDataEntity";
import * as crypto from "crypto";
import Utf8Encoder from "../../../../ext/string/libs/encoders/Utf8Encoder";
import aesjs from 'aes-js';
// import hash from 'hash.js';
import {sha256} from 'js-sha256';
import ConvHelper from "../../../../ext/binary/helpers/ConvHelper";
import Uint8ArrayHelper from "../../../../ext/binary/helpers/Uint8ArrayHelper";
import HexEncoder from "../../../../ext/baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";

// var hash = require('hash.js');

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

    /*protected generateHmacByHashJs(message, key) {
        let arr = hash
            .hmac(hash.sha256)
            .update(key)
            .update(message)
            .digest();
        return arr;
    }*/

    protected generateHmacByCryptoJS(message, key) {
        let hashHex = CryptoJS.HmacSHA256(message, key).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }

    protected generateHmacBySha256Js(message, key) {
        let hashHex = sha256.hmac(key, message);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }

    protected generateHmac(message) {

        // message = 'Message';
        // let key = 'Secret Passphrase';
        let key = this.keyEntity.hmacKey;

        let arr = this.generateHmacBySha256Js(message, key);
        let str = (new HexEncoder()).encode(arr);
        // console.log(arr, str);

        return new Uint8Array(arr);
    }

    /*protected generateHmac222(message) {
        let arr = hash
            .hmac(hash.sha256)
            .update(this.keyEntity.hmacKey)
            .update(message)
            .digest();
        return new Uint8Array(arr);
    }*/

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
