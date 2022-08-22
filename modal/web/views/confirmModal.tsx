import React from "react";
import {Button, Modal} from "react-bootstrap";

export default function ConfirmModal(props) {
    return (
        <Modal
            show={props.isVisible}
            onHide={props.onHide}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.onConfirm}>
                    {props.confirmLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
