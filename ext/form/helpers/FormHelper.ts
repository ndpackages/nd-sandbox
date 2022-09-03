import _ from 'lodash';

export default class FormHelper {

    static getInitialValues(values, props) {
        if(props.hasOwnProperty('values') && _.isObject(props.values)) {
            values = _.merge(values, props.values);
        }
        return values;
    }

    static extractInitValues(entity, attributes) {
        let values = {};
        for (let key in attributes) {
            if(attributes.hasOwnProperty(key)) {
                let attributeName = attributes[key];
                values[attributeName] = entity[attributeName];
            }
        }
        return values;
    }
}
