import BaseRpcRepository from "./BaseRpcRepository";
import DataProvider from "../../../domain/libs/DataProvider";
import Paginator from "../../../domain/libs/Paginator";
import _ from 'lodash';
import Query from "../../../domain/libs/Query";

export default class BaseCrudRpcRepository extends BaseRpcRepository {

    protected _methodPrefix = null;

    get methodPrefix() {
        if (this._methodPrefix == null) {
            throw new Error('Not configured attribute "methodPrefix" in CRUD repository!');
        }
        return this._methodPrefix;
    }

    set methodPrefix(value) {
        this._methodPrefix = value;
    }

    methodName(name) {
        return this.methodPrefix + '.' + name;
    }

    forgeQuery(query) {
        if(query === null) {
            query = {};
        }
        return query;
    }

    async update(entity) {
        let requestEntity = {
            method: this.methodName('update'),
            body: entity,
        };
        try {
            let responseEntity = await this.sendRequest(requestEntity);
            return responseEntity.body;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        let requestEntity = {
            method: this.methodName('delete'),
            body: {
                id: id,
            },
        };
        try {
            let responseEntity = await this.sendRequest(requestEntity);
            return responseEntity.body;
        } catch (error) {
            throw error;
        }
    }

    async oneById(id, query = null) {
        let requestEntity = {
            method: this.methodName('oneById'),
            // body: body,
        };
        query = this.forgeQuery(query);
        query.id = id;
        //console.log(query);
        this._forgeRequestByQuery(requestEntity, query);
        try {
            let responseEntity = await this.sendRequest(requestEntity);
            return responseEntity.body;
        } catch (error) {
            throw error;
        }
    }

    async all(query = null) {
        let requestEntity = {
            method: this.methodName('all'),
            // body: body,
        };
        this._forgeRequestByQuery(requestEntity, query);
        try {
            let responseEntity = await this.sendRequest(requestEntity);
            let dataProvider = new DataProvider();
            dataProvider.collection = responseEntity.body;
            dataProvider.paginator = this._createPaginatorFromRequestMeta(responseEntity.meta);
            dataProvider.query = query;
            return dataProvider;
        } catch (error) {
            throw error;
        }
    }

    async getDataProvider(query: Query = null) {
        let requestEntity = {
            method: this.methodName('all'),
            // body: body,
        };
        this._forgeRequestByQuery(requestEntity, query);
        try {
            let responseEntity = await this.sendRequest(requestEntity);
            let dataProvider = new DataProvider();
            dataProvider.collection = responseEntity.body;
            dataProvider.paginator = this._createPaginatorFromRequestMeta(responseEntity.meta);
            dataProvider.query = query;
            return dataProvider;
        } catch (error) {
            throw error;
        }
    }

    _forgeRequestByQuery(requestEntity, query) {
        if (query) {
            requestEntity.body = {};
            for(let i in query) {
                if(query.hasOwnProperty(i)) {
                    let value = query[i];
                    let name = _.trim(i, '_');
                    if(name === 'sort') {
                        name = 'order';
                    }
                    _.set(requestEntity.body, name, value);
                }
            }
            /*if (query.filter) {
                _.set(requestEntity.body, 'filter', query.filter);
                // requestEntity.body.filter = query.filter;
            }*/
        }
        return requestEntity;
    }

    _createPaginatorFromRequestMeta(meta) {
        let paginator = new Paginator();
        paginator.page = meta.page || 1;
        paginator.perPage = meta.perPage || null;
        paginator.totalCount = meta.totalCount || 0;
        return paginator;
    }
}
