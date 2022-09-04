import hash from 'crypto-hashing';
import HashAlgorithmEnum from "../enums/HashAlgorithmEnum";

export default class HashHelper {

    static hash(algorithm, value) {
        return hash(algorithm, value);
    }

    static sha256(value) {
        return hash(HashAlgorithmEnum.SHA256, value);
    }

    static ripemd160(value) {
        return hash(HashAlgorithmEnum.RIPEMD160, value);
    }
}
