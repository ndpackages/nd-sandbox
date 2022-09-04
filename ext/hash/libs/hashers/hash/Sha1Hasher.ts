import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import BaseHasher from "../BaseHasher";
import HashAlgorithmEnum from "../../../../../../crypto/encode/domain/enums/HashAlgorithmEnum";

export default class Sha1Hasher extends BaseHasher {

    getAlgorithm(): string {
        return HashAlgorithmEnum.SHA1;
    }

    encode(sourceValue) {
        let hashHex = CryptoJS.SHA1(sourceValue).toString(CryptoJS.enc.Hex);
        let hash = (new HexEncoder()).decode(hashHex);
        return hash;
    }
}
