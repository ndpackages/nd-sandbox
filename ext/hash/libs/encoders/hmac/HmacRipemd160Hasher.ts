import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import BaseHasher from "../BaseHasher";

export default class HmacRipemd160Hasher extends BaseHasher {

    protected key;

    constructor(key) {
        super();
        this.key = key;
    }

    encode(sourceValue) {
        let hashHex = CryptoJS.RIPEMD160(sourceValue, this.key).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }
}
