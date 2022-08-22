import BaseLocalStorageRepository from "../../../../permanentStorage/BaseLocalStorageRepository";

export default class LocaleRepository extends BaseLocalStorageRepository {

    key() {
        return 'languageLocale';
    }

    setLocale(value) {
        this.set('locale', value);
    }

    getLocale() {
        return this.get('locale');
    }
}
