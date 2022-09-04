import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import EncodeInterface from "../../../../../core/contract/encoders/EncodeInterface";

export default class HmacSha3Hasher implements EncodeInterface {

    protected key;

    constructor(key) {
        this.key = key;
    }

    encode(sourceValue) {
        let hashHex = CryptoJS.HmacSHA3(sourceValue, this.key).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }
}
