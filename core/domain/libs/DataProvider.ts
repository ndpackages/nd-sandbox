import Paginator from "./Paginator";
import Query from "./Query";

export default class DataProvider {

    collection: object[] = [];
    paginator: Paginator;
    query: Query = new Query();
}
