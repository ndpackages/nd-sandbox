import _ from "lodash";
import UnauthorizedError from "../../../core/contract/errors/UnauthorizedError";
import UnprocessableEntityError from "../../../core/contract/errors/UnprocessableEntityError";
import eventEmitter from "../../../core/event/singletons/eventEmitter";
import RpcEventEnum from "../enums/RpcEventEnum";

export default class ClientService {

    transportRepository;
    requestEncoder;
    responseEncoder;

    constructor(transportRepository, requestEncoder, responseEncoder) {
        this.transportRepository = transportRepository;
        this.requestEncoder = requestEncoder;
        this.responseEncoder = responseEncoder;
    }

    async sendRequest(requestEntity) {
        eventEmitter.emit(RpcEventEnum.CLIENT_BEFORE_SEND, requestEntity);
        let body = this.requestEncoder.encode(requestEntity);

        try {
            let response = await this.transportRepository.send(body);
            let responseEntity = this.responseEncoder.decode(response);
            eventEmitter.emit(RpcEventEnum.CLIENT_AFTER_SEND, requestEntity, responseEntity);
            if (_.isEmpty(responseEntity.error)) {
                eventEmitter.emit(RpcEventEnum.CLIENT_RESPONSE_SUCCESS, responseEntity);
                return responseEntity;
            } else if (responseEntity.error.code === 401) {
                throw new UnauthorizedError(responseEntity.error.message);
            } else {
                if (responseEntity.error.code === -32602) {
                    let error = new UnprocessableEntityError(responseEntity.error.message);
                    error.setErrors(responseEntity.error.data);
                    throw error;
                } else {
                    throw new Error(responseEntity.error.message);
                }
            }
        } catch (error) {
            eventEmitter.emit(RpcEventEnum.CLIENT_RESPONSE_ERROR, error);
            throw error;
        }
    }
}
