export default class BenchmarkHelper {

    protected static arr = {};

    static start(name) {
        this.arr[name] = {};
        this.arr[name]['start'] = this._now();

    }

    static end(name) {
        this.arr[name]['end'] = this._now();
        return this.runtime(name);
    }

    static runtime(name) {
        let start = this.arr[name]['start'];
        let end = this.arr[name]['end'];
        return end - start;
    }

    static _now() {
        let now = Date.now();
        return now / 1000;
    }
}
