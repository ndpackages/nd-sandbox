import diConfigurator from "../../container/singletons/diConfigurator";
import TransportRepository from "../repositories/http/TransportRepository";
import ClientService from "../services/ClientService";
import RequestEncoder from "../libs/encoders/RequestEncoder";
import ResponseEncoder from "../libs/encoders/ResponseEncoder";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.singleton("repositories.api.transport", TransportRepository);
    bundleDiConfigurator.bind(
        "services.client",
        () => {
            let transportRepo = bundleDiConfigurator.get('repositories.api.transport');
            let service = new ClientService(transportRepo, new RequestEncoder(), new ResponseEncoder());
            return service;
        },
    );
}
