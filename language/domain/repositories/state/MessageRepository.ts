import BaseCrudStateRepository from "../../../../state/base/BaseCrudStateRepository";

export default class MessageRepository extends BaseCrudStateRepository {

    get reducerPrefix() {
        return 'messengerMessage';
    }

    setChatId(chatId) {
        this.setValue({chatId});
    }

    getChatId() {
        let chatId = this.getValue('chatId');
        if (chatId) {
            chatId = Number(chatId);
        }
        return chatId;
    }
}
