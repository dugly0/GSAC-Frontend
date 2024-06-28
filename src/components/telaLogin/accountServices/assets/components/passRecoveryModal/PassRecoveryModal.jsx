import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button, Form } from "react-bootstrap";
import logo from "./assets/images/logo-ipb.svg";
import "./assets/css/styles.css";
import axios from "axios";

export default function PassRecoveryModal({ isShow, handleClose }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // Add success message state

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null); // Reset success message

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/forgot",
        {
          email: email,
        }
      );
      setSuccess(
        "Foram enviadas instruções para recuperação de senha no seu e-mail."
      );
    } catch (error) {
      setError("Erro. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
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
              value={email}
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
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Recuperar Senha"}
            </Button>

            {error && <p className="text-danger mt-2">{error}</p>}
            {success && <p className="text-success mt-2">{success}</p>}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
