import _ from 'lodash';

export default class ObjectHelper {

    static iterate(obj, handler) {
        for (let property in obj) {
            let value = obj[property];
            if (obj.hasOwnProperty(property)) {
                let isPlain = _.isPlainObject(value) || _.isArray(value);
                if (isPlain) {
                    this.iterate(value, handler);
                } else {
                    handler(obj, property);
                }
            }
        }
    }

    static clone(object) {
        return _.cloneDeep(object);
        // let json = JSON.stringify(object);
        // return JSON.parse(json);
    }

    static createClassByName(name, ...a) {
        let c = eval(name);
        return new c(...a);
    }

    static isClass(definition): boolean {
        return typeof definition == 'function' && definition.name;
    }

    static isFunction(definition): boolean {
        return typeof definition == 'function' && !definition.name;
    }

    static isObject(definition): boolean {
        return typeof definition == 'object';
    }
}
