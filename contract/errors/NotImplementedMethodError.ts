export default class NotImplementedMethodError extends Error {

    protected _class;
    protected _method;

    constructor(className = null, methodName = null) {
        super();
        this.class = className;
        this.method = methodName;
    }

    get class() {
        return this._class;
    }

    set class(value) {
        this._class = value;
    }

    get method() {
        return this._method;
    }

    set method(value) {
        this._method = value;
    }
}
