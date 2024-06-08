import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormCreate from "./formCreate";

export default function ModalCreate({ isShow, handleClose }) {
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    nome: "",
    nif: "",
    cod_postal: "",
    endereco: "",
    telefone: "",
    idLab: null,
    role_id: 2,
  });

  const handleSubmit = async () => {
    await FormCreate.handleSubmit(); // Supondo que a função handleSubmit esteja definida no FormCreate
    handleClose(); // Fechar o modal após a submissão do formulário
  };

  return (
    <Modal show={isShow} onHide={handleClose} scrollable>
      <Modal.Header>
        <Modal.Title>
          <img className="img1" src="../../src/assets/logo-ipb.png" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormCreate formData={formData} setFormData={setFormData} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}