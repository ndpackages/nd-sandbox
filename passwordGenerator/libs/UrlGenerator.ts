import _ from "lodash";

export default class UrlGenerator {

    generate(host, login, params) {
        host = _.trim(host);
        login = _.trim(login);
        for(let i in params) {
            params[i] = _.trim(params[i]);
        }
        let queryString = new URLSearchParams(params).toString();
        return login + '@' + host + '?' + queryString;
    }
}
