let aesjs = require('aes-js');

export default class Utf8Helper {

    static encode(binary) {
        return aesjs.utils.utf8.fromBytes(binary);
    }

    static decode(utf8) {
        return aesjs.utils.utf8.toBytes(utf8);
    }
}
