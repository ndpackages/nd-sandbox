import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import BaseHasher from "../BaseHasher";
import HashAlgorithmEnum from "../../../enums/HashAlgorithmEnum";

export default class Sha512Hasher extends BaseHasher {

    getAlgorithm(): string {
        return HashAlgorithmEnum.SHA512;
    }

    /*encode(sourceValue) {
        let hashHex = CryptoJS.SHA512(sourceValue).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return new Uint8Array(hash);
    }*/
}
