import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import HashInterface from "../../../../core/contract/encoders/HashInterface";
import _ from 'lodash';
import hash from 'crypto-hashing';
import HashAlgorithmEnum from "../../enums/HashAlgorithmEnum";

export default class BaseHasher implements EncoderInterface, HashInterface {

    protected options = {};

    getAlgorithm(): string {
        return null;
    }

    setOption(name, value) {
        _.set(this.options, name, value);
    }

    hash(value) {
        return this.encode(value);
    }

    encode(sourceValue) {
        return hash(this.getAlgorithm(), sourceValue);
    }

    /*encode(sourceValue) {
        throw new Error('Not implemented encode!');
    }*/

    decode(encodedValue) {
        throw new Error('Hash can not decode!');
    }
}
