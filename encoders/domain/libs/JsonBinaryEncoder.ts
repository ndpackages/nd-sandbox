import EncoderInterface from "../../../contract/encoders/EncoderInterface";
import ObjectBinaryEncoder from "./ObjectBinaryEncoder";
import ChainEncoder from "./ChainEncoder";
import JsonEncoder from "./JsonEncoder";

export default class JsonBinaryEncoder extends ChainEncoder implements EncoderInterface {

    constructor() {
        let encoders = [
            new ObjectBinaryEncoder(),
            new JsonEncoder(),
        ];
        super(encoders);
    }
}
