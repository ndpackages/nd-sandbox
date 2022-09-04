import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import BaseHasher from "../BaseHasher";
import HashAlgorithmEnum from "../../../enums/HashAlgorithmEnum";

export default class Ripemd160Hasher extends BaseHasher {

    getAlgorithm(): string {
        return HashAlgorithmEnum.RIPEMD160;
    }

    /*encode(sourceValue) {
        let hashHex = CryptoJS.RIPEMD160(sourceValue).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return new Uint8Array(hash);
    }*/
}
