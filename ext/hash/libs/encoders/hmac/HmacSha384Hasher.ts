import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import BaseHasher from "../BaseHasher";

export default class HmacSha384Hasher extends BaseHasher {

    protected key;

    constructor(key) {
        super();
        this.key = key;
    }

    encode(sourceValue) {
        let hashHex = CryptoJS.HmacSHA384(sourceValue, this.key).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }
}
