import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./assets/css/formUpdate.css";

export default function FormUpdate({ user, utilizador }) {
  const [formData, setFormData] = useState({
    role_id: "",
    idLab: "",
    username: "",
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    cod_postal: "",
    nif: "",
  });
  const [laboratorios, setLaboratorios] = useState([]);
  const [fetching, setFetching] = useState(false);
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

  useEffect(() => {
    if (user) {
      setFormData({
        role_id: user.role_id || "",
        idLab: user.utilizador?.idLab || "",
        username: user.username || "",
        nome: user.utilizador?.nome || "",
        email: user.email || "",
        telefone: user.utilizador?.telefone || "",
        endereco: user.utilizador?.endereco || "",
        cod_postal: user.utilizador?.cod_postal || "",
        nif: user.utilizador?.nif || "",
      });
    }

    if (!fetching) {
      setFetching(true);
      const fetchLaboratorios = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:8080/api/laboratorio', {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          });
          setLaboratorios(response.data);
        } catch (error) {
          console.error("Erro ao buscar laboratórios:", error);
        }
      };

      fetchLaboratorios();
    }
  }, [user, utilizador, fetching]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSalvar = async () => {
    try {
      const token = localStorage.getItem('token');
      
      let role_id;
      switch (formData.role_id) {
        case "Admin":
          role_id = 1;
          break;
        case "Cliente":
          role_id = 2;
          break;
        case "Laboratório":
          role_id = 3;
          break;
        default:
          role_id = user.role_id;
      }

      const userResponse = await axios.put(
        `http://localhost:8080/api/user/${user.id}`,
        {
          username: formData.username,
          email: formData.email,
          role_id: role_id,
          idLab: formData.idLab,
          nome: formData.nome,
          telefone: formData.telefone,
          endereco: formData.endereco,
          cod_postal: formData.cod_postal,
          nif: formData.nif,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (userResponse.status === 200) {
        showMessageAuto('Alterações salvas com sucesso!', 'success');
      } else {
        console.error(userResponse.data.message);
        showMessageAuto('Erro ao salvar dados. Por favor, tente novamente.', 'error');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        showMessageAuto('Permissão negada. Por favor, verifique suas credenciais.', 'error');
      } else {
        console.error(error);
        showMessageAuto('Erro na requisição. Por favor, verifique sua conexão ou tente novamente mais tarde.', 'error');
      }
    }
  };

  return (
    <div>
      <Button className='button-perfil' onClick={handleSalvar}>Salvar Alterações</Button>{' '}
      <Form.Group className="mb-1">
        <Form.Label>Tipo</Form.Label>
        <Form.Select
          className="form-control"
          value={formData.role_id}
          name="role_id"
          onChange={handleChange}
          disabled={false}
        >
          <option value="" disabled hidden>
            Selecione o tipo da conta
          </option>
          <option value="Admin">Admin</option>
          <option value="Cliente">Cliente</option>
          <option value="Laboratório">Laboratório</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Laboratório</Form.Label>
        <Form.Select
          className="form-control"
          value={formData.idLab}
          name="idLab"
          onChange={handleChange}
        >
          <option value="" disabled hidden>
            Escolha o Laboratório
          </option>
          <option value="">Sem Laboratório</option>
          {laboratorios.map((lab) => (
            <option key={lab.id} value={lab.id}>
              {lab.nome}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Nome de Utilizador</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nome Completo"
          value={formData.username}
          name="username"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nome Completo"
          value={formData.nome}
          name="nome"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-1" controlId="campoEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="exemplo@email.com"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Telefone</Form.Label>
        <Form.Control
          type="text"
          placeholder="000 000 000"
          value={formData.telefone}
          name="telefone"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Endereço</Form.Label>
        <Form.Control
          type="text"
          placeholder="Rua ou Avenida/N/Distrito"
          value={formData.endereco}
          name="endereco"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Cód. Postal</Form.Label>
        <Form.Control
          type="text"
          placeholder="Insira o código postal"
          value={formData.cod_postal}
          name="cod_postal"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-1">
        <Form.Label>Nif</Form.Label>
        <Form.Control
          type="number"
          placeholder="Insira o Nif"
          value={formData.nif}
          name="nif"
          onChange={handleChange}
        />
      </Form.Group>
      {showMessage && <p className={`message ${messageType}`}>{message}</p>}
      <Button className='button-perfil' onClick={handleSalvar}>Salvar Alterações</Button>{' '}
    </div>
  );
}
