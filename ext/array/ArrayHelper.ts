import _ from "lodash";
import flow from "lodash/fp/flow";
import pickBy from "lodash/fp/pickBy";
import mapValues from "lodash/fp/mapValues";
import map from "lodash/fp/map";
import assign from "lodash/fp/assign";
import {default as fpOmitBy} from "lodash/fp/omitBy";
import {default as fpFilter} from "lodash/fp/filter";
import {isArray, isEmpty, isObject, omitBy} from "lodash-es";

export const compact = (obj) => !isObject(obj) ? obj : isArray(obj) ? compactArray(obj) : compactObject(obj);

const compactArray = (arr) => flow(
    map(compact),
    fpFilter(x => !isEmpty(x) || !isObject(x)),
)(arr);

const compactObject = (obj) => flow(
    pickBy(isObject),
    mapValues(compact),
    fpOmitBy(isEmpty),
    assign(omitBy(obj, isObject)),
)(obj);

function removeEmptyObjects(obj) {

    return _.omitBy(obj, (v) => _.isUndefined(v) || _.isNull(v) || v === '');

    return _(obj)
        .pickBy(_.isObject) // pick objects only
        .mapValues(removeEmptyObjects) // call only for object values
        .omitBy(_.isEmpty) // remove all empty objects
        .assign(_.omitBy(obj, () => true)) // assign back primitive values
        .value();
}


export default class ArrayHelper {

    public static isEmpty(value): boolean {
        return value === '' || value === undefined || value === null || value === [] || value === {};
    }

    public static removeEmpty(obj) {
        if (Array.isArray(obj)) {
            const finalObj = [];
            for (let i in obj) {
                let value = obj[i];
                if (_.isObject(value) || Array.isArray(value)) {
                    value = this.removeEmpty(value);
                }
                if (value) {
                    finalObj.push(value);
                }
            }
            return finalObj;
        } else if (_.isObject(obj)) {
            const finalObj = {};
            Object.keys(obj).forEach((key) => {
                let value = obj[key];
                if (!this.isEmpty(value)) {
                    finalObj[key] = value;
                } else if (Array.isArray(value)) {
                    finalObj[key] = this.removeEmpty(value);
                } else if (value && typeof value === 'object' && !Array.isArray(value)) {
                    const nestedObj = this.removeEmpty(value);
                    if (Object.keys(nestedObj).length) {
                        finalObj[key] = nestedObj;
                    }
                }
            });
            return finalObj;
        }
    }
}
