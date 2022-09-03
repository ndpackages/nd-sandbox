import StorageRepositoryInterface from "./interfaces/StorageRepositoryInterface";

export default class BasePermanentStorageRepository extends StorageRepositoryInterface {

    protected _permanentStorage;

    constructor(permanentStorage = null) {
        super();
        this.permanentStorage = permanentStorage;
    }

    get permanentStorage() {
        return this._permanentStorage;
    }

    set permanentStorage(value) {
        this._permanentStorage = value;
    }

    key() {
        throw new Error('Method "key" not implemented!');
    }

    get(key) {
        return this.permanentStorage.get(this._key(key));
    }

    set(key, value) {
        this.permanentStorage.set(this._key(key), value);
    }

    remove(key) {
        this.permanentStorage.remove(this._key(key));
    }

    _key(key) {
        return this.key() + '.' + key;
    }
}
