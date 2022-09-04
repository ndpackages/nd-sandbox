import BaseHasher from "../BaseHasher";
import HashAlgorithmEnum from "../../../enums/HashAlgorithmEnum";

export default class Ripemd160Hasher extends BaseHasher {

    getAlgorithm(): string {
        return HashAlgorithmEnum.RIPEMD160;
    }
}
