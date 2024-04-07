import { Collapse } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import User from "./User";
import FormUpdate from "./formUpdate";
import { useState } from "react";

export default function ModalUpdate({ isShow, handleClose }) {
  const [open, setOpen] = useState(false);
  const handleCollapseToggle = () => {
    setOpen(!open);
  };

  return (
    <Modal show={isShow} onHide={handleClose} scrollable>
      <Modal.Header>
        <Modal.Title>
          <img className="img1" src="src/assets/logo-ipb.png"></img>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <User handleCollapseToggle={handleCollapseToggle} />
        <Collapse in={open}>
          <div id="example-collapse-text">
            <FormUpdate />
          </div>
        </Collapse>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleClose}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}
