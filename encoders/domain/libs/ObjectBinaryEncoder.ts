import ConvHelper from "../../../core/helpers/encoders/ConvHelper";
import EncoderInterface from "../../../contract/encoders/EncoderInterface";
import ObjectHelper from "../../../core/helpers/ObjectHelper";
import EncodeHelper from "../helpers/EncodeHelper";
import HexHelper from "../../../core/helpers/encoders/HexHelper";

class Handler {

    encode(obj, property) {
        let value = obj[property];
        let valueTyped = value;
        let propertyTyped = property;
        if (value instanceof Uint8Array) {
            valueTyped = HexHelper.encode(value);
            propertyTyped = property + ':[Uint8Array]';
        }
        if (propertyTyped !== property) {
            delete obj[property];
        }
        if (valueTyped !== value) {
            obj[propertyTyped] = valueTyped;
        }
    }

    decode(obj, property) {
        let matches = property.match(/(.+):\[(.+)]/);
        if (matches) {
            let name = matches[1];
            let type = matches[2];
            let value = obj[property];
            if (type === 'Uint8Array') {
                value = ConvHelper.toBuffer(value, 'hex');
            }
            obj[name] = value;
            delete obj[property];
        }
    }
}

let handler = new Handler();

export default class ObjectBinaryEncoder implements EncoderInterface {

    encode(sourceValue) {
        let cloneValue = EncodeHelper.isolateValue(sourceValue);
        ObjectHelper.iterate(cloneValue, handler.encode);
        return cloneValue;
    }

    decode(encodedValue) {
        let cloneValue = EncodeHelper.isolateValue(encodedValue);
        ObjectHelper.iterate(cloneValue, handler.decode);
        return cloneValue;
    }
}
