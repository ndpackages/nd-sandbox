import container from "../../../../../core/container/singletons/container";
import _ from "lodash";

export default class RbacProviderService {

    isMyRole(roleName) {
        let roleNames;
        if(Array.isArray(roleName)) {
            roleNames = roleName;
        } else if(_.isString(roleName)) {
            roleNames = [roleName];
        }
        return this.isMyRoles(roleNames);
    }

    protected isMyRoles(roleNames) {
        let tokenEntity = container.get('security.services.userProvider').getTokenEntity();
        if (!tokenEntity.isAuthenticated()) {
            return false;
        }
        if(_.isEmpty(tokenEntity.getIdentity().roles)) {
            return false;
        }
        let intersectRoles = _.intersection(roleNames, tokenEntity.getIdentity().roles);
        return ! _.isEmpty(intersectRoles);
    }
}
