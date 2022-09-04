import container from "../../../../core/container/singletons/container";
import i18next from "i18next";
import i18n from "i18next";
import config from "../../../../../app/common/config/config";
import {initReactI18next} from "react-i18next";
import i18nextConfigurator from "../../../i18next/domain/singletons/i18nextConfigurator";
import configManager from "../../../../core/configManager/singletons/configManager";

export default class SwitchService {

    init() {
        let resources = i18nextConfigurator.getTranslationsFromDomains();
        let languageEntity = container.get('language.services.switch').oneSelected();
        // @ts-ignore
        i18n
            // .use(LngDetector)
            .use(initReactI18next) // passes i18n down to react-i18next
            .init({
                resources,
                lng: languageEntity.code,
                interpolation: {
                    escapeValue: false // react already safes from xss
                },
                react: {
                    wait: true
                }
            });
    }

    setLocale(locale) {
        this._set(locale);
        container.get('language.repositories.storage.locale').setLocale(locale);
    }

    oneSelected() {
        let locale = this._getLocale();
        return container.get('language.repositories.data.language').oneByLocale(locale);
    }

    _getLocale() {
        let currentLocale = container.get('language.repositories.storage.locale').getLocale();
        let defaultLanguage = configManager.get('language.default');
        currentLocale = currentLocale ? currentLocale : (defaultLanguage ?? 'en');
        return currentLocale;
    }

    _set(locale) {
        i18next.changeLanguage(locale);
    }
}