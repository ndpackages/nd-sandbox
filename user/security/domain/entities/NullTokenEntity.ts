import TokenEntityInterface from "../interfaces/TokenEntityInterface";

export default class NullTokenEntity implements TokenEntityInterface {

    isAuthenticated(): boolean {
        return false;
    }

    getToken(): string {
        return null;
    }

    getIdentity(): object {
        return null;
    }

    /*get identity() {
        return null;
    }*/
}