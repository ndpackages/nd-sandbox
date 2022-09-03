import AssertTypeError from "../../../core/contract/errors/AssertTypeError";
import ConvHelper from "../../binary/helpers/ConvHelper";

export default class AssertHelper {

    static assertClass(instance, className) {
        if (typeof instance !== 'object') {
            throw new AssertTypeError('Is not object!');
        }
        if (!(instance instanceof className)) {
            throw new AssertTypeError('Is not class "' + className + '"!');
        }
    }

    static isEqualBuffer(buf1: Buffer, buf2: Buffer): boolean {
        let buf1Hex = ConvHelper.toHex(buf1);
        let buf2Hex = ConvHelper.toHex(buf2);
        return buf1Hex === buf2Hex;
    }
}
