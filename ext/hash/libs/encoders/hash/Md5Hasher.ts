import BaseHasher from "../BaseHasher";
import HashAlgorithmEnum from "../../../enums/HashAlgorithmEnum";

export default class Md5Hasher extends BaseHasher {

    getAlgorithm(): string {
        return HashAlgorithmEnum.MD5;
    }
}
