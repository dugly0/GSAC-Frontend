import { useState } from "react";
import Button from "react-bootstrap/Button";

import Modal from "react-bootstrap/Modal";
import FormOramentos from "./FormOrcamentos";

function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex justify-content-end p-2">
        <Button
          variant="outline-light"
          onClick={handleShow}
          style={{ backgroundColor: "#820053" }}
        >
          Solicitar Orçamento
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        ></Modal.Header>
        <Modal.Body style={{ backgroundColor: "rgb(255, 255, 255)" }}>
          <FormOramentos />
        </Modal.Body>
        <Modal.Footer
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
        ></Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
