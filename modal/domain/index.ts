import configureDi from "./config/di";
import configureReducer from "./config/reducer";

let domainName = 'modal';
configureDi(domainName);
configureReducer(domainName);
