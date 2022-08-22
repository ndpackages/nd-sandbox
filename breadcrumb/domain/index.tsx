import configureDi from "./config/di";
import configureReducer from "./config/reducer";

let domainName = 'breadcrumb';
configureDi(domainName);
configureReducer(domainName);
