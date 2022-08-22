import BaseService from "../../../domain/services/BaseService";

export default class ConfirmService extends BaseService {

    protected stateRepository;

    constructor(stateRepository) {
        super();
        this.stateRepository = stateRepository;
    }

    show(title, body, onConfirm, onHide) {
        this.stateRepository.setData({
            title,
            body,
            onConfirm,
            onHide,
        });
        this.stateRepository.show();
    }

    close() {
        this.stateRepository.hide();
        // this.#_stateRepository.resetState();
    }
}
