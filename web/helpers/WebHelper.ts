import DataProvider from "../../../bundlesCore/domain/libs/DataProvider";
import UrlHelper from "./UrlHelper";
import ArrayNestedHelper from "../../core/helpers/encoders/ArrayNestedHelper";

export default class WebHelper {

    public static getParams(dataProvider: DataProvider) {
        let map = this.getParamsFromLocation();
        let values = {
            perPage: 20,
            sort: map['sort'] ?? '',
            sortDirection: map['sortDirection'] ?? 'asc',
            filter: map['filter'] ?? {},
        };
        if (dataProvider && dataProvider.paginator.perPage) {
            values.perPage = dataProvider.paginator.perPage;
        }
        return values;
    }

    public static getParamsFromLocation() {
        let params = UrlHelper.parseQueryParams(window.location.toString());
        let map = ArrayNestedHelper.decode(params);
        return map;
    }

    // public static setPageFavicon(url: string): void {
    //     var link = document.querySelector("link[rel~='icon']");
    //     console.log(link);
    //     /*if (!link) {
    //         link = document.createElement('link');
    //         link.rel = 'icon';
    //         document.getElementsByTagName('head')[0].appendChild(link);
    //     }*/
    //     //link.href = 'https://stackoverflow.com/favicon.ico';
    //     // let titleElem = document.getElementById("pageIcon");
    //      link.setAttribute('src', url);
    // }
}
