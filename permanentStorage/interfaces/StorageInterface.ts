import NotImplementedMethodError from "../../contract/errors/NotImplementedMethodError";

export default class StorageInterface {

    get(key, defaultValue) {
        throw new NotImplementedMethodError(this, 'get');
    }

    set(key, data) {
        throw new NotImplementedMethodError(this, 'set');
    }

    remove(key) {
        throw new NotImplementedMethodError(this, 'remove');
    }
}
