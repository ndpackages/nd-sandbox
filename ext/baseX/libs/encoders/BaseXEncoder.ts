import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import baseX from "base-x";
import conv from 'binstring';

export default class BaseXEncoder implements EncoderInterface {

    decode(encodedValue) {
    }

    encode(value, fromFormat = undefined, alphabet = undefined) {
        let baseXX = baseX(alphabet);
        if (fromFormat) {
            let options = {out: 'binary'};
            if (fromFormat) {
                options["in"] = fromFormat;
            }
            value = conv(value, options);
        }
        return baseXX.encode(value);
    }
}
