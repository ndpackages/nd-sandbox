import lodash from "lodash";
import diConfigurator from "../singletons/diConfigurator";

export default class Container {

    private _di;

    constructor(di = null) {
        this._di = di;
    }

    get di() {
        return this._di;
    }

    set di(value) {
        this._di = value;
    }

    set(id: string, value) {
        if (typeof value == 'object') {
            diConfigurator.singleton(id, value);
        } else if (typeof value == 'function') {
            diConfigurator.bind(id, value);
        }
    }

    get(id: string) {
        let instance = lodash.get(this, id);
        if (typeof instance == 'object') {
            return instance;
        }
        return this.di.resolve(id);
    }

    /*load(config) {
        Object.assign(this, config);
    }*/
}
