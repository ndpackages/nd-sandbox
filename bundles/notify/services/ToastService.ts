import ToastEntity from "../entities/ToastEntity";
import ToastRepository from "./repositories/react-toastify/ToastRepository";

export default class ToastService {

    protected repository: ToastRepository;

    constructor(toastRepository: ToastRepository) {
        this.repository = toastRepository;
    }

    get positions() {
        return {
            TOP_LEFT: 'TOP_LEFT',
            TOP_RIGHT: 'TOP_RIGHT',
            TOP_CENTER: 'TOP_CENTER',
            BOTTOM_LEFT: 'BOTTOM_LEFT',
            BOTTOM_RIGHT: 'BOTTOM_RIGHT',
            BOTTOM_CENTER: 'BOTTOM_CENTER',
        };
    }

    get types() {
        return {
            INFO: 'INFO',
            SUCCESS: 'SUCCESS',
            WARNING: 'WARNING',
            ERROR: 'ERROR',
            DEFAULT: 'DEFAULT',
            DARK: 'DARK',
        };
    }

    success(message, position = null) {
        let toastEntity = new ToastEntity();
        toastEntity.message = message;
        toastEntity.position = position;
        toastEntity.type = this.types.SUCCESS;
        this.send(toastEntity);
    }

    info(message, position = null) {
        let toastEntity = new ToastEntity();
        toastEntity.message = message;
        toastEntity.position = position;
        toastEntity.type = this.types.INFO;
        this.send(toastEntity);
    }

    error(message, position = null) {
        let toastEntity = new ToastEntity();
        toastEntity.message = message;
        toastEntity.position = position;
        toastEntity.type = this.types.ERROR;
        this.send(toastEntity);
    }

    send(toastEntity) {
        toastEntity.position = toastEntity.position || this.positions.BOTTOM_RIGHT;
        toastEntity.type = toastEntity.type || this.types.INFO;
        this.repository.send(toastEntity);
    }
}
