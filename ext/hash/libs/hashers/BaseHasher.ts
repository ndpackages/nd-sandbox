import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import HashInterface from "../../../../core/contract/encoders/HashInterface";

export default class BaseHasher implements EncoderInterface, HashInterface {

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
