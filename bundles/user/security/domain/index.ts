import configureDi from "./config/di";
import configureReducer from "./config/reducer";

let domainName = 'security';
configureDi(domainName);
configureReducer(domainName);
