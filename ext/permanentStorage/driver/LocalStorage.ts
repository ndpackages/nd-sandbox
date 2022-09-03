import _ from 'lodash';
import StorageInterface from "../interfaces/StorageInterface";
import JsonBinaryEncoder from "../../jsonBinary/libs/encoders/JsonBinaryEncoder";

export default class LocalStorage extends StorageInterface {

    private encoder;

    constructor() {
        super();
        this.encoder = new JsonBinaryEncoder();
    }

    get(key, defaultValue = null) {
        let data = null;
        let dataJson = localStorage.getItem(key);
        if (!_.isEmpty(dataJson)) {
            data = this.encoder.decode(dataJson);
            // data = JSON.parse(dataJson);
            // ObjectHelper.iterate(data, decodeHandler);
        }

        data = _.defaultTo(data, defaultValue);
        return data;
    }

    set(key, data) {
        let dataJson = this.encoder.encode(data);
        /*let dataClone = _.cloneDeep(data);
        ObjectHelper.iterate(dataClone, encodeHandler);
        console.log('encoded', dataClone)
        let dataJson = JSON.stringify(dataClone);*/
        localStorage.setItem(key, dataJson);
    }

    remove(key) {
        localStorage.removeItem(key);
    }
}
