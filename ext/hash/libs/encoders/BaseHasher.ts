import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import _ from 'lodash';
import hash from 'crypto-hashing';

export default class BaseHasher implements EncoderInterface {

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

    decode(encodedValue) {
        throw new Error('Hash can not decode!');
    }
}
