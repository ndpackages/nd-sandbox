export default class Paginator {

    protected _perPage;
    protected _totalCount;
    protected _page;
    protected _lastPage;

    get perPage() {
        return this._perPage || null;
    }

    set perPage(value) {
        this._perPage = value;
    }

    get totalCount() {
        return this._totalCount || null;
    }

    set totalCount(value) {
        this._totalCount = value;
    }

    get page() {
        return this._page || 1;
    }

    set page(value) {
        this._page = value;
    }

    get lastPage() {
        return Math.ceil(this.totalCount / this.perPage);
        // return this._lastPage;
    }
}
