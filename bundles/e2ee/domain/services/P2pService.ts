import P2pRequestEntity from "../entities/P2pRequestEntity";
import DocumentService from "../../../crypt/services/DocumentService";
import SessionService from "./SessionService";
import HandShakeController from "../../p2p/controllers/HandShakeController";
import container from "../../../../core/container/singletons/container";
import TunnelService from "./TunnelService";

export default class P2pService {

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

    sendRequest(address: string, request: P2pRequestEntity) {
        let sessionEntity = this.sessionService.get(address);
        this.addQueue(address, request);

        let handShake: HandShakeController = container.get('e2ee.controllers.handShakeController');
        handShake.start(address);

        /*if (sessionEntity['sessionKeys'] == null) {
            let handShake: HandShakeController = container.get('e2ee.controllers.handShakeController');
            handShake.start(address);
        } else {
            this.sendAllQueues(address);
        }*/

        // console.log(address, request, sessionEntity);
    }

    public sendAllQueues(address: string) {
        if (P2pService.requestQueue[address]) {
            // console.log('queue: ', P2pService.requestQueue[address]);
            for (let i in P2pService.requestQueue[address]) {
                let request = P2pService.requestQueue[address][i];
                this.sendOneQueue(address, request);
            }
        }
        P2pService.requestQueue = {};
    }

    private addQueue(address: string, request: P2pRequestEntity) {
        P2pService.requestQueue[address] = P2pService.requestQueue.hasOwnProperty(address) ? P2pService.requestQueue[address] : [];
        P2pService.requestQueue[address].push(request);
    }

    private sendOneQueue(address: string, request: P2pRequestEntity) {
        let tunnelService: TunnelService = container.get('e2ee.services.tunnel');
       /* let request = new P2pRequestEntity();
        request.address = address;
        request.method = */
        request.address = address;
        tunnelService.sendRequest(request);
        // console.log('queue: ', address, request);
        // return this.documentService.send(request.params, address);
    }
}
