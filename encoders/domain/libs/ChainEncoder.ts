import EncoderInterface from "../../../contract/encoders/EncoderInterface";
import EncodeHelper from "../helpers/EncodeHelper";

export default class ChainEncoder implements EncoderInterface {

    private readonly encoders;

    constructor(encoders) {
        this.encoders = encoders;
    }

    encode(sourceValue) {
        let cloneValue = EncodeHelper.isolateValue(sourceValue);
        for (let i in this.encoders) {
            let encoder = this.encoders[i];
            cloneValue = encoder.encode(cloneValue);
        }
        return cloneValue;
    }

    decode(encodedValue) {
        let cloneValue = EncodeHelper.isolateValue(encodedValue);
        let encoders = this.encoders.reverse();
        for (let i in encoders) {
            let encoder = encoders[i];
            cloneValue = encoder.decode(cloneValue);
        }
        return cloneValue;
    }
}
