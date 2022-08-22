import socketEventEnum from "../enums/socketEventEnum";
import EnvHelper from "../../core/helpers/EnvHelper";
import eventConfigurator from "../../event/singletons/eventConfigurator";
import Container from "../../container/libs/Container";
import EventEmitter from "events";

eventConfigurator.register(function (container: Container, eventEmitter: EventEmitter) {
    if (EnvHelper.isDev()) {
        /*eventEmitter.on(socketEventEnum.OPEN, function (event) {
            console.info("WebSocket. Соединение установлено.");
            //console.info(event);
        });*/

        eventEmitter.on(socketEventEnum.CLOSE, function (event) {
            console.info('WebSocket. Соединение закрыто чисто');
            //console.info(event);
        });

        eventEmitter.on(socketEventEnum.BREAK, function (event) {
            console.info('WebSocket. Обрыв соединения');
            console.info('WebSocket. Код: ' + event.code, event);
            //console.info(event);
        });

        eventEmitter.on(socketEventEnum.MESSAGE, function (socketEventEntity) {
            if (socketEventEntity.name === 'connect') {
                console.info("WebSocket. Соединение установлено.");
                console.info("WebSocket. Активных соединений: " + socketEventEntity.data.totalConnections);
            } else {
                console.info("WebSocket. Получены данные ", socketEventEntity);
            }
            // console.info(socketEventEntity);
        });

        eventEmitter.on(socketEventEnum.ERROR, function (error) {
            console.info("WebSocket. Ошибка ", error.message);
            //console.info(event);
        });
    }
});
