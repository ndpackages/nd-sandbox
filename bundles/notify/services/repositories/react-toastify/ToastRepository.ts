import {toast} from "react-toastify";

export default class ToastRepository {

    get positions() {
        return {
            TOP_LEFT: toast.POSITION.TOP_LEFT,
            TOP_RIGHT: toast.POSITION.TOP_RIGHT,
            TOP_CENTER: toast.POSITION.TOP_CENTER,
            BOTTOM_LEFT: toast.POSITION.BOTTOM_LEFT,
            BOTTOM_RIGHT: toast.POSITION.BOTTOM_RIGHT,
            BOTTOM_CENTER: toast.POSITION.BOTTOM_CENTER,
        };
    }

    get types() {
        return {
            INFO: toast.TYPE.INFO,
            SUCCESS: toast.TYPE.SUCCESS,
            WARNING: toast.TYPE.WARNING,
            ERROR: toast.TYPE.ERROR,
            DEFAULT: toast.TYPE.DEFAULT,
            DARK: toast.TYPE.DARK,
        };
    }

    send(toastEntity) {
        let methodName = toastEntity.type;
        methodName = methodName.toLowerCase();
        let method = toast[methodName];
        method(toastEntity.message, {
            position: this.positions[toastEntity.position],
        });
    }
}