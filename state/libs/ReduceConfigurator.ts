import _ from "lodash";
import container from "../../container/singletons/container";

export default class ReduceConfigurator {

    private reducers = {};

    // todo: перенести в singleton
    bind(name: string, state): void {
        this.reducers[name] = state;
    }

    // todo: перенести в singleton
    bindFromRepositoryId(repository): void {
        let repo;
        if(typeof repository == 'string') {
            repo = container.get(repository);
        } else {
            repo = repository;
        }
        this.bind(repo.reducerPrefix, repo.state);
    }

    getReducers() {
        return this.reducers;
    }

    // todo: перенести в singleton
    getReducersFromDomains(domain) {
        let reducers = _.clone(this.reducers);
        for (let domainName in domain) {
            if (domain.hasOwnProperty(domainName)) {
                let domainInstance = domain[domainName];
                if (typeof domainInstance.reducers === 'object') {
                    Object.assign(reducers, domainInstance.reducers);
                }
            }
        }
        return reducers;
    }
}
