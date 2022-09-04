import BaseHasher from "./BaseHasher";
import HashAlgorithmEnum from "../../../enums/HashAlgorithmEnum";

export default class Sha224Hasher extends BaseHasher {

    getAlgorithm(): string {
        return HashAlgorithmEnum.SHA224;
    }
}
