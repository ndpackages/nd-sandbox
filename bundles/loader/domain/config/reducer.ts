import diConfigurator from "../../../../core/container/singletons/diConfigurator";
import reduceConfigurator from "../../../../core/state/singletons/reduceConfigurator";

export default function configureReducer(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    reduceConfigurator.bindFromRepositoryId(bundleDiConfigurator.get('repositories.state.status'));
}
