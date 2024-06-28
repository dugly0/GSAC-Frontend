import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormCreate from "../formCreate";
import "./assets/css/modalCreate.css";


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
    email: "",
  });

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' ou 'success'

  const showMessageAuto = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };

  const formCreateRef = useRef();

  const handleSubmit = async () => {
    if (formCreateRef.current) {
      const success = await formCreateRef.current.handleSubmit();
      if (success) {
        showMessageAuto("Usuário registrado com sucesso!", "success");
        setFormData({
          username: "",
          password: "",
          nome: "",
          nif: "",
          cod_postal: "",
          endereco: "",
          telefone: "",
          idLab: null,
          role_id: 2,
          email: "",
        });
      } else {
        showMessageAuto("Erro ao registrar. Por favor, tente novamente.", "error");
      }
    }
  };

  return (
    <Modal show={isShow} onHide={handleClose} scrollable>
      <Modal.Header className="d-flex flex-column align-items-center justify-content-center">
          <Modal.Title className="mb-3">
            <img className="img1" src="../../src/assets/logo-ipb.png" />
          </Modal.Title>
          <div className="w-100">
            {showMessage && <p className={`message ${messageType}`}>{message}</p>}
          </div>
        
      </Modal.Header>
      <Modal.Body>
        <FormCreate
          ref={formCreateRef}
          formData={formData}
          setFormData={setFormData}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className="button" onClick={handleClose}>Fechar</Button>
        <Button className="button" onClick={handleSubmit}>Registrar</Button>
      </Modal.Footer>
    </Modal>
  );
}
