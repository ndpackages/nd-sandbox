import _ from "lodash";

export default class Query {

    filter = {};
    sort = {};
    private _page: number = 1;
    private _perPage: number = null;
    with: string[] = [];

    get page(): number {
        return this._page;
    }

    set page(value: number) {
        if(value < 1) {
            throw new Error('Page less than 1');
        }
        this._page = value;
    }

    get perPage(): number {
        return this._perPage;
    }

    set perPage(value: number) {
        if(value < 1) {
            throw new Error('Per page less than 1');
        }
        this._perPage = value;
    }

    getFilterByName(name: string, defaultValue = null) {
        return _.get(this.filter, name, defaultValue);
    }

    addFilter(name: string, value): void {
        _.set(this.filter, name, value);
    }

    addSort(name: string, direction = 'asc'): void {
        _.set(this.sort, name, direction);
    }

    addWith(name: string): void {
        this.with.push(name);
    }
}
