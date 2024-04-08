import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import Modal from 'react-bootstrap/Modal';
import FormOramentos from './FormOrcamentos';

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <div className='d-flex justify-content-end p-2'>
      <Button variant="outline-light" onClick={handleShow} style={{ backgroundColor: "#820053" }}>
        Solicitar Orçamento
      </Button>
      </div>

      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton style={{ backgroundColor: "rgb(108, 117, 125)" }}>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgb(108, 117, 125)" }}>
          <FormOramentos />
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "rgb(108, 117, 125)" }}>
            <Button variant="outline-light" onClick={handleClose}style={{ backgroundColor: "#820053" }}>
            Voltar
            </Button>
            <Button variant="outline-light" onClick={handleClose}style={{ backgroundColor: "#820053" }}>
            Solicitar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;