import container from "../../../../packages/container/singletons/container";

let confirmService = container.get('modal.services.confirm');

export default {

    showConfirm(title, body, onConfirm, onHide = null) {
        confirmService.show(title, body, onConfirm, onHide);
    },

    showDeleteConfirm(title, onConfirm, onHide = null) {
        this.showConfirm("Delete confirm", 'Are you sure Delete "' + title + '"?', onConfirm, onHide);
    },

    closeConfirm() {
        confirmService.close();
    },
};
