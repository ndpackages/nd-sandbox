import container from "../../../../core/container/singletons/container";
import config from "../../../../../app/common/config/config";
import configManager from "../../../../core/configManager/singletons/configManager";

export default class LanguageService {

    all() {
        const enabledLanguages = configManager.get('language.languages');
        // const enabledLanguages = config.language.languages;
        let languages = {};
        for (let i in enabledLanguages) {
            let languageCode = enabledLanguages[i];
            let languageEntity = container.get('language.repositories.data.language').oneByLocale(languageCode);
            languages[languageEntity.code] = languageEntity;
        }
        return languages;
    }
}