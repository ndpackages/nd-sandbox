import BaseService from "./BaseService";
import Query from "../libs/Query";

export default class BaseCrudService extends BaseService {

    protected _stateRepository = null;
    protected _repository = null;

    constructor(storeDispatcher = null, repository) {
        super();
        this._stateRepository = storeDispatcher;
        this._repository = repository;
    }

    get stateRepository() {
        return this._stateRepository;
    }

    get repository() {
        return this._repository;
    }

    async update(entity) {
        return await this.repository.update(entity);
        /*try {
            return await this.repository.update(entity);
        } catch (error) {
            throw error;
        }*/
    }

    async oneById(id, query = null) {
        try {
            let entity = await this.repository.oneById(id, query);
            if(this.stateRepository) {
                this.stateRepository.setEntity(entity);
            }
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            let entity = await this.repository.deleteById(id);
            return entity;
        } catch (error) {
            throw error;
        }
    }

    async all(query = null) {
        try {
            let dataProvider = await this.repository.all(query);
            if(this.stateRepository) {
                this.stateRepository.setDataProvider(dataProvider);
            }
            return dataProvider;
        } catch (error) {
            throw error;
        }
    }

    async getDataProvider(query: Query = null) {
        try {
            let dataProvider = await this.repository.getDataProvider(query);
            if(this.stateRepository) {
                this.stateRepository.setDataProvider(dataProvider);
            }
            return dataProvider;
        } catch (error) {
            throw error;
        }
    }
}
