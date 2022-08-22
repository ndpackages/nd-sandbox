import {Base64} from 'js-base64';

export default class Base64Helper {

    static encode(data) {
        return Base64.encode(data);
    }

    static decode(base64) {
        return Base64.decode(base64);
    }
}
