import BaseHasher from "../BaseHasher";
import HashAlgorithmEnum from "../../../enums/HashAlgorithmEnum";

export default class Sha384Hasher extends BaseHasher {

    getAlgorithm(): string {
        return HashAlgorithmEnum.SHA384;
    }
}
