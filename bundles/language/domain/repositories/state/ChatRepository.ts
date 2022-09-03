import BaseCrudStateRepository from "../../../../../core/state/base/BaseCrudStateRepository";

export default class ChatRepository extends BaseCrudStateRepository {

    get reducerPrefix() {
        return 'messengerChat';
    }
}
