import LocalStorage from "./driver/LocalStorage";
import BasePermanentStorageRepository from "./BasePermanentStorageRepository";

export default class BaseLocalStorageRepository extends BasePermanentStorageRepository {

    constructor() {
        super();
        this.permanentStorage = new LocalStorage();
    }
}
