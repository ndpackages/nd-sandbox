import BaseArrayRepository from "./BaseArrayRepository";
import Query from "../../libs/Query";
import DataProvider from "../../libs/DataProvider";
import Paginator from "../../libs/Paginator";

export default abstract class BaseCrudArrayRepository extends BaseArrayRepository {

    abstract getItems(): object[];

    async getDataProvider(query: Query = null) {
        try {
            let dataProvider = new DataProvider();
            dataProvider.collection = this.getItems();
            dataProvider.paginator = this._createPaginatorFromRequestMeta();
            dataProvider.query = query;
            return dataProvider;
        } catch (error) {
            throw error;
        }
    }

    _createPaginatorFromRequestMeta() {
        let paginator = new Paginator();
        paginator.page = 1;
        paginator.perPage = 99999999;
        paginator.totalCount = this.getItems().length;
        return paginator;
    }

    /*all() {
        return [

        ];
    }*/
}
