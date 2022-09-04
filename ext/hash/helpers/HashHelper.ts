import hash from 'crypto-hashing';
import HashAlgorithmEnum from "../enums/HashAlgorithmEnum";
import Sha256Hasher from "../libs/hashers/hash/Sha256Hasher";
import Ripemd160Hasher from "../libs/hashers/hash/Ripemd160Hasher";

export default class HashHelper {

    static hash(algorithm, value) {
        return hash(algorithm, value);
    }

    static sha256(value) {
        let hasher = new Sha256Hasher();
        return hasher.encode(value);

        // return hash(HashAlgorithmEnum.SHA256, value);
    }

    static ripemd160(value) {
        let hasher = new Ripemd160Hasher();
        return hasher.encode(value);

        // return hash(HashAlgorithmEnum.RIPEMD160, value);
    }
}
