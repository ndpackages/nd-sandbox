import i18next from './locales';
import configureDi from "./config/di";
import i18nextConfigurator from "../../i18next/domain/singletons/i18nextConfigurator";

let domainName = 'language';
configureDi(domainName);
i18nextConfigurator.bind(domainName, i18next);
