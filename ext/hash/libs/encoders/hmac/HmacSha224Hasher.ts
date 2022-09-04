import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import EncodeInterface from "../../../../../core/contract/encoders/EncodeInterface";

export default class HmacSha224Hasher implements EncodeInterface {

    protected key;

    constructor(key) {
        this.key = key;
    }

    encode(sourceValue) {
        let hashHex = CryptoJS.HmacSHA224(sourceValue, this.key).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }
}
