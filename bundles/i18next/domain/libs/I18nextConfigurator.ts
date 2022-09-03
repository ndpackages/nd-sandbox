import _ from "lodash";

export default class I18nextConfigurator {

    private bundles = {};

    bind(bundleName: string, i18next): void {
        this.bundles[bundleName] = i18next;
    }

    getTranslationsFromDomains() {
        let translations = {};
        if (!_.isEmpty(this.bundles)) {
            for (let domainName in this.bundles) {
                let i18next = this.bundles[domainName];
                let bundleTranslations = this.getTranslationsFromDomain(domainName, i18next);
                translations = _.merge(translations, bundleTranslations);
            }
        }
        return translations;
    }

    protected getTranslationsFromDomain(domainName, i18next) {
        let translations = {};
        for (let langCode in i18next) {
            let namespaces = i18next[langCode];
            for (let namespace in namespaces) {
                let data = namespaces[namespace];
                _.set(translations, langCode + '.' + namespace + '.' + domainName, data);
            }
        }
        return translations;
    }
}
