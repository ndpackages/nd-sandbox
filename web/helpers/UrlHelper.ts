import _ from "lodash";
import ArrayNestedHelper from "../../../bundlesExt/array/ArrayNestedHelper";
import ArrayHelper from "../../../bundlesExt/array/ArrayHelper";
import config from "../../../app/common/config/config";
import RouterTypeEnum from "../../../app/common/domain/enums/RouterTypeEnum";

export default class UrlHelper {

    static normalize(uri: string): string {
        let pureUri = UrlHelper.trim(uri);
        // let pureUri = UrlHelper.trim(uri);

        let resultUri;

        if(config.router.type === RouterTypeEnum.HASH) {
            resultUri = '/#/' + pureUri;
        } else if(config.router.type === RouterTypeEnum.SLASH) {
            resultUri = '/' + pureUri;
        }

        return resultUri;
        // console.log('/#/' + pureUri);
        // return uri;
    }

    static getMaskUrlArr(params) {
        let url = window.location.toString();
        url = url.replace(/#\//g, "");
        // url = UrlHelper.trim(url);
        let parsedUrl = UrlHelper.getLocation(url);
        for(let name in params) {
            let value = params[name];
            UrlHelper.setParamInSearchParams(parsedUrl.searchParams, name, value);
        }
        return UrlHelper.generateUri(parsedUrl);
    }

    static getMaskUrl(name, value) {
        let url = window.location.toString();
        url = url.replace(/#\//g, "");
        // url = UrlHelper.trim(url);
        let parsedUrl = UrlHelper.getLocation(url);
        UrlHelper.setParamInSearchParams(parsedUrl.searchParams, name, value);

        return this.normalize(UrlHelper.generateUri(parsedUrl));
    }

    static parseQueryParamsMap(search, defaultValues = {}) {
        /*if(search === null) {
            search = window.location.search;
        }*/
        let params = UrlHelper.parseQueryParams(search);
        params = ArrayNestedHelper.decode(params);
        // Object.assign(defaultValues, params);
        return params;
    }

    static parseQueryParams(search) {
        let hashes = search.slice(search.indexOf('?') + 1).split('&');
        hashes = ArrayHelper.removeEmpty(hashes);
        if(_.isEmpty(hashes)) {
            return {};
        }
        return hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=');
            return Object.assign(params, {[key]: decodeURIComponent(val)})
        }, {});
    }

    static getLocation(href = null) {
        return new URL(href ?? window.location);
        /*let urlObject = document.createElement("a");
        urlObject.href = href;
        return urlObject;*/
    }

    static getOrigin(url = null) {
        url = url || window.location;
        return this.getLocation(url).origin;
    }

    static encodeQuery(params) {
        const sections = [];
        for (let key in params)
            if (params.hasOwnProperty(key)) {
                let section = this.encodeQueryParam(key, params[key]);
                sections.push(section);
            }
        return sections.join('&');
    }

    protected static generateUri(parsedUrl) {
        let resultUrl = /*parsedUrl.origin + '/#' + this.normalize*/(parsedUrl.pathname);
        //if (urlQueryParams) {
        resultUrl = resultUrl + '?' + parsedUrl.searchParams.toString(); //UrlHelper.encodeQuery(urlQueryParams);
        //}
        return resultUrl;
    }

    static setParamInSearchParams(searchParams, key, value) {
        searchParams.delete(key);
        if (value) {
            searchParams.append(key, value);
        }
    }

    static trim(uri) {
        return _.trim(uri, '/#');
    }

    protected static encodeQueryParam(key, value) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
    }
}
