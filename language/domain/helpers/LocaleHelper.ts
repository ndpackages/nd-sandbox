
export default class LocaleHelper {

    static assoc = {
        en: 'us',
        kk: 'kz',
    };

    static encode(locale) {
        let encoded = this.assoc.hasOwnProperty(locale) ? this.assoc[locale] : locale;
        return encoded;
    }
}
