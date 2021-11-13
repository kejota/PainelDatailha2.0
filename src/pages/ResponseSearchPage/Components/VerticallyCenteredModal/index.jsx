import React from 'react'

import { Modal, Button } from 'react-bootstrap'

function VerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Datailha Forms
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>{props.titleSearch}</h4>
                <p>
                    Sua resposta foi cadastrada com sucesso!
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default VerticallyCenteredModal

