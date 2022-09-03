import EncoderInterface from "../../../../core/contract/encoders/EncoderInterface";
import ObjectBinaryEncoder from "./ObjectBinaryEncoder";
import ChainEncoder from "../../../encoders/libs/encoders/ChainEncoder";
import JsonEncoder from "../../../json/libs/encoders/JsonEncoder";

export default class JsonBinaryEncoder extends ChainEncoder implements EncoderInterface {

    constructor() {
        let encoders = [
            new ObjectBinaryEncoder(),
            new JsonEncoder(),
        ];
        super(encoders);
    }
}
