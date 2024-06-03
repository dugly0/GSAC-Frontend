import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

export default function FormUpdate({ user }) {
  const [formData, setFormData] = useState({
    tipo: "",
    idLab: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    cod_postal: "",
    nif: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        tipo:
          user.role_id === 1
            ? "Admin"
            : user.role_id === 2
            ? "Cliente"
            : "Laboratório",
        idLab: user.utilizador?.idLab || "",
        nome: user.utilizador?.nome || user.username,
        email: user.email || "",
        telefone: user.utilizador?.telefone || "",
        endereco: user.utilizador?.endereco || "",
        cod_postal: user.utilizador?.cod_postal || "",
        nif: user.utilizador?.nif || "",
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Tipo</Form.Label>
        <Form.Select
          className="form-control"
          value={formData.tipo}
          name="tipo"
          onChange={handleChange}
          disabled={false}
        >
          <option value="" disabled hidden>
            Selecione o tipo da conta
          </option>
          <option>Admin</option>
          <option>Cliente</option>
          <option>Laboratório</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Id Laboratório</Form.Label>
        <Form.Control
          type="number"
          placeholder="Escolha o Id do laboratório"
          value={formData.idLab}
          name="idLab"
          onChange={handleChange}
          enable
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nome Completo"
          value={formData.nome}
          name="nome"
          onChange={handleChange}
          enable
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="campoEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="exemplo@email.com"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Telefone</Form.Label>
        <Form.Control
          type="text"
          placeholder="000 000 000"
          value={formData.telefone}
          name="telefone"
          onChange={handleChange}
          enable
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Endereço</Form.Label>
        <Form.Control
          type="text"
          placeholder="Rua ou Avenida/N/Distrito"
          value={formData.endereco}
          name="endereco"
          onChange={handleChange}
          enable
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cód. Postal</Form.Label>
        <Form.Control
          type="text"
          placeholder="Insira o código postal"
          value={formData.cod_postal}
          name="cod_postal"
          onChange={handleChange}
          enable
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Nif</Form.Label>
        <Form.Control
          type="number"
          placeholder="Insira o Nif"
          value={formData.nif}
          name="nif"
          onChange={handleChange}
          enable
        />
      </Form.Group>
    </div>
  );
}
