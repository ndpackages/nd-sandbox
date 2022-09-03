import BaseCrudStateRepository from "../../../../../core/state/base/BaseCrudStateRepository";

export default class ItemRepository extends BaseCrudStateRepository {

    protected collection = [];

    get initialState() {
        return {
            collection: [],
        };
    }

    get reducerPrefix() {
        return 'breadcrumbItem';
    }

    add(itemEntity) {
        this.collection.push(itemEntity);
        this._syncState();
    }

    clear() {
        this.collection = [];
        this._syncState();
    }

    _syncState() {
        this.setValue({collection: this.collection});
    }

    /*setChatId(chatId) {
        this.setValue({chatId});
    }

    getChatId() {
        return this.getValue('chatId');
    }*/
}
