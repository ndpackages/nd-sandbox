import configureDi from "./config/di";
import configureReducer from "./config/reducer";

let domainName = 'loader';
configureDi(domainName);
configureReducer(domainName);
