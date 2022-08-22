import container from "../../../packages/container/singletons/container";
import ToastService from "../services/ToastService";

let toastService: ToastService = container.get('notify.services.toast');

export default toastService;
