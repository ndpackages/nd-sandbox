import diConfigurator from "../../../../packages/container/singletons/diConfigurator";
import ConfirmRepository from "../repositories/state/ConfirmRepository";
import ConfirmService from "../services/ConfirmService";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.singleton("repositories.state.confirm", ConfirmRepository);
    bundleDiConfigurator.bind(
        "services.confirm",
        ConfirmService,
        [
            "this.repositories.state.confirm"
        ]
    );
}
