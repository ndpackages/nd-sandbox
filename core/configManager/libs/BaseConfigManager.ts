import _ from 'lodash';

export default class BaseConfigManager {

    protected config = {};

    /*set(path, value) {
        _.set(this.config, path, value);
    }*/

    get(path, defaultValue = null) {
        return _.get(this.config, path, defaultValue);
    }

    load(config) {
        if(!_.isEmpty()) {
            throw new Error('Config already loaded! Config can not override!');
        }
        this.config = config;
    }

    /*all() {
        return this.config;
    }*/
}
