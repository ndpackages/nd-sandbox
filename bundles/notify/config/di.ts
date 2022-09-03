import diConfigurator from "../../../core/container/singletons/diConfigurator";
import ToastRepository from "../services/repositories/react-toastify/ToastRepository";
import ToastService from "../services/ToastService";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.singleton("repositories.view.toast", ToastRepository);
    bundleDiConfigurator.bind(
        "services.toast",
        ToastService,
        [
            "this.repositories.view.toast"
        ]
    );
}
