import {sha256} from "js-sha256";
import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import ConvHelper from "../../../../binary/helpers/ConvHelper";
import CryptoJS from "crypto-js";
import BaseHasher from "../BaseHasher";

export default class HmacSha256Hasher extends BaseHasher {

    protected key;

    constructor(key) {
        super();
        this.key = key;
    }

    encode(sourceValue) {
        return this.generateHmacBySha256Js(sourceValue, this.key);
    }

    protected generateHmacBySha256Js(message, key) {
        let hashHex = sha256.hmac(key, message);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }

    protected generateHmacByCryptoJS(message, key) {
        let hashHex = CryptoJS.HmacSHA256(message, ConvHelper.toHex(key)).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }
}
