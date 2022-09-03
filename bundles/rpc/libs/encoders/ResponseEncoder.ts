import _ from "lodash";

export default class ResponseEncoder {

    encode() {

    }

    decode(data) {
        let responseEntity = {
            body: undefined,
            meta: undefined,
            error: undefined,
            id: undefined
        };
        if (!_.isEmpty(data.result)) {
            let result = data.result;
            if (!_.isEmpty(result.body)) {
                responseEntity.body = result.body;
            }
            if (!_.isEmpty(result.meta)) {
                responseEntity.meta = result.meta;
            }
        }
        if (!_.isEmpty(data.error)) {
            responseEntity.error = data.error;
        }
        responseEntity.id = !_.isEmpty(responseEntity.id) ? responseEntity.id : +new Date();
        return responseEntity;
    }
}
