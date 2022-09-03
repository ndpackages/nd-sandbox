import _ from "lodash";
import PasswordStrengthEnum from "../enums/PasswordStrengthEnum";
import UrlGenerator from "./UrlGenerator";

export default class PasswordGenerator {

    protected _masterKey;
    protected _passwordLength;
    protected _passwordEncoder;
    protected _hasher;
    protected _passwordStrength = PasswordStrengthEnum.STRONG;

    constructor(hasher, passwordEncoder) {
        this._passwordEncoder = passwordEncoder;
        this._hasher = hasher;
    }

    set masterKey(value) {
        this._masterKey = _.trim(value);
    }

    set passwordLength(value) {
        if (!_.isInteger(value)) {
            throw new Error('Password length not integer');
        }
        if(value < 5) {
            throw new Error('Password length less then 5');
        }
        if(value > 32) {
            throw new Error('Password length greater then 32');
        }
        this._passwordLength = value;
    }

    set passwordStrength(value) {
        if (!_.isInteger(value)) {
            throw new Error('Password strength not integer');
        }
        this._passwordStrength = value;
    }

    generate(host, login, nonce) {
        let url = this.forgeUrl(host, login, nonce);
        let scopeHashHex = this._hasher.hash(url).toString('hex');
        return this._generatePassword(scopeHashHex);
    }

    _generatePassword(scopeHashHex) {
        let attempt = 0;
        let password;
        do {
            attempt++;
            password = this._generatePasswordItem(scopeHashHex, attempt);
        } while (!this.isStrongPassword(password));
        return password;
    }

    _generatePasswordItem(scopeHashHex, attempt) {
        let password;
        password = this._passwordEncoder.generate(scopeHashHex + attempt);
        password = password.substr(0, this._passwordLength);
        return password;
    }

    forgeUrl(host, login, nonce) {
        if (!_.isInteger(nonce)) {
            throw new Error('nonce not integer');
        }
        let params = {
            secret: this._masterKey,
            nonce: nonce.toString(),
        };
        return (new UrlGenerator()).generate(host, login, params);
    }

    isStrongPassword(password) {

        let count = 0;

        let isMatchNumber = !!password.match(/\d+/);
        if (isMatchNumber) {
            count++;
        }

        let isMatchChar = !!password.match(/[!#$%*+=?@]+/);
        if (isMatchChar) {
            count++;
        }

        let isMatchLower = !!password.match(/[a-z]+/);
        if (isMatchLower) {
            count++;
        }

        let isMatchUpper = !!password.match(/[A-Z]+/);
        if (isMatchUpper) {
            count++;
        }
        return count >= this._passwordStrength;
    }
}
