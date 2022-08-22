import * as crypto from "crypto";
import ConvHelper from "../../../core/helpers/encoders/ConvHelper";
import SessionRepository from "../repositories/localStorage/SessionRepository";

export default class SessionService {

    protected sessions = {};
    protected sessionRepository: SessionRepository;

    constructor(sessionRepository: SessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    get(address, defaultValue = {}) {
        let entity = this.sessionRepository.oneByAddress(address);

        if(!entity) {
            entity = {};
        }
        entity['address'] = address;

        /*if (this.sessions.hasOwnProperty(address)) {
            entity = this.sessions[address];
        }
        entity['address'] = address;
        if(entity['sessionId'] == null) {
            entity['sessionId'] = ConvHelper.toHex(crypto.randomBytes(32));
        }*/

        return this.decode(entity);
    }

    persist(entity) {
        this.sessionRepository.save(entity['address'], this.encode(entity));
        //this.set(entity['address'], entity);
    }

    encode(entity) {
        if(entity['sessionKeys']) {
            for(let name in entity['sessionKeys']) {
                entity['sessionKeys'][name] = ConvHelper.toHex(entity['sessionKeys'][name]);
            }
        }
        if(entity['dh'] && entity['dh']['share']) {
            entity['dh']['share'] = ConvHelper.toHex(entity['dh']['share']);
        }
        return entity;
    }

    decode(entity) {
        if(entity['sessionKeys']) {
            for(let name in entity['sessionKeys']) {
                if(!(entity['sessionKeys'][name] instanceof Uint8Array)) {
                    entity['sessionKeys'][name] = ConvHelper.encode(entity['sessionKeys'][name], 'hex', ConvHelper.BUFFER);
                }
            }
        }
        if(entity['dh'] && entity['dh']['share']) {
            if(!(entity['dh']['share'] instanceof Uint8Array)) {
                entity['dh']['share'] = ConvHelper.encode(entity['dh']['share'], 'hex', ConvHelper.BUFFER);
            }
        }
        return entity;
    }

    /*set(address: string, data: object) {
        let oldData = this.get(address);
        this.sessions[address] = Object.assign(oldData, data);
    }*/
}
