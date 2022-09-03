import BaseLocalStorageRepository from "../../../../../../ext/permanentStorage/BaseLocalStorageRepository";
import TokenEntity from "../../entities/TokenEntity";
import TokenEntityInterface from "../../interfaces/TokenEntityInterface";

export default class TokenRepository extends BaseLocalStorageRepository {

    key() {
        return 'securityToken';
    }

    setTokenEntity(tokenEntity: TokenEntityInterface) {
        // let value = EntityHelper.getValues(tokenEntity);
        this.set('tokenEntity', {
            value: tokenEntity.getToken(),
            identity: tokenEntity.getIdentity(),
        });
    }

    getTokenEntity(): TokenEntityInterface {
        let value = this.get('tokenEntity');
        if(value) {
            let tokenEntity = new TokenEntity(value.value, value.identity);
            // tokenEntity.value = value.value;
            // tokenEntity.identity = value.identity;
            // EntityHelper.setValues(tokenEntity, value);
            return tokenEntity;
        }

    }
}
