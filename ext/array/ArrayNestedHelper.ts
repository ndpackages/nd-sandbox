import _ from "lodash";

export default class ArrayNestedHelper {

    static keyArr = [];
    static result = {};

    static decode(params) {
        let map = {};
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                let value = params[key];
                _.set(map, key, value);
            }
        }
        return map;
    }

    static encode(map) {
        this.reset();
        this._encode(map);
        return this.result;
    }

    private static reset() {
        this.result = {};
        this.keyArr = [];
    }

    private static _encode(map) {
        for (let key in map) {
            let value = map[key];
            this.keyArr.push(key);
            let arr = this.keyArr;
            let keyString = arr.join('.');

            if (_.isObject(value)) {
                //console.log(keyString, value);
                this._encode(value);
            } else {
                // console.log(keyString, value);
                this.result[keyString] = value;
            }
            this.keyArr.pop();
        }
    }
}
