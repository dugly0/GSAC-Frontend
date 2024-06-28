import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormCreate from "./formCreate";

export default function ModalCreate({ isShow, handleClose }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nome: "",
    nif: "",
    cod_postal: "",
    endereco: "",
    telefone: "",
    idLab: null,
    role_id: 2,
  });

  const formCreateRef = useRef();

  const handleSubmit = async () => {
    if (formCreateRef.current) {
      await formCreateRef.current.handleSubmit();
    }
  };

  return (
    <Modal show={isShow} onHide={handleClose} scrollable>
      <Modal.Header>
        <Modal.Title>
          <img className="img1" src="../../src/assets/logo-ipb.png" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormCreate
          ref={formCreateRef}
          formData={formData}
          setFormData={setFormData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Registrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
