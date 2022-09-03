import {Base64} from 'js-base64';
import Base64Encoder from "../../../../bundlesExt/baseX/libs/Base64Encoder";

export default class Base64Helper {

    static encode(data) {
        let baseXEncoder = new Base64Encoder();
        return baseXEncoder.encode(data);

        // return Base64.encode(data);
    }

    static decode(base64) {
        return Base64.decode(base64);
    }
}
