import hash from 'crypto-hashing';
import _ from 'lodash';
import HashAlgorithmEnum from "../enums/HashAlgorithmEnum";
import Sha256Hasher from "../libs/hashers/hash/Sha256Hasher";
import Ripemd160Hasher from "../libs/hashers/hash/Ripemd160Hasher";
import Sha1Hasher from "../libs/hashers/hash/Sha1Hasher";
import Sha512Hasher from "../libs/hashers/hash/Sha512Hasher";
import Sha3Hasher from "../libs/hashers/hash/Sha3Hasher";
import Md5Hasher from "../libs/hashers/hash/Md5Hasher";
import PolimorphicHasher from "../libs/hashers/hash/PolimorphicHasher";

export default class HashHelper {

    protected static classMap = {};

    static hash(algorithm, value) {
        // let hasher = this.createHasherByAlgorithm(algorithm);
        let hasher = new PolimorphicHasher(algorithm);
        return hasher.encode(value);

        // return hash(algorithm, value);
    }

    /*static initClassMap() {
        if(_.isEmpty(this.classMap)) {
            this.classMap[HashAlgorithmEnum.SHA1] = Sha1Hasher;
            this.classMap[HashAlgorithmEnum.SHA256] = Sha256Hasher;
            this.classMap[HashAlgorithmEnum.SHA512] = Sha512Hasher;
            this.classMap[HashAlgorithmEnum.SHA3] = Sha3Hasher;
            this.classMap[HashAlgorithmEnum.RIPEMD160] = Ripemd160Hasher;
            this.classMap[HashAlgorithmEnum.MD5] = Md5Hasher;
        }
    }

    static addAlgorithmClass(algorithm, className) {
        this.initClassMap();
        this.classMap[algorithm] = className;
    }

    static getClassMap() {
        this.initClassMap();
        return this.classMap;
    }*/

    static createHasherByAlgorithm(algorithm) {
        let hasher = new PolimorphicHasher(algorithm);

        // let map = this.getClassMap();
        // let hasherClass = map[algorithm];
        // let hasher = new hasherClass();
        return hasher.getHasherInstance();
    }

    static sha256(value) {
        // let hasher = new Sha256Hasher();
        // return hasher.encode(value);

        return this.hash(HashAlgorithmEnum.SHA256, value);
    }

    static ripemd160(value) {
        // let hasher = new Ripemd160Hasher();
        // return hasher.encode(value);

        return this.hash(HashAlgorithmEnum.RIPEMD160, value);
    }
}
