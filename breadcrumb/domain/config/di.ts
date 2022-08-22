import diConfigurator from "../../../container/singletons/diConfigurator";
import ItemRepository from "../repositories/state/ItemRepository";
import BreadcrumbService from "../services/BreadcrumbService";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.singleton("repositories.state.items", ItemRepository);
    bundleDiConfigurator.bind("services.breadcrumb", BreadcrumbService, [
        "this.repositories.state.items"
    ]);
}
