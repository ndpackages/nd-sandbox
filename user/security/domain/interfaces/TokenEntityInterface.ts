export default interface TokenEntityInterface {

    isAuthenticated(): boolean;

    getToken(): string;

    getIdentity(): object;

}
