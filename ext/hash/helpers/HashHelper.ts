import hash from 'crypto-hashing';
import _ from 'lodash';
import HashAlgorithmEnum from "../enums/HashAlgorithmEnum";
import Sha256Hasher from "../libs/hashers/hash/Sha256Hasher";
import Ripemd160Hasher from "../libs/hashers/hash/Ripemd160Hasher";
import Sha1Hasher from "../libs/hashers/hash/Sha1Hasher";
import Sha512Hasher from "../libs/hashers/hash/Sha512Hasher";
import Sha3Hasher from "../libs/hashers/hash/Sha3Hasher";
import Md5Hasher from "../libs/hashers/hash/Md5Hasher";

export default class HashHelper {

    protected static classMap = {};

    static hash(algorithm, value) {
        let hasher = this.createHasherByAlgorithm(algorithm);
        return hasher.encode(value);

        // return hash(algorithm, value);
    }

    static initClassMap() {
        if(_.isEmpty(this.classMap)) {
            this.classMap[HashAlgorithmEnum.SHA1] = Sha1Hasher;
            this.classMap[HashAlgorithmEnum.SHA256] = Sha256Hasher;
            this.classMap[HashAlgorithmEnum.SHA512] = Sha512Hasher;
            this.classMap[HashAlgorithmEnum.SHA3] = Sha3Hasher;
            this.classMap[HashAlgorithmEnum.RIPEMD160] = Ripemd160Hasher;
            this.classMap[HashAlgorithmEnum.MD5] = Md5Hasher;
        }
    }

    static getClassMap() {
        this.initClassMap();
        return this.classMap;
    }

    static createHasherByAlgorithm(algorithm) {
        let map = this.getClassMap();
        let hasherClass = map[algorithm];
        let hasher = new hasherClass();


        /*if(algorithm == HashAlgorithmEnum.SHA1) {
            hasher = new Sha1Hasher();
        } else if(algorithm == HashAlgorithmEnum.SHA256) {
            hasher = new Sha256Hasher();
        } else if(algorithm == HashAlgorithmEnum.SHA512) {
            hasher = new Sha512Hasher();
        } else if(algorithm == HashAlgorithmEnum.SHA3) {
            hasher = new Sha3Hasher();
        } else if(algorithm == HashAlgorithmEnum.RIPEMD160) {
            hasher = new Ripemd160Hasher();
        } else if(algorithm == HashAlgorithmEnum.MD5) {
            hasher = new Md5Hasher();
        }*/
        return hasher;
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
