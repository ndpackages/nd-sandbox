import _ from 'lodash';

export default class EncodeHelper {

    public static isolateValue(sourceValue) {
        let dataClone;
        if (_.isObject(sourceValue)) {
            dataClone = _.cloneDeep(sourceValue);
        } else {
            dataClone = sourceValue;
        }
        return dataClone;
    }
}
