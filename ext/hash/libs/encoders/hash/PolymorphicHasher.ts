import BaseHasher from "./BaseHasher";
import _ from 'lodash';
import hashClassMap from "../../../config/hashClassMap";

export default class PolymorphicHasher extends BaseHasher {

    protected classMap: object = {};
    protected algorithm: string;

    constructor(algorithm: string, classMap: object = {}) {
        super();
        this.algorithm = algorithm;
        let allClassMap = PolymorphicHasher.getDefaultClassMap();
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
        return hashClassMap;
    }

    private createHasherByAlgorithm(algorithm) {
        let hasherClass = this.classMap[algorithm];
        return new hasherClass();
    }
}
