import _ from "lodash";

export default class EntityHelper {

    static setValues(entity, array) {
        if (typeof array !== 'object') {
            return;
        }
        let attributes = this.getAttributes(entity);
        for (let i in attributes) {
            if (attributes.hasOwnProperty(i)) {
                let attributeName = attributes[i];
                if (!_.isEmpty(array[attributeName])) {
                    entity[attributeName] = array[attributeName];
                }
            }
        }
    }

    static getValues(entity) {
        let attributes = this.getAttributes(entity);
        let array = {};
        for (let i in attributes) {
            if (attributes.hasOwnProperty(i)) {
                let attributeName = attributes[i];
                array[attributeName] = entity[attributeName];
            }
        }
        return array;
    }

    static getAttributes(entity) {
        let attributes = [];
        let attrList = Object.getOwnPropertyNames(entity);
        for (let i in attrList) {
            let attrName = attrList[i];
            let re = /__private_\d+__(.+)/g;
            let match = re.exec(attrName);
            if (match && match.length === 2) {
                attributes.push(match[1]);
            }
        }
        return attributes;
    }
}
