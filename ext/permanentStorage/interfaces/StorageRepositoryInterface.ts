import NotImplementedMethodError from "../../../core/contract/errors/NotImplementedMethodError";

export default class StorageRepositoryInterface {

    key() {
        throw new NotImplementedMethodError(this, 'key');
    }

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
