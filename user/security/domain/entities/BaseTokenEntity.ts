import NotImplementedMethodError from "../../../../contract/errors/NotImplementedMethodError";
import DeprecatedError from "../../../../contract/errors/DeprecatedError";

throw new DeprecatedError();

export default class TokenEntity {

    get isAuthenticated() {
        throw new NotImplementedMethodError(this, 'get isAuthenticated');
    }

    set isAuthenticated(value) {
        throw new NotImplementedMethodError(this, 'set isAuthenticated');
    }

    get value() {
        throw new NotImplementedMethodError(this, 'get value');
    }

    set value(value) {
        throw new NotImplementedMethodError(this, 'set value');
    }
}