import HandShakeEventEnum from "../enums/HandShakeEventEnum";
import P2pService from "../services/P2pService";
import eventConfigurator from "../../../../core/event/singletons/eventConfigurator";
import Container from "../../../../core/container/libs/Container";
import EventEmitter from "events";

eventConfigurator.register(function (container: Container, eventEmitter: EventEmitter) {
    eventEmitter.on(HandShakeEventEnum.COMPLETE, function (address) {
        let p2pService: P2pService = container.get('e2ee.services.p2p');
        p2pService.sendAllQueues(address);
    });
});
