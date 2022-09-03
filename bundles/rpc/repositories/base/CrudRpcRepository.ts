import BaseCrudRpcRepository from "./BaseCrudRpcRepository";

export default class CrudRpcRepository extends BaseCrudRpcRepository {

    constructor(methodPrefix) {
        super();
        this.methodPrefix = methodPrefix;
    }
}