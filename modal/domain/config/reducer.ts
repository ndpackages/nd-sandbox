import diConfigurator from "../../../../packages/container/singletons/diConfigurator";
import reduceConfigurator from "../../../state/singletons/reduceConfigurator";

export default function configureReducer(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    reduceConfigurator.bindFromRepositoryId(bundleDiConfigurator.get('repositories.state.confirm'));
}
