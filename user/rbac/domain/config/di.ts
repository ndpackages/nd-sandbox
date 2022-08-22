import diConfigurator from "../../../../container/singletons/diConfigurator";
import RbacProviderService from "../services/RbacProviderService";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.bind("services.rbacProvider", RbacProviderService);
}
