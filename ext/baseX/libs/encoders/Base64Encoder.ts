import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import conv from 'binstring';
import {Base64} from "js-base64";

export default class Base64Encoder implements EncoderInterface {

    decode(encodedValue) {
        return Base64.decode(encodedValue);
    }

    /**
     * @deprecated
     * @param value
     * @param fromFormat
     */
    encode(value, fromFormat = undefined) {
        return this.toBase64(value, fromFormat);
    }


    /**
     * @deprecated
     * @param value
     * @param fromFormat
     */
    private toBase64(value, fromFormat = undefined) {
        // return Base64Helper.encode(value);
        let options = {out: 'base64'};
        if (fromFormat) {
            options["in"] = fromFormat;
        }
        return conv(value, options);
    }
}
