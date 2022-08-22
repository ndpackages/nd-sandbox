import React from "react";
import {connect} from "react-redux";
import BaseComponent from "../../../web/base/BaseComponent";
import container from "../../../../packages/container/singletons/container";
import ConfirmModal from "../views/confirmModal";

class ModalContainer extends BaseComponent {

    render() {
        let confirmState = this.props["modalConfirm"];
        let onConfirm = () => {
            container.get('modal.services.confirm').close();
            confirmState.onConfirm();
        };

        let onHide = () => {
            container.get('modal.services.confirm').close();
            if(typeof confirmState.onHide === 'function') {
                confirmState.onHide();
            }
        };

        return (
            <ConfirmModal
                header={confirmState.title}
                body={confirmState.body}
                confirmLabel="Delete"
                onConfirm={onConfirm}
                isVisible={confirmState.isVisible}
                onHide={onHide}
            />
        );
    }
}

const mapStateToProps = (store) => {
    return {
        modalConfirm: store.modalConfirm,
    };
};

export default connect(mapStateToProps)(ModalContainer);
