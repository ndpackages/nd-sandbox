import cryptoFactory from "../../../crypto/signature/domain/factories/cryptoFactory";
import SignerService from "../../../crypto/signature/domain/services/SignerService";
import DocumentRepository from "../repositories/rpc/DocumentRepository";
import container from "../../container/singletons/container";
import ConnectionService from "../../webSocket/services/ConnectionService";
import JsonBinaryEncoder from "../../encoders/domain/libs/JsonBinaryEncoder";

export default class DocumentService {

    signerService: SignerService;
    documentRepository: DocumentRepository;

    constructor(
        signerService: SignerService,
        documentRepository: DocumentRepository
    ) {
        this.signerService = signerService;
        this.documentRepository = documentRepository;
    }

    sign(messageData) {

        let encoder = new JsonBinaryEncoder();
        let messageJson = encoder.encode(messageData);

        // let messageJson = JSON.stringify(messageData);

        const signatureEntity = this.signerService.sign(messageJson);
        return signatureEntity;
    }

    verify(document) {
        let messageSigner = cryptoFactory.createBitcoinMessageSigner();
        let verifyEntity = messageSigner.verifyDocument(document);
        return verifyEntity;
    }

    // async sendDocument(document, toAddress) {
    //     let body = await this.documentRepository.send(document, toAddress);
    //     /*if(!body.isVerify) {
    //         throw new Error('Signature not verified!');
    //     }*/
    //     return body;
    // }

    async send(messageData, toAddress) {
        let signatureEntity = this.sign(messageData);

        let webSocketConnection: ConnectionService = container.get('webSocket.services.connection');
        webSocketConnection.send({
            toAddress: toAddress,
            document: signatureEntity.document,
        });

        // let body = await this.documentRepository.send(signatureEntity.document, toAddress);
        /*if(!body.isVerify) {
            throw new Error('Signature not verified!');
        }*/
        return null;
    }
}
