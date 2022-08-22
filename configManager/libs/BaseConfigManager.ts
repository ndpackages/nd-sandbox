import _ from 'lodash';

export default class BaseConfigManager {

    protected data = {};

    set(path, value) {
        _.set(this.data, path, value);
    }

    get(path, defaultValue = null) {
        return _.get(this.data, path, defaultValue);
    }

    load(config) {
        this.data = config;
    }

    all() {
        return this.data;
    }
}
