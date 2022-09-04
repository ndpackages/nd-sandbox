import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import ObjectHelper from "../../../object/helpers/ObjectHelper";
import EncodeHelper from "../../../encoders/helpers/EncodeHelper";
import BinaryEncoderHandler from "../BinaryEncoderHandler";

/**
 * Кодировщик для экранирования бинарных данных.
 *
 * Используется для предварительной обработки перед сериализацией.
 * Бинарные данные кодирует в формат HEX и добавляет к имени суффикс.
 * Пример имени: "myVar:[Uint8Array]".
 */
export default class BinaryEncoder implements EncoderInterface {

    encode(sourceValue) {
        let cloneValue = EncodeHelper.isolateValue(sourceValue);
        let handler = new BinaryEncoderHandler();
        ObjectHelper.iterate(cloneValue, handler.encode);
        return cloneValue;
    }

    decode(encodedValue) {
        let cloneValue = EncodeHelper.isolateValue(encodedValue);
        let handler = new BinaryEncoderHandler();
        ObjectHelper.iterate(cloneValue, handler.decode);
        return cloneValue;
    }
}
