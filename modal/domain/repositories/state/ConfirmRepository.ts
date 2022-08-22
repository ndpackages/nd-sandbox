import BaseCrudStateRepository from "../../../../state/base/BaseCrudStateRepository";

export default class ConfirmRepository extends BaseCrudStateRepository {

    get initialState() {
        return {
            title: null,
            body: null,
            onConfirm: null,
            onHide: null,
            isVisible: false,
        };
    }

    get reducerPrefix() {
        return 'modalConfirm';
    }

    resetState() {
        this.setValue(this.initialState);
    }

    show() {
        this.setValue({
            isVisible: true
        });
    }

    hide() {
        this.setValue({
            isVisible: false
        });
    }

    /*set title(title) {
        this.setValue({
            title
        });
    }

    set body(body) {
        this.setValue({
            body
        });
    }

    set onConfirm(onConfirm) {
        this.setValue({
            onConfirm
        });
    }

    set onHide(onHide) {
        this.setValue({
            onHide
        });
    }*/

    setData(data) {
        this.setValue(data);
    }
}
