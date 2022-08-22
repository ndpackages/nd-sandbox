import RpcEventEnum from "../enums/RpcEventEnum";
import EnvHelper from "../../core/helpers/EnvHelper";
import eventConfigurator from "../../event/singletons/eventConfigurator";
import Container from "../../container/libs/Container";
import EventEmitter from "events";

eventConfigurator.register(function (container: Container, eventEmitter: EventEmitter) {
    if (EnvHelper.isDev()) {
        eventEmitter.on(RpcEventEnum.CLIENT_AFTER_SEND, function (requestEntity, responseEntity) {
            if (EnvHelper.isDev()) {
                console.info('RPC. Запрос: ', requestEntity);
                console.info('RPC. Ответ: ', responseEntity);
            }
        });
    }
});
