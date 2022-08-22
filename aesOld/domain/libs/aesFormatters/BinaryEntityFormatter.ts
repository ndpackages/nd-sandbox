import CryptoJS from "crypto-js";
import ConvHelper from "../../../../core/helpers/encoders/ConvHelper";
import AesFormatterInterface from "../../interfaces/AesFormatterInterface";
import BaseXHelper from "../../../../core/helpers/encoders/BaseXHelper";

export default class BinaryEntityFormatter implements AesFormatterInterface {

    stringify(cipherParams) {
        // create json object with ciphertext
        var jsonObj = {
            cipher: ConvHelper.toBuffer(cipherParams.ciphertext.toString(), 'hex'),
        };

        // optionally add iv or salt
        if (cipherParams.iv) {
            jsonObj["iv"] = ConvHelper.toBuffer(cipherParams.iv.toString(), 'hex');
        }

        if (cipherParams.salt) {
            jsonObj["salt"] = ConvHelper.toBuffer(cipherParams.salt.toString(), 'hex');
        }

        // stringify json object
        return jsonObj;
    }

    parse(jsonObj) {
        // parse json string
        // var jsonObj = JSON.parse(jsonStr);

        // extract ciphertext from json object, and create cipher params object
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(BaseXHelper.toBase64(jsonObj['cipher']))
        });
        // optionally extract iv or salt
        if (jsonObj['iv']) {
            cipherParams.iv = CryptoJS.enc.Hex.parse(ConvHelper.toHex(jsonObj['iv']));
        }
        if (jsonObj['salt']) {
            cipherParams.salt = CryptoJS.enc.Hex.parse(ConvHelper.toHex(jsonObj['salt']));
        }
        return cipherParams;
    }
}
