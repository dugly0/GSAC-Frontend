import { Collapse } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormCreate from "./formCreate";

export default function ModalUpdate({ isShow, handleClose }) {


  return (
    <Modal show={isShow} onHide={handleClose} scrollable>
      <Modal.Header>
        <Modal.Title>
          <img className="img1" src="src/assets/logo-ipb.png"></img>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <FormCreate />
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
