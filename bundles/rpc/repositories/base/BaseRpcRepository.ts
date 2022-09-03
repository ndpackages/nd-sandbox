import container from "../../../../core/container/singletons/container";

export default class BaseRpcRepository {

    sendRequest(requestEntity) {
        return container.get('rpc.services.client').sendRequest(requestEntity);
        //return rpcClient.sendRequest(requestEntity);
    }

    sendByMethod(method, body = {}, meta = {}) {
        let requestEntity = {
            method: undefined,
            body: undefined,
            meta: undefined
        };
        requestEntity.method = method;
        if (body) {
            requestEntity.body = body;
        }
        if (meta) {
            requestEntity.meta = meta;
        }
        return this.sendRequest(requestEntity);
    }
}
