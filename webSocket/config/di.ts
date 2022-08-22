import diConfigurator from "../../../packages/container/singletons/diConfigurator";
import ConnectionService from "../services/ConnectionService";
import SocketEventHandler from "../libs/SocketEventHandler";
import JsonEncoder from "../../encoders/domain/libs/JsonEncoder";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.singleton("services.connection", new ConnectionService(new SocketEventHandler()));
    bundleDiConfigurator.singleton("libs.requestEncoder", new JsonEncoder());
}
