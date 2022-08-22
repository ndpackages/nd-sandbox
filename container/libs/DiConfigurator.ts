
import lodash from "lodash";
import ObjectHelper from "../../core/helpers/ObjectHelper";

export default class DiConfigurator {

    private _di;
    private readonly _prefix = null;

    constructor(di = null, prefix: string = null) {
        this._di = di;
        this._prefix = prefix;
    }

    get di() {
        return this._di;
    }

    set di(value) {
        this._di = value;
    }

    createInstance(prefix = null) {
        let diConfigurator = new DiConfigurator(this._di, prefix);
        diConfigurator.di = this._di;
        return diConfigurator;
    }

    prepareId(id: string): string {
        if(this._prefix == null) {
            return id;
        }
        return this._prefix + '.' + id;
    }

    prepareDependencies(dependencies: string[] = null): string[] {
        let result = [];
        for (let i in dependencies) {
            let id = dependencies[i];
            id = id.replace('this.', this._prefix + '.');
            result.push(id);
        }
        return result;
    }

    bind(id: string, definition, dependencies: string[] = null): void {
        let path = this.prepareId(id);
        let options = {
            dependencies: this.prepareDependencies(dependencies),
            factoryMethod: null,
        };

        /*if(typeof definition == 'object') {
            options.factoryMethod = () => lodash.cloneDeep(definition);
            // this.singleton(path, factoryMethod);
            return;
        } else if(typeof definition == 'function') {
            let className = definition.name;
            if(className) {
                options.factoryMethod = () => new definition;
            } else {
                options.factoryMethod = definition;
            }
        } else {
            // options.factoryMethod = () => new factoryMethod.name();
            // options.factoryMethod = () => ObjectHelper.createClassByName(factoryMethod.name);
        }*/

        if(ObjectHelper.isObject(definition)) {
            options.factoryMethod = () => lodash.cloneDeep(definition);
            // this.singleton(path, definition); return;
        } else if(ObjectHelper.isFunction(definition)) {
            options.factoryMethod = definition;
        } else if(ObjectHelper.isClass(definition)) {
            /*let deps = [];
            for (let i in options.dependencies) {
                let id = options.dependencies[i];
                deps.push('param' + id);
            }*/
            // options.factoryMethod = (...deps) => new definition(...deps);
            options.factoryMethod = (...deps) => new definition(...deps);
        } else {
            throw new Error('Unknown type of definition');
        }

        this._di.register(path, options);
    }

    singleton(id: string, define): void {
        let path = this.prepareId(id);
        let definition;

        /*if(typeof define == 'function') {
            definition = define();
        } else if(typeof define == 'object') {
            definition = define;
        } else {
            definition = new define();
            // definition = Object.create(define);
        }*/

        if(ObjectHelper.isObject(define)) {
            definition = define;
        } else if(ObjectHelper.isFunction(define)) {
            definition = define();
        } else if(ObjectHelper.isClass(define)) {
            definition = new define;
        } else {
            throw new Error('Unknown type of definition');
        }

        this._di.registerInstance(path, definition);
    }

    get(id: string) {
        let path = this.prepareId(id);
        return this._di.resolve(path);
    }
}
