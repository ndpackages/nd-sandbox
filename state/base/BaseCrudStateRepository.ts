import BaseStateRepository from "./BaseStateRepository";

export default class BaseCrudStateRepository extends BaseStateRepository {

    setDataProvider(dataProvider) {
        this.setValue({
            dataProvider
        });
    }

    setEntity(entity) {
        this.setValue({
            entity
        });
    }
}
