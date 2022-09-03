import TimeHelper from "../../../../../ext/time/helpers/TimeHelper";
import DocumentService from "../../../../crypt/services/DocumentService";
import container from "../../../../../core/container/singletons/container";

export default class HandShakeRepository {

    protected send(messageData, address) {
        let documentService: DocumentService = container.get('crypt.services.document');
        return documentService.send(messageData, address);
    }

    helloServer(address, sessionId, dhPublic) {
        let messageData = {
            method: 'handShake.helloClient',
            sessionId: sessionId,
            dh: {
                public: dhPublic,
            },
            createdAt: TimeHelper.timestamp(),
        };
        return this.send(messageData, address);
    }

    helloClient(address, sessionId, dhPublic) {
        let messageData = {
            method: 'handShake.getSessionKeys',
            sessionId: sessionId,
            dh: {
                // mod: request.dh.mod,
                public: dhPublic,
            },
            createdAt: TimeHelper.timestamp(),
        };
        return this.send(messageData, address);
    }

    saveSessionKeys(address, sessionId, encryptedKeys) {
        let messageData = {
            method: 'handShake.saveSessionKeys',
            sessionId: sessionId,
            encryptedKeys: encryptedKeys,
            createdAt: TimeHelper.timestamp(),
        };
        return this.send(messageData, address);
    }

    finish(address, sessionId, encryptedMessage) {
        let messageData = {
            method: 'handShake.finish',
            sessionId: sessionId,
            encrypted: encryptedMessage,
            createdAt: TimeHelper.timestamp(),
        };
        return this.send(messageData, address);
    }
}
