import BaseCrudStateRepository from "../../../../../../core/state/base/BaseCrudStateRepository";

export default class IdentityRepository extends BaseCrudStateRepository {

    get reducerPrefix() {
        return 'securityIdentity';
    }

    setIdentity(identity) {
        this.setValue({
            identity
        });
    }
}
