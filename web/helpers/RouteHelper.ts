import {useHistory} from "react-router-dom";
import DeprecateHelper from "../../../bundlesExt/tools/helpers/DeprecateHelper";

DeprecateHelper.hardThrow();

const FormView = function (uri) {
    const history = useHistory();
    history.push(uri);
};

export default class RouteHelper {

    static redirect(uri: string): void {
        FormView(uri);
    }
}
