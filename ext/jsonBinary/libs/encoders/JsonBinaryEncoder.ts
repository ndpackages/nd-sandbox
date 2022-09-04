import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import BinaryEncoder from "./BinaryEncoder";
import ChainEncoder from "../../../encoders/libs/encoders/ChainEncoder";
import JsonEncoder from "../../../json/libs/encoders/JsonEncoder";

/**
 * Кодировщик JSON с возможностью кодирования/декодирования бинарный данных.
 */
export default class JsonBinaryEncoder extends ChainEncoder implements EncoderInterface {

    constructor() {
        let encoders = [
            new BinaryEncoder(),
            new JsonEncoder(),
        ];
        super(encoders);
    }
}
