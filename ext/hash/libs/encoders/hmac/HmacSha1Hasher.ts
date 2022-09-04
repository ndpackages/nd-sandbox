import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import EncodeInterface from "../../../../../core/contract/encoders/EncodeInterface";

export default class HmacSha1Hasher implements EncodeInterface {

    protected key;

    constructor(key) {
        this.key = key;
    }

    encode(sourceValue) {
        let hashHex = CryptoJS.HmacSHA1(sourceValue, this.key).toString(CryptoJS.enc.Hex);
        return (new HexEncoder()).decode(hashHex);
    }
}
