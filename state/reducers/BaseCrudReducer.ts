import CrudActionEnum from "../../domain/enums/CrudActionEnum";
import _ from 'lodash';

export default class BaseCrudReducer {

    protected _prefix;
    protected _initialState = {};

    constructor(prefix = null) {
        this._prefix = prefix;
    }

    set prefix(value) {
        this._prefix = value;
    }

    get prefix() {
        return this._prefix;
    }

    set initialState(value) {
        this._initialState = value;
    }

    actionName(name) {
        return this.prefix + name;
    }

    assignAttribute(action, attrNames) {
        let source2 = {};
        for (let i in attrNames) {
            if (attrNames.hasOwnProperty(i)) {
                let attrName = attrNames[i];
                source2[attrName] = action[attrName];
            }
        }
        return source2;
    }

    assignObject(state, action, target = {}) {
        let source2 = _.clone(action);
        delete source2.type;
        return Object.assign(target, state, source2);
    }

    run(state = this._initialState, action) {
        switch (action.type) {
            case this.actionName(CrudActionEnum.SET):
                return this.assignObject(state, action);
            /*case this.actionName(CrudActionEnum.ALL):
                return this.assignObject(state, action);*/

            // let attrNames = ['dataProvider'];
            // let source2 = this.assignAttribute(action, attrNames);
            // return Object.assign({}, state, source2);
            default:
                return state;
        }
    }

    /**
     * Получить state
     * Обычно используется для объявления редьюсеров в store
     * @return function
     */
    getState() {
        return this.run.bind(this);
    }
}
