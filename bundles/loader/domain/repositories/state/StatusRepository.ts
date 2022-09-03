import BaseCrudStateRepository from "../../../../../core/state/base/BaseCrudStateRepository";

export default class StatusRepository extends BaseCrudStateRepository {

    // #_value = false;

    get reducerPrefix() {
        return 'loaderStatus';
    }

    setStatus(status) {
        // this.#_value = status;
        this.setValue({
            status
        });
    }

    getStatus() {
        // return this.#_value;
        return this.getValue('status') || false;
    }
}
