import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const CreateTask=()=> {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Создать задачу
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Создание задачи</Modal.Title>
                </Modal.Header>
                <Modal.Body></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Создать
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}