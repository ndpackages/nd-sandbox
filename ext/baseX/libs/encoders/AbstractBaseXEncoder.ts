import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import BaseXEncoder from "./BaseXEncoder";

export default class AbstractBaseXEncoder implements EncoderInterface {

    alphabet;

    decode(encodedValue) {
    }

    encode(value, fromFormat = undefined) {
        return this.toBaseX(value, fromFormat, this.alphabet);
    }

    toBaseX(value, fromFormat = undefined, alphabet = undefined) {
        let baseXEncoder = new BaseXEncoder();
        return baseXEncoder.encode(value, fromFormat, alphabet);
    }
}
