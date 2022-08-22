import _ from "lodash";
import React from "react";
import { useHistory } from "react-router-dom";

const FormView = function (uri) {
    const history = useHistory();
    history.push(uri);
};

export default class RouteHelper {

    static redirect(uri: string): void {
        FormView(uri);
    }
}
