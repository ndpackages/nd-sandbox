import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import HashInterface from "../../../../core/contract/encoders/HashInterface";
import _ from 'lodash';

export default class BaseHasher implements EncoderInterface, HashInterface {

    protected options = {};

    setOption(name, value) {
        _.set(this.options, name, value);
    }

    hash(value) {
        return this.encode(value);
    }

    encode(sourceValue) {
        throw new Error('Not implemented encode!');
    }

    decode(encodedValue) {
        throw new Error('Hash can not decode!');
    }
}
