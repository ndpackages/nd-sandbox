import _ from 'lodash';
import TokenEntityInterface from "../interfaces/TokenEntityInterface";

export default class TokenEntity implements TokenEntityInterface {

    protected _isAuthenticated = null;
    protected _value = null;
    protected _identity = null;

    constructor(value = null, identity = null) {
        this._value = value;
        this._identity = identity;
    }

    isAuthenticated(): boolean {
        if (this._isAuthenticated === null) {
            return !_.isEmpty(this._value);
        }
        return this._isAuthenticated;
    }

    getToken(): string {
        return this._value;
    }

    getIdentity(): object {
        return this._identity;
    }

    /*get identity() {
        return this._identity;
    }*/
}