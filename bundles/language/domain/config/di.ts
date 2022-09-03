
import diConfigurator from "../../../../core/container/singletons/diConfigurator";
import LocaleRepository from "../repositories/localStorage/LocaleRepository";
import LanguageRepository from "../repositories/json/LanguageRepository";
import SwitchService from "../services/SwitchService";
import LanguageService from "../services/LanguageService";

export default function configureDi(domainName) {
    let bundleDiConfigurator = diConfigurator.createInstance(domainName);

    bundleDiConfigurator.bind("repositories.storage.locale", LocaleRepository);
    bundleDiConfigurator.bind("repositories.data.language", LanguageRepository);

    bundleDiConfigurator.bind("services.switch", SwitchService);
    bundleDiConfigurator.bind("services.language", LanguageService);
}
