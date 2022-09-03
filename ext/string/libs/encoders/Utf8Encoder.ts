import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import aesjs from 'aes-js';

export default class Utf8Encoder implements EncoderInterface {

    encode(binary) {
        return aesjs.utils.utf8.fromBytes(binary);
    }

    decode(utf8) {
        return aesjs.utils.utf8.toBytes(utf8);
    }
}
