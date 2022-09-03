import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import conv from 'binstring';
import bs58 from "bs58";
import AbstractBaseXEncoder from "./AbstractBaseXEncoder";
import AlphabetEnum from "../../enums/AlphabetEnum";

export default class Base58Encoder extends AbstractBaseXEncoder implements EncoderInterface {

    alphabet = AlphabetEnum.BASE_58;

    /*encode(value, fromFormat = undefined) {
        if (fromFormat) {
            let options = {out: 'binary'};
            if (fromFormat) {
                options["in"] = fromFormat;
            }
            value = conv(value, options);
        }
        return bs58.encode(value);
    }*/
}
