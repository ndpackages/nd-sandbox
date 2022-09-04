import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";
import CryptoJS from "crypto-js";
import EncodeInterface from "../../../../../core/contract/encoders/EncodeInterface";

export default class HmacRipemd160Hasher implements EncodeInterface {

    protected key;

    constructor(key) {
        this.key = key;
    }

    encode(sourceValue) {
        let hashHex = CryptoJS.HmacRIPEMD160(sourceValue, this.key).toString(CryptoJS.enc.Hex);
        return (new HexEncoder()).decode(hashHex);
    }
}
