import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function formCreate() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    newPassword: "",
    nome: "",
    nif: "",
    cod_postal: "",
    endereco: "",
    telefone: "",
    idLab: null, // Valor inicial padrão
    role_id: 2,
  });

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obter o token do LocalStorage

    axios
      .get("http://localhost:8080/api/laboratorio", {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir o token no cabeçalho da requisição
        },
      })
      .then((response) => {
        setLaboratorios(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar laboratórios:", error);
        // Lógica para lidar com o erro (ex: token inválido)
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpa o idLab se a função não for "Laboratório"
    if (name === "role_id" && value !== "3") {
      setFormData({
        ...formData,
        [name]: value,
        idLab: null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    // Cria uma cópia dos dados do formulário
    const dataToSend = { ...formData };

    if (formData.role_id !== "3") {
      dataToSend.idLab = null;
    }

    
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/register",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Registro bem-sucedido:", response.data);

    } catch (error) {
      console.error("Erro ao registrar:", error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Função</Form.Label>
          <Form.Select
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
          >
            <option value={1}>Admin</option>
            <option value={2}>Cliente</option>
            <option value={3}>Laboratório</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nome de usuário</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            placeholder="Senha"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nome Completo</Form.Label>
          <Form.Control
            type="text"
            name="nome"
            placeholder="Nome Completo"
            value={formData.nome}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>NIF</Form.Label>
          <Form.Control
            type="text"
            name="nif"
            placeholder="NIF"
            value={formData.nif}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control
            type="text"
            name="cod_postal"
            placeholder="Código Postal"
            value={formData.cod_postal}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Endereço</Form.Label>
          <Form.Control
            type="text"
            name="endereco"
            placeholder="Endereço"
            value={formData.endereco}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Telefone</Form.Label>
          <Form.Control
            type="text"
            name="telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </Form.Group>

        {formData.role_id === "3" && (
          <Form.Group className="mb-3">
            <Form.Label>Laboratório</Form.Label>
            <Form.Select
              name="idLab"
              value={formData.idLab}
              onChange={handleChange}
            >
              {laboratorios.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
        <button type="submit">Registrar</button>
      </Form>
    </div>
  );
}