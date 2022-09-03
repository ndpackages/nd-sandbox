import BaseRpcRepository from "../../../rpc/repositories/base/BaseRpcRepository";

export default class DocumentRepository extends BaseRpcRepository {

    async send(document, toAddress) {
        let requestEntity = {
            method: 'cryptoMessage.p2p',
            body: {
                toAddress: toAddress, // возможность отправки на несколько адресов сразу для скрытия получателя
                //sendAt: sendAt, // отложенная отправка
                //sendAtRandom: sendAtRandom,  todo: рандомно выбирать время отправки
                document: document,
            },
        };

        try {
            let responseEntity = await this.sendRequest(requestEntity);
            return responseEntity.body;
        } catch (error) {
            throw error;
        }
    }
}
