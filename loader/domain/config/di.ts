import diConfigurator from "../../../../packages/container/singletons/diConfigurator";
import StatusRepository from "../repositories/state/StatusRepository";
import StatusService from "../services/StatusService";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.bind("repositories.state.status", StatusRepository);
    bundleDiConfigurator.bind(
        "services.status",
        StatusService,
        [
            "this.repositories.state.status"
        ]
    );
}
