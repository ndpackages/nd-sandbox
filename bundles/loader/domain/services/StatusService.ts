import BaseService from "../../../../core/domain/services/BaseService";

export default class StatusService extends BaseService {

    protected stateRepository;

    constructor(stateRepository) {
        super();
        this.stateRepository = stateRepository;
    }

    startLoad(name) {
        // console.log('start');
        this.stateRepository.setStatus(true);
    }

    endLoad(name) {
        // console.log('end');
        this.stateRepository.setStatus(false);
    }

    isLoading(name) {
        return this.stateRepository.getStatus();
    }
}
