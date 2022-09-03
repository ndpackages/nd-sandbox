import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import aesjs from 'aes-js';
import conv from 'binstring';

export default class HexEncoder implements EncoderInterface {

    encode(binary, fromFormat = undefined) {
        if (fromFormat !== undefined) {
            let options = {out: 'hex'};
            if (fromFormat) {
                options["in"] = fromFormat;
            }
            return conv(binary, options);
        }
        return aesjs.utils.hex.fromBytes(binary);
    }

    decode(hex) {
        return aesjs.utils.hex.toBytes(hex);
    }
}
