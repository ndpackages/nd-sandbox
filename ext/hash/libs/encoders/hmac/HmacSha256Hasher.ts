import {sha256} from "js-sha256";
import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import ConvHelper from "../../../../binary/helpers/ConvHelper";
import CryptoJS from "crypto-js";
import EncodeInterface from "../../../../../core/contract/encoders/EncodeInterface";

export default class HmacSha256Hasher implements EncodeInterface {

    protected key;

    constructor(key) {
        this.key = key;
    }

    encode(sourceValue) {
        return this.generateHmacBySha256Js(sourceValue, this.key);
        // return this.generateHmacByCryptoJS(sourceValue, this.key);
    }

    protected generateHmacBySha256Js(message, key) {
        let hashHex = sha256.hmac(key, message);
        return (new HexEncoder()).decode(hashHex);
    }

    protected generateHmacByCryptoJS(message, key) {
        let hashHex = CryptoJS.HmacSHA256(message, ConvHelper.toHex(key)).toString(CryptoJS.enc.Hex);
        return (new HexEncoder()).decode(hashHex);
    }
}
