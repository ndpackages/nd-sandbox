import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";

export default class JsonEncoder implements EncoderInterface {

    encode(sourceValue) {
        return JSON.stringify(sourceValue);
    }

    decode(encodedValue) {
        return JSON.parse(encodedValue);
    }
}
