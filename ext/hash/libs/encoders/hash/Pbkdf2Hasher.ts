import BaseHasher from "./BaseHasher";
import pbkdf2 from "pbkdf2-sha256";
import CryptoJS from "crypto-js";
import HexEncoder from "../../../../baseX/libs/encoders/HexEncoder";

export default class Pbkdf2Hasher extends BaseHasher {

    protected salt;
    protected iterations;
    protected keyLenBytes;

    constructor(salt, iterations = 1, keyLenBytes = 64) {
        super();
        this.salt = salt;
        this.iterations = iterations;
        this.keyLenBytes = keyLenBytes;
    }

    encode(key) {
        return pbkdf2(key, this.salt, this.iterations, this.keyLenBytes);

        /*let hashHex =  CryptoJS.PBKDF2(key, this.salt, {
            keySize: this.keyLenBytes / 32,
            iterations: this.iterations,
        })
            .toString(CryptoJS.enc.Hex);

        return (new HexEncoder()).decode(hashHex);*/
    }
}
