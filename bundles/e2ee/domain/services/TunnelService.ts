import P2pRequestEntity from "../entities/P2pRequestEntity";
import DocumentService from "../../../crypt/services/DocumentService";
import SessionService from "./SessionService";
import AesFactory from "../../../aes/domain/factories/AesFactory";
import container from "../../../../core/container/singletons/container";
import ConnectionService from "../../../webSocket/services/ConnectionService";

export default class TunnelService {

    protected documentService: DocumentService;
    protected sessionService: SessionService;
    protected static requestQueue = {};

    constructor(
        documentService: DocumentService,
        sessionService: SessionService
    ) {
        this.documentService = documentService;
        this.sessionService = sessionService;
    }

    sendRequest(request: P2pRequestEntity) {
        let data = {
            address: request.address,
            method: request.method,
            params: request.params,
            timestamp: request.timestamp,
        };
        let jsonData = JSON.stringify(data);
        let sessionEntity = this.sessionService.get(request.address);

        // console.log(sessionEntity);

        let formatEncryption = AesFactory.createEncoderStringFormat(sessionEntity['sessionKeys']);
        let encryptedJsonData = formatEncryption.encrypt(jsonData);

        let keyEntity = container.get('key.services.key').one();

        let encryptedDocument =
            "-----BEGIN BITCOIN ENCRYPTED MESSAGE-----\n" +
            encryptedJsonData + "\n" +
            "-----BEGIN ADDRESS-----\n" +
            request.address + "\n" +
            "-----BEGIN FROM ADDRESS-----\n" +
            keyEntity.address + "\n" +
            "-----END BITCOIN ENCRYPTED MESSAGE-----";

        //let signatureEntity = this.sign(messageData);
        let webSocketConnection: ConnectionService = container.get('webSocket.services.connection');
        webSocketConnection.send({
            toAddress: request.address,
            document: encryptedDocument,
        });

        // console.log(encryptedDocument);
    }
}
