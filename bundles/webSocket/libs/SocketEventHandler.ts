import eventEmitter from "../../../core/event/singletons/eventEmitter";
import socketEventEnum from "../enums/socketEventEnum";
import SocketEventEntity from "../entities/SocketEventEntity";
import container from "../../../core/container/singletons/container";
import JsonEncoder from "../../../ext/json/libs/encoders/JsonEncoder";

export default class SocketEventHandler {

    bindHandlers(socket) {
        socket.onopen = this.onOpen;
        socket.onclose = this.onClose;
        socket.onmessage = this.onMessage;
        socket.onerror = this.onError;
    }

    onOpen() {
        eventEmitter.emit(socketEventEnum.OPEN);
    }

    onClose(event) {
        if (event.wasClean) {
            eventEmitter.emit(socketEventEnum.CLOSE, event);
        } else {
            // например, "убит" процесс сервера
            eventEmitter.emit(socketEventEnum.BREAK, event);
        }
    }

    onMessage(event) {
        let requestEncoder: JsonEncoder = container.get('webSocket.libs.requestEncoder');
        let data = requestEncoder.decode(event.data);
        // let data = JSON.parse(event.data);
        let socketEventEntity = new SocketEventEntity();
        socketEventEntity.name = data['name'];
        socketEventEntity.data = data['data'];
        // EntityHelper.setValues(socketEventEntity, data);
        // console.log(socketEventEntity)
        eventEmitter.emit(socketEventEnum.MESSAGE, socketEventEntity);
    }

    onError(error) {
        eventEmitter.emit(socketEventEnum.ERROR, error);
    }
}
