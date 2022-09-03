import aesjs from'aes-js';
import DeprecateHelper from "../../../../bundlesExt/tools/helpers/DeprecateHelper";

DeprecateHelper.hardThrow();

export default class HexHelper {

    static encode(binary) {
        return aesjs.utils.hex.fromBytes(binary);
    }

    static decode(hex) {
        return aesjs.utils.hex.toBytes(hex);
    }
}
