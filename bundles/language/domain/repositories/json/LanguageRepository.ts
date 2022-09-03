import all from "../../data/laguages.json";
import _ from "lodash";

export default class LocaleRepository {

    protected collection = null;

    all() {
        if (!this.collection) {
            this._initCollection();
        }
        return this.collection;
    }

    oneByLocale(locale) {
        let collection = this.all();
        // collection = _.filter(collection, ['code', locale]);
        return collection[locale];
    }

    _initCollection() {
        let collection = all;
        this._fixName(collection);
        // console.log(collection);
        this.collection = this._indexCollection(collection);
    }

    _indexCollection(collection) {
        let newCollection = {};
        for (let i in collection) {
            let languageEntity = collection[i];
            newCollection[languageEntity.code] = languageEntity;
        }
        return newCollection;
    }

    _fixName(collection) {
        for (let i in collection) {
            let languageEntity = collection[i];
            let nativeNameArr = _.split(languageEntity.nativeName, /\s*,\s*/i);
            languageEntity.nativeName = _.upperFirst(nativeNameArr[0]);
        }
    }
}
