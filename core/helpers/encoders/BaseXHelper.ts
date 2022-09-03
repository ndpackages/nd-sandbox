import conv from 'binstring';
import bs58 from "bs58";
import baseX from "base-x";
import AlphabetEnum from "../../../../bundlesExt/baseX/enums/AlphabetEnum";
import BaseXEncoder from "../../../../bundlesExt/baseX/libs/BaseXEncoder";
import Base2Encoder from "../../../../bundlesExt/baseX/libs/Base2Encoder";
import Base10Encoder from "../../../../bundlesExt/baseX/libs/Base10Encoder";
import Base64Encoder from "../../../../bundlesExt/baseX/libs/Base64Encoder";
import Base58Encoder from "../../../../bundlesExt/baseX/libs/Base58Encoder";
import Base94Encoder from "../../../../bundlesExt/baseX/libs/Base94Encoder";

export default class BaseXHelper {

    static toBase2(value, fromFormat = undefined) {
        let baseXEncoder = new Base2Encoder();
        return baseXEncoder.encode(value, fromFormat);

        // return this.toBaseX(value, fromFormat, AlphabetEnum.BASE_2);
    }

    static toBase10(value, fromFormat = undefined) {
        let baseXEncoder = new Base10Encoder();
        return baseXEncoder.encode(value, fromFormat);

        // return this.toBaseX(value, fromFormat, AlphabetEnum.BASE_10);
    }

    /**
     * @deprecated
     * @param value
     * @param fromFormat
     */
    static toBase64(value, fromFormat = undefined) {
        let baseXEncoder = new Base64Encoder();
        return baseXEncoder.encode(value, fromFormat);

        /*// return Base64Helper.encode(value);
        let options = {out: 'base64'};
        if (fromFormat) {
            options["in"] = fromFormat;
        }
        return conv(value, options);*/
    }

    static toBase58(value, fromFormat = undefined) {
        let baseXEncoder = new Base58Encoder();
        return baseXEncoder.encode(value, fromFormat);

        /*if (fromFormat) {
            let options = {out: 'binary'};
            if (fromFormat) {
                options["in"] = fromFormat;
            }
            value = conv(value, options);
        }
        return bs58.encode(value);*/
    }

    static  toBase94(value, fromFormat = undefined) {
        let baseXEncoder = new Base94Encoder();
        return baseXEncoder.encode(value, fromFormat);

        // return this.toBaseX(value, fromFormat, AlphabetEnum.BASE_94);
    }

    static toBaseX(value, fromFormat = undefined, alphabet = undefined) {
        let baseXEncoder = new BaseXEncoder();
        return baseXEncoder.encode(value, fromFormat, alphabet);
    }
}
