import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button, Form } from "react-bootstrap";
import logo from "./assets/images/logo-ipb.svg";
import "./assets/css/styles.css";

export default function PassRecoveryModal({ isShow, handleClose }) {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // enviar email para api
    console.log("Email enviado para recuperação:", email);
    // fechar modal
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
          <Form.Group controlId="formEmail">
            <Form.Label className="pt-1">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email.email}
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
              Recuperar Senha
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
