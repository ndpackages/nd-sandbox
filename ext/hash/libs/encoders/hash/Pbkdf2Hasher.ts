import BaseHasher from "./BaseHasher";
import pbkdf2 from "pbkdf2-sha256";

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
    }
}
