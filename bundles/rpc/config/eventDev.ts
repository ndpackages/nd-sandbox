import RpcEventEnum from "../enums/RpcEventEnum";
import EnvHelper from "../../../ext/app/helpers/EnvHelper";
import eventConfigurator from "../../../core/event/singletons/eventConfigurator";
import Container from "../../../core/container/libs/Container";
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
