import HashAlgorithmEnum from "../enums/HashAlgorithmEnum";
import PolimorphicHasher from "../libs/hashers/hash/PolimorphicHasher";

export default class HashHelper {

    static hash(algorithm, value) {
        let hasher = new PolimorphicHasher(algorithm);
        return hasher.encode(value);
    }

    static createHasherByAlgorithm(algorithm) {
        let hasher = new PolimorphicHasher(algorithm);
        return hasher.getHasherInstance();
    }

    static sha256(value) {
        return this.hash(HashAlgorithmEnum.SHA256, value);
    }

    static ripemd160(value) {
        return this.hash(HashAlgorithmEnum.RIPEMD160, value);
    }
}
