import aesjs from'aes-js';

export default class HexHelper {

    static encode(binary) {
        return aesjs.utils.hex.fromBytes(binary);
    }

    static decode(hex) {
        return aesjs.utils.hex.toBytes(hex);
    }
}
