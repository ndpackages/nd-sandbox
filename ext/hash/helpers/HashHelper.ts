import HashAlgorithmEnum from "../enums/HashAlgorithmEnum";
import PolymorphicHasher from "../libs/encoders/hash/PolymorphicHasher";

export default class HashHelper {

    static hash(algorithm, value) {
        let hasher = new PolymorphicHasher(algorithm);
        return hasher.encode(value);
    }

    static createHasherByAlgorithm(algorithm) {
        let hasher = new PolymorphicHasher(algorithm);
        return hasher.getHasherInstance();
    }

    static sha256(value) {
        return this.hash(HashAlgorithmEnum.SHA256, value);
    }

    static ripemd160(value) {
        return this.hash(HashAlgorithmEnum.RIPEMD160, value);
    }
}
