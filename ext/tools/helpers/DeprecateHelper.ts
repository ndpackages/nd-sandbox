import DeprecatedError from "../../../core/contract/errors/DeprecatedError";
import configManager from "../../../core/configManager/singletons/configManager";

export default class DeprecateHelper {

    private static _isStrictMode = false;

    public static softThrow(message: string = '') {
//        messageText = 'Deprecated: ' . message;
        if (this.isStrictMode()) {
            this.hardThrow(message);
        } else {
            this.log(message);
        }
    }

    public static hardThrow(message: string = '') {
        throw new DeprecatedError('Deprecated: ' + message);
    }

    public static isStrictMode(): boolean {
        return this.getStrictMode() === true;
    }

    public static setStrictMode() {
        this._isStrictMode = true;
    }

    public static getStrictMode() {
        return configManager.get('env.deprecateIsStrict', false);
        // return _ENV['DEPRECATE_STRICT_MODE'] ?? this.isStrictMode;
    }

    private static log(message: string = '') {
        console.info('Deprecated: ' + message);
    }
}
