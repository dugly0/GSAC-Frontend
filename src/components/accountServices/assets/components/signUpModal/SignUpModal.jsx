import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button, Form } from "react-bootstrap";
import logo from "./assets/images/logo-ipb.svg";
import "./assets/css/styles.css";

export default function SignUpModal({ isShow, handleClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // utilizar Api
    console.log("Formulário submetido:", formData);
    // fechar o modal
    handleClose();
  };

  return (
    <Modal show={isShow} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="pt-1 mb-2">
            <img src={logo} alt="logo-ipb" className="img-fluid" />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label className="pt-1">Nome</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              placeholder="Digite seu nome"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label className="pt-1">Apelido</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              placeholder="Digite seu apelido"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label className="pt-1">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label className="pt-1">Senha</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="ConfirmPassword">
            <Form.Label className="pt-1">Confirme sua senha</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Digite sua senha"
              value={formData.password}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>

          <div className="grid text-center">
            <Button
              className="mt-3 button text-center"
              variant="primary"
              type="submit"
            >
              Cadastrar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
