import _ from "lodash";

export default class RequestEncoder {

    encode(requestEntity) {
        requestEntity.meta = typeof requestEntity.meta === 'object' ? requestEntity.meta : {};
        requestEntity.meta.version = !_.isEmpty(requestEntity.version) ? requestEntity.version : 1;
        let request = {
            jsonrpc: '2.0',
            method: requestEntity.method,
            params: {
                body: undefined,
                meta: undefined
            },
            id: typeof requestEntity.id !== 'undefined' ? requestEntity.id : +new Date(),
        };
        if (!_.isEmpty(requestEntity.body)) {
            request.params.body = requestEntity.body;
        }
        if (!_.isEmpty(requestEntity.meta)) {
            request.params.meta = requestEntity.meta;
        }
        return request;
    }

    decode() {

    }
}
