import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import BaseHasher from "../BaseHasher";
import HashAlgorithmEnum from "../../../../../../crypto/encode/domain/enums/HashAlgorithmEnum";

export default class Sha256Hasher extends BaseHasher {

    getAlgorithm(): string {
        return HashAlgorithmEnum.SHA256;
    }

    encode(sourceValue) {
        let hashHex = CryptoJS.SHA256(sourceValue).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }
}
