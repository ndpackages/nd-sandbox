import _ from 'lodash';
import hash from 'crypto-hashing';
import EncodeInterface from "../../../../../core/contract/encoders/EncodeInterface";

export default class BaseHasher implements EncodeInterface {

    protected options = {};

    getAlgorithm(): string {
        return null;
    }

    setOption(name, value) {
        _.set(this.options, name, value);
    }

    encode(sourceValue) {
        return hash(this.getAlgorithm(), sourceValue);
    }
}
