import React, { useEffect, useState } from 'react';
import { Form, Button, } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar';
import axios from 'axios';
import './assets/css/perfis.css';

const Perfil = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nif, setNif] = useState("");
  const [pass, setPass] = useState("");
  const [editando, setEditando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:8080/api/utilizador/view-id`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const userData = response.data; // Dados retornados pela API

        setNome(userData.utilizador.nome);
        setEmail(userData.email);
        setTelefone(userData.utilizador.telefone || "");
        setEndereco(userData.utilizador.endereco || "");
        setCodigo(userData.utilizador.cod_postal || "");
        setNif(userData.utilizador.nif);
        setPass(""); // Defina a senha se estiver disponível na API
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditar = () => {
    setEditando(true);
  };

  const handleGerenciar = () => {
    setEditando(false);
  };

  const handleSalvar = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      if (!token) {
        alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
        return;
      }

      const response = await axios.put(
        'http://localhost:8080/api/utilizador/update-id',
        {
          id: userId,
          nome,
          email,
          telefone,
          endereco,
          cod_postal: codigo,
          nif,
          password: pass // Inclui a senha no payload
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        setEditando(false);
        alert("Dados atualizados com sucesso!");
      } else {
        console.error("Erro ao salvar dados do usuário:", response.statusText);
        alert("Erro ao salvar dados do usuário. Por favor, tente novamente.");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Permissão negada. Por favor, verifique suas credenciais.");
      } else {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição. Por favor, verifique sua conexão ou tente novamente mais tarde.");
      }
    }
  };


  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <>
      <Navbar tipoPerfil={true} tipoOrcamento={true} />
      <div style={{ paddingTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Form>
          {editando ? (
            <div className="container my-3">
              <div className="d-flex flex-wrap gap-3 flex-md-row flex-column">
                <Button className='button-perfil' as={Link} to="/orcamentosfunc/perfilfunc" variant="secondary" onClick={handleGerenciar}>Voltar</Button>{' '}
                <Button className='button-perfil' onClick={handleSalvar}>Salvar Alterações</Button>{' '}
              </div>
            </div>
          ) : (
            <div className='container my-3'>
              <div className="d-flex flex-wrap gap-3 flex-md-row flex-column">
                <Button className='button-perfil' as={Link} to="/orcamentosfunc" onClick={handleGerenciar}>Voltar</Button>{' '}
                <Button className='button-perfil' id='btn-1' as={Link} to="gerenciar" onClick={handleGerenciar}>Gerenciar Utilizadores</Button>{' '}
                <Button className='button-perfil' id='btn-2' onClick={handleEditar}>Editar Perfil</Button>{' '}
              </div>
            </div>
          )}
        </Form>
      </div>
      <div className="container mt-5 col-md-4">
        <h1 className="text-center">Perfil</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formNome">
            <Form.Label><b>Nome:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label><b>Email:</b></Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTelefone">
            <Form.Label><b>Telefone:</b></Form.Label>
            <Form.Control
              type="tel"
              placeholder="Digite seu telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEndereco">
            <Form.Label><b>Endereço:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formCodigo">
            <Form.Label><b>Código postal:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu código postal"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formNif">
            <Form.Label><b>Nif:</b></Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite seu Nif"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label><b>Palavra-passe:</b></Form.Label>
            <div className="d-flex align-items-center">
              <Form.Control
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua palavra-passe"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                readOnly={!editando} // Permite edição apenas quando editando
              />
            </div>
            {editando && (
              <div>
                <Form.Check
                  type="checkbox"
                  label="Mostrar senha"
                  checked={mostrarSenha}
                  onChange={toggleMostrarSenha}
                  style={{ marginTop: "10px" }}
                />
              </div>
            )}
          </Form.Group>
        </Form>
      </div>
    </>
  );
}

export default Perfil;
