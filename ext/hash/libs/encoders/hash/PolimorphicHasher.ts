import BaseHasher from "../BaseHasher";
import HashAlgorithmEnum from "../../../enums/HashAlgorithmEnum";
import Sha1Hasher from "./Sha1Hasher";
import Sha256Hasher from "./Sha256Hasher";
import Sha512Hasher from "./Sha512Hasher";
import Sha3Hasher from "./Sha3Hasher";
import Ripemd160Hasher from "./Ripemd160Hasher";
import Md5Hasher from "./Md5Hasher";
import _ from 'lodash';
import Sha384Hasher from "./Sha384Hasher";
import Sha224Hasher from "./Sha224Hasher";

export default class PolimorphicHasher extends BaseHasher {

    protected classMap: object = {};
    protected algorithm: string;

    constructor(algorithm: string, classMap: object = {}) {
        super();
        this.algorithm = algorithm;
        let allClassMap = PolimorphicHasher.getDefaultClassMap();
        if (!_.isEmpty(classMap)) {
            allClassMap = _.merge(allClassMap, classMap);
        }
        this.classMap = allClassMap;
    }

    encode(value) {
        let hasher = this.getHasherInstance();
        return hasher.encode(value);
    }

    getAlgorithm(): string {
        return this.algorithm;
    }

    addAlgorithmClass(algorithm, className) {
        this.classMap[algorithm] = className;
    }

    getHasherInstance() {
        return this.createHasherByAlgorithm(this.algorithm);
    }

    private static getDefaultClassMap() {
        let map = {};
        map[HashAlgorithmEnum.SHA1] = Sha1Hasher;
        map[HashAlgorithmEnum.SHA224] = Sha224Hasher;
        map[HashAlgorithmEnum.SHA256] = Sha256Hasher;
        map[HashAlgorithmEnum.SHA512] = Sha512Hasher;
        map[HashAlgorithmEnum.SHA384] = Sha384Hasher;
        map[HashAlgorithmEnum.SHA3] = Sha3Hasher;
        map[HashAlgorithmEnum.RIPEMD160] = Ripemd160Hasher;
        map[HashAlgorithmEnum.MD5] = Md5Hasher;
        return map;
    }

    private createHasherByAlgorithm(algorithm) {
        let hasherClass = this.classMap[algorithm];
        return new hasherClass();
    }
}
