import UrlHelper from "../../../ext/html/helpers/UrlHelper";
import Query from "../libs/Query";
import _ from "lodash";

export default class QueryHelper {

    static uriToQuery(uri, defaultValues = {}): Query {
        let params = UrlHelper.parseQueryParamsMap(uri, defaultValues);
        // console.log(params);
        let query = new Query();
        this.assignQuery(query, params);
        return query;
    }

    static assignQuery(query: Query, params: object) {
        if(!_.isEmpty(params['page'])) {
            query.page = params['page'];
        }
        if(!_.isEmpty(params['perPage'])) {
            query.perPage = params['perPage'];
        }
        if(!_.isEmpty(params['filter'])) {
            query.filter = params['filter'];
        }
        if(!_.isEmpty(params['sort'])) {
            query.addSort(params['sort'], params['sortDirection'] ?? 'asc');
        }
    }
}
