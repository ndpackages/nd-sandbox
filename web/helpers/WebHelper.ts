import DataProvider from "../../../bundlesCore/domain/libs/DataProvider";
import UrlHelper from "../../core/helpers/UrlHelper";
import ArrayNestedHelper from "../../core/helpers/encoders/ArrayNestedHelper";

export default class WebHelper {

    public static getParams(dataProvider: DataProvider) {
        let params = UrlHelper.parseQueryParams(window.location.toString());
        let map = ArrayNestedHelper.decode(params);

        console.log(map);

        let values = {
            perPage: 20,
            sort: params.sort ?? '',
            sortDirection: params.sortDirection ?? 'asc',
            filter: map['filter'] ?? {},
        };
        if (dataProvider && dataProvider.paginator.perPage) {
            values.perPage = dataProvider.paginator.perPage;
        }
        return values;
    }

    public static getParamsFromLocation() {

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
