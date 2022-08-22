import conv from 'binstring';
import bs58 from "bs58";
import baseX from "base-x";
import AlphabetEnum from "../../enums/AlphabetEnum";

export default class BaseXHelper {

    static toBase2(value, fromFormat = undefined) {
        return this.toBaseX(value, fromFormat, AlphabetEnum.BASE_2);
    }

    static toBase10(value, fromFormat = undefined) {
        return this.toBaseX(value, fromFormat, AlphabetEnum.BASE_10);
    }

    /**
     * @deprecated
     * @param value
     * @param fromFormat
     */
    static toBase64(value, fromFormat = undefined) {
        // return Base64Helper.encode(value);
        let options = {out: 'base64'};
        if (fromFormat) {
            options["in"] = fromFormat;
        }
        return conv(value, options);
    }

    static toBase58(value, fromFormat = undefined) {
        if (fromFormat) {
            let options = {out: 'binary'};
            if (fromFormat) {
                options["in"] = fromFormat;
            }
            value = conv(value, options);
        }
        return bs58.encode(value);
    }

    static  toBase94(value, fromFormat = undefined) {
        return this.toBaseX(value, fromFormat, AlphabetEnum.BASE_94);
    }

    static toBaseX(value, fromFormat = undefined, alphabet = undefined) {
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
