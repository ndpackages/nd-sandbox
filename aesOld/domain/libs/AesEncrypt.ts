import AesDataEntity from "../../../aes/domain/entities/AesDataEntity";
import CryptoJS from "crypto-js";
import ConvHelper from "../../../core/helpers/encoders/ConvHelper";
import AssertHelper from "../../../core/helpers/AssertHelper";
import AesFormatterInterface from "../interfaces/AesFormatterInterface";
import BinaryEntityFormatter from "./aesFormatters/BinaryEntityFormatter";

export default class AesEncrypt {

    protected keyEntity;
    protected formatter: AesFormatterInterface;

    constructor(keyEntity, formatter: AesFormatterInterface = null) {
        this.formatter = formatter ? formatter : new BinaryEntityFormatter();
        if (typeof keyEntity.encryptKey !== 'string') {
            keyEntity.encryptKey = ConvHelper.toHex(keyEntity.encryptKey);
        }
        if (typeof keyEntity.hmacKey !== 'string') {
            keyEntity.hmacKey = ConvHelper.toHex(keyEntity.hmacKey);
        }
        keyEntity.hmacKey = CryptoJS.enc.Hex.parse(keyEntity.hmacKey);
        this.keyEntity = keyEntity;
    }

    decrypt(aesDataEntity) {
        let encrypted = aesDataEntity.encrypted;
        /*if (this.formatter) {
            encrypted = this.formatter.parse(encrypted);
        }*/


        // const decryptedString = CryptoJS.AES.decrypt(encrypted, 'secret').toString(CryptoJS.enc.Latin1);



        let bytes = CryptoJS.AES.decrypt(encrypted, this.keyEntity.encryptKey, {
            // iv: aesDataEntity.iv,
            //format: this.formatter,
        });

        let decryptedData = bytes.toString(CryptoJS.enc.Latin1);
        decryptedData = Uint8Array.from(Buffer.from(decryptedData, 'latin1'));

        this._checkMac(decryptedData, aesDataEntity.mac);
        // decryptedData = CryptoJS.enc.Utf8.stringify(decryptedData);

        /*if (!(decryptedData instanceof Buffer)) {
            decryptedData = ConvHelper.encode(decryptedData, undefined, ConvHelper.BUFFER);
        }*/



        return decryptedData;
    }

    encrypt(message) {
        const arrayToString = arr => arr.reduce((str, code) => str + String.fromCharCode(code), '');
        if(typeof message !== 'string') {
            message = arrayToString(message);
        }

        message = CryptoJS.enc.Latin1.parse(message);

        let aesDataEntity = new AesDataEntity();
        let encrypted = CryptoJS.AES.encrypt(message, this.keyEntity.encryptKey, {
            //format: this.formatter,
            /*iv: iv*/
        });
        // console.log(encrypted.ciphertext.toString(), encrypted.iv.toString(), encrypted.salt.toString());
        // aesDataEntity.encrypted = ConvHelper.toBuffer(encrypted.toString(), 'base64');
        aesDataEntity.encrypted = (encrypted);
        aesDataEntity.mac = this.generateHmac(message);
        // let macHex = CryptoJS.HmacSHA256(message, this.keyEntity.hmacKey).toString();
        // aesDataEntity.mac = ConvHelper.toBuffer(macHex, 'hex');
        // console.log(aesDataEntity)
        return aesDataEntity;
    }

    protected generateHmac(message) {
        if( message.toString) {

            // message = ConvHelper.toHex(message);
            message = message.toString('hex');
            // message = ConvHelper.toBuffer(message, 'hex');
        }
        // console.log(message);
        let macHex = CryptoJS.HmacSHA256(message, this.keyEntity.hmacKey).toString();
        return ConvHelper.toBuffer(macHex, 'hex');
    }

    protected _checkMac(decryptedData, recipientMacBuffer): void {


        // return;

        let hmac = CryptoJS.HmacSHA256(decryptedData, this.keyEntity.hmacKey).toString();
        let macBuffer = this.generateHmac(decryptedData);

        // console.log(macBuffer, recipientMacBuffer)

        hmac = ConvHelper.toBuffer(hmac, 'hex');
        let isVerifiedMac = AssertHelper.isEqualBuffer(hmac, recipientMacBuffer);

        // let isVerifiedMac = hmac === recipientMac;
        if (!isVerifiedMac) {
            throw new Error('Message Authentication Code (MAC) not valid!');
        }
    }
}
