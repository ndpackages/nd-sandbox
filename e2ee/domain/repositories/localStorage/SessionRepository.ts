import BaseLocalStorageRepository from "../../../../../packages/permanentStorage/BaseLocalStorageRepository";
import ConvHelper from "../../../../core/helpers/encoders/ConvHelper";
import * as crypto from "crypto";

export default class SessionRepository extends BaseLocalStorageRepository {

    protected sessions = {};

    key() {
        return 'e2eeSession';
    }

    save(address, sessionEntity) {
        this.set(address, sessionEntity);
        // this._set(address, sessionEntity);
    }

    _set(address: string, data: object) {
        let oldData = this.get(address);
        this.sessions[address] = Object.assign(oldData, data);
    }

    oneByAddress(address) {
        /*let entity;
        if (this.sessions.hasOwnProperty(address)) {
            entity = this.sessions[address];
        }
        if(!entity) {
            entity = {};
        }
        entity['address'] = address;
        if(entity['sessionId'] == null) {
            entity['sessionId'] = ConvHelper.toHex(crypto.randomBytes(32));
        }
        return entity;*/

        return this.get(address);
    }
}
