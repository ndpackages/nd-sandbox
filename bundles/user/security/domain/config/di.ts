import diConfigurator from "../../../../../core/container/singletons/diConfigurator";
import IdentityStateRepository from "../repositories/state/IdentityRepository";
import TokenStorageRepository from "../repositories/localStorage/TokenRepository";
import UserProviderService from "../services/UserProviderService";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.bind("repositories.state.identity", () => {
        let repository = new IdentityStateRepository();
        repository.initialState = {
            identity: {},
        };
        return repository;
    });
    bundleDiConfigurator.bind("repositories.storage.token", TokenStorageRepository);
    bundleDiConfigurator.bind("services.userProvider", UserProviderService);

}
