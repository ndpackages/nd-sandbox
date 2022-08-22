import container from "../../../packages/container/singletons/container";
import UrlHelper from "../../core/helpers/UrlHelper";
import JsonEncoder from "../../encoders/domain/libs/JsonEncoder";

export default class ConnectionService {

    url = null;
    connection: WebSocket = null;
    eventHandler = null;
    queryParams = {};

    constructor(eventHandler) {
        this.eventHandler = eventHandler;
    }

    send(data) {
        let requestEncoder: JsonEncoder = container.get('webSocket.libs.requestEncoder');
        let jsonMessage = requestEncoder.encode(data);
        // let jsonMessage = JSON.stringify(data);
        this.connection.send(jsonMessage);
    }

    open() {
        let url = this._getConnectionUrl();
        this.connection = new WebSocket(url);
        this.eventHandler.bindHandlers(this.connection);
        window.addEventListener("unload", () => {
            this.close();
        });
    }

    close() {
        if (this.connection && this.connection.readyState === WebSocket.OPEN) {
            this.connection.close();
        }
    }

    tokenFromCrypto() {
        let tokenValue;
        let authService = container.get("cryptoAuthorization.services.auth");
        try {
            tokenValue =  authService.getRpcToken();
            return tokenValue;
        } catch (e) {
            return null;
        }
    }

    token() {
        // todo: refactor
        let tokenEntity = container.get('security.services.userProvider').getTokenEntity();
        let tokenValue = tokenEntity.getToken();
        return tokenValue;
    }

    _getConnectionUrl() {
        let queryParams = {};
        let tokenQueryParams = {
            token: this.token()
            // token: this.tokenFromCrypto()
        };
        Object.assign(queryParams, this.queryParams, tokenQueryParams);
        let query = UrlHelper.encodeQuery(queryParams);
        return this.url + '?' + query;
    }
}
