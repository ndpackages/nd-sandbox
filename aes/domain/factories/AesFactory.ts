import AesEncryption from "../libs/AesEncryption";
import StringFormat from "../libs/format/StringFormat";
import FormatEncryption from "../libs/FormatEncryption";

export default class AesFactory {

    static createEncoderStringFormat(keyEntity): FormatEncryption {
        let enc = new AesEncryption(keyEntity, false);
        let format = new StringFormat();
        return new FormatEncryption(enc, format);
    }
}
