import CryptoJS from "crypto-js";
import AesFormatterInterface from "../../interfaces/AesFormatterInterface";

export default class EntityFormatter implements AesFormatterInterface {

    stringify(cipherParams) {
        // create json object with ciphertext
        var jsonObj = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};

        // optionally add iv or salt
        if (cipherParams.iv) {
            jsonObj["iv"] = cipherParams.iv.toString();
        }

        if (cipherParams.salt) {
            jsonObj["s"] = cipherParams.salt.toString();
        }

        // stringify json object
        return jsonObj;
    }

    parse(jsonObj) {
        // parse json string
        // var jsonObj = JSON.parse(jsonStr);

        // extract ciphertext from json object, and create cipher params object
        var cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(jsonObj['ct'])
        });
        // optionally extract iv or salt
        if (jsonObj['iv']) {
            cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj['iv']);
        }
        if (jsonObj['s']) {
            cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj['s']);
        }
        return cipherParams;
    }
}
