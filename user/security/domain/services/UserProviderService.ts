import container from "../../../../container/singletons/container";
import NullTokenEntity from "../entities/NullTokenEntity";
import eventEmitter from "../../../../event/singletons/eventEmitter";
import SecurityEventEnum from "../enums/SecurityEventEnum";
import TokenEntityInterface from "../interfaces/TokenEntityInterface";

export default class UserProviderService {

    init(): void {
        let tokenEntity = this.getTokenEntity();
        this._setTokenEntity(tokenEntity);
    }

    login(tokenEntity: TokenEntityInterface): void {
        this._setTokenEntity(tokenEntity);
        eventEmitter.emit(SecurityEventEnum.LOGIN, tokenEntity);
    }

    logout(): void {
        let tokenEntity = new NullTokenEntity();
        this._setTokenEntity(tokenEntity);
        eventEmitter.emit(SecurityEventEnum.LOGOUT);
    }

    getTokenEntity(): TokenEntityInterface {
        let tokenEntity = container.get('security.repositories.storage.token').getTokenEntity();
        return this._forgeTokenEntity(tokenEntity);
    }

    /*refresh(tokenEntity) {

    }*/

    _forgeTokenEntity(tokenEntity: TokenEntityInterface): TokenEntityInterface {
        if (tokenEntity == null) {
            tokenEntity = new NullTokenEntity();
        }
        return tokenEntity;
    }

    _setTokenEntity(tokenEntity: TokenEntityInterface): void {
        // AssertHelper.assertClass(tokenEntity, BaseTokenEntity);
        container.get('security.repositories.storage.token').setTokenEntity(tokenEntity);
        container.get('security.repositories.state.identity').setIdentity(tokenEntity.getIdentity());
        eventEmitter.emit(SecurityEventEnum.SET_TOKEN_ENTITY, tokenEntity);
    }
}