import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import BaseHasher from "../BaseHasher";

export default class Sha3Hasher extends BaseHasher {

    encode(sourceValue) {
        let hashHex = CryptoJS.SHA3(sourceValue, this.options).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }
}
