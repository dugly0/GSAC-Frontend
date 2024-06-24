import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Modal, Button, Form } from "react-bootstrap";
import logo from "./assets/images/logo-ipb.svg";
import "./assets/css/styles.css";
import axios from "axios";

export default function SignUpModal({ isShow, handleClose }) {
  const [formData, setFormData] = useState({
    username: "",
    nomeCompleto: "",
    newPassword: "",
    nif: "",
    email: "",
    cod_postal: "",
    endereco: "",
    telefone: "",
    idLab: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username: formData.username,
          newPassword: formData.newPassword,
          nome: formData.nomeCompleto,
          nif: formData.nif,
          email: formData.email,
          cod_postal: formData.cod_postal,
          endereco: formData.endereco,
          telefone: formData.telefone,
          idLab: formData.idLab,
        }
      );
    } catch (error) {
      console.error(
        "Erro no registro:",
        error.response ? error.response.data : error
      );
    }
    handleClose();
  };

  return (
    <Modal show={isShow} onHide={handleClose} scrollable>
      <Modal.Header>
        <Modal.Title>
          <div className="pt-1 mb-2">
            <img
              src={logo}
              alt="logo-ipb"
              className="img-fluid"
              style={{ width: "250px", height: "auto" }}
            />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername">
            <Form.Label className="pt-1">Nome de Usuário</Form.Label>
            <Form.Control
              type="text"
              name="username"
              maxLength={20}
              placeholder="Digite seu nome de usuário"
              value={formData.username}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label className="pt-1">E-mail</Form.Label>
            <Form.Control
              type="email"
              name="email"
              maxLength={50}
              placeholder="Digite seu nome de e-mail"
              value={formData.email}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="formNomeCompleto">
            <Form.Label className="pt-1">Nome Completo</Form.Label>
            <Form.Control
              type="text"
              name="nomeCompleto"
              placeholder="Digite seu nome completo"
              value={formData.nomeCompleto}
              maxLength={55}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label className="pt-1">Nova Senha</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              placeholder="Digite sua nova senha"
              value={formData.newPassword}
              maxLength={255}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="formNif">
            <Form.Label className="pt-1">NIF</Form.Label>
            <Form.Control
              type="number"
              name="nif"
              placeholder="Digite seu NIF"
              value={formData.nif}
              maxLength={10}
              onChange={handleChange}
              required
              className="custom-input"
              style={{
                MozAppearance: "textfield", // Para Firefox
                WebkitAppearance: "none", // Para Chrome, Safari e Opera
              }}
            />
          </Form.Group>
          <Form.Group controlId="formCodPostal">
            <Form.Label className="pt-1">Código Postal</Form.Label>
            <Form.Control
              type="text"
              name="cod_postal"
              placeholder="Digite seu código postal"
              value={formData.cod_postal}
              maxLength={15}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="formEndereco">
            <Form.Label className="pt-1">Endereço</Form.Label>
            <Form.Control
              type="text"
              name="endereco"
              placeholder="Digite seu endereço"
              value={formData.endereco}
              maxLength={100}
              onChange={handleChange}
              required
              className="custom-input"
            />
          </Form.Group>
          <Form.Group controlId="formTelefone">
            <Form.Label className="pt-1">Telefone</Form.Label>
            <Form.Control
              type="text"
              name="telefone"
              placeholder="Digite seu telefone"
              value={formData.telefone}
              maxLength={20}
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
