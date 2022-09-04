import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import BaseHasher from "../BaseHasher";

export default class Ripemd160Hasher extends BaseHasher {

    encode(sourceValue) {
        let hashHex = CryptoJS.RIPEMD160(sourceValue).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }
}
