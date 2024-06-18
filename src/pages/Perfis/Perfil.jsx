import React, { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
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
  const [confirmPass, setConfirmPass] = useState("");
  const [editando, setEditando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [initialProfileData, setInitialProfileData] = useState({});
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState(''); // 'error' ou 'success'

  // Função para mostrar a mensagem
  const showMessageAuto = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 4000);
  };
  const roleId = localStorage.getItem('role_id');
  const backPagePerfil = () => {
    return roleId === "2" ? "/orcamentos/perfil" : "/orcamentoslab/perfil";
  }
  const backPageOrcamentos = () => {
    return roleId === "2" ? "/orcamentos" : "/orcamentoslab";
  }
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`http://localhost:8080/api/utilizador/view-id`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const userData = response.data;

        const initialData = {
          nome: userData.utilizador.nome || "",
          email: userData.email || "",
          telefone: userData.utilizador.telefone || "",
          endereco: userData.utilizador.endereco || "",
          codigo: userData.utilizador.cod_postal || "",
          nif: userData.utilizador.nif || "",
        };

        setNome(initialData.nome);
        setEmail(initialData.email);
        setTelefone(initialData.telefone);
        setEndereco(initialData.endereco);
        setCodigo(initialData.codigo);
        setNif(initialData.nif);
        setPass("");
        setConfirmPass("");
        setMostrarSenha(false); // Garante que a senha não seja mostrada ao carregar os dados
        setInitialProfileData(initialData);
      } catch (error) {
        console.error("Erro na requisição:", error);
        showMessageAuto('Erro ao buscar dados do usuário.', 'error');
      }
    };

    fetchUserData();
  }, []);

  const handleEditar = () => {
    setEditando(true);
  };

  const handleSalvar = async () => {
    if (pass !== confirmPass) {
      showMessageAuto('As senhas não coincidem. Por favor, verifique.', 'error');
      return;
    }

    const hasChanges = (
      nome !== initialProfileData.nome ||
      email !== initialProfileData.email ||
      telefone !== initialProfileData.telefone ||
      endereco !== initialProfileData.endereco ||
      codigo !== initialProfileData.codigo ||
      nif !== initialProfileData.nif ||
      pass !== ""
    );

    if (!hasChanges) {
      showMessageAuto('Nenhuma alteração realizada.', 'default');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('user_id');
      if (!token) {
        showMessageAuto('Por favor, faça login novamente.', 'error');
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
          password: pass
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        showMessageAuto('Alterações salvas com sucesso!', 'success');
        setEditando(false);
        setPass("");
        setConfirmPass("");
        setMostrarSenha(false);
        setInitialProfileData({ nome, email, telefone, endereco, codigo, nif }); // Atualiza os dados iniciais
      } else {
        console.error("Erro ao salvar dados do usuário:", response.statusText);
        showMessageAuto('Erro ao salvar dados. Por favor, tente novamente.', 'error');
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        showMessageAuto('Permissão negada. Por favor, verifique suas credenciais.', 'error');
      } else {
        console.error("Erro na requisição:", error);
        showMessageAuto('Erro na requisição. Por favor, verifique sua conexão ou tente novamente mais tarde.', 'error');
      }
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };
  const handleGerenciar = () => {
    setEditando(false);
  };

  return (
    <>
      <Navbar tipoPerfil={true} tipoOrcamento={true} />
      <div className="container mt-3 col-md-4">
        <h1 className="text-center">Perfil</h1>
        <Form>
          <Form.Group className="mb-1" controlId="formNome">
            <Form.Label><b>Nome:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formEmail">
            <Form.Label><b>Email:</b></Form.Label>
            <Form.Control
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formTelefone">
            <Form.Label><b>Telefone:</b></Form.Label>
            <Form.Control
              type="tel"
              placeholder="Digite seu telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formEndereco">
            <Form.Label><b>Endereço:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formCodigo">
            <Form.Label><b>Código postal:</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu código postal"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          <Form.Group className="mb-1" controlId="formNif">
            <Form.Label><b>Nif:</b></Form.Label>
            <Form.Control
              type="number"
              placeholder="Digite seu Nif"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
              readOnly={!editando}
            />
          </Form.Group>
          {editando && (
            <>
              <Form.Group className="mb-1" controlId="formPassword">
                <Form.Label><b>Palavra-passe:</b></Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Alterar Palavra-passe"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    readOnly={!editando}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-1" controlId="formConfirmPassword">
                <Form.Label><b>Confirmar Palavra-passe:</b></Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Confirmar Nova Palavra-passe"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    readOnly={!editando}
                  />
                </div>
              </Form.Group>
              <div>
                <Form.Check
                  type="checkbox"
                  label="Mostrar senha"
                  checked={mostrarSenha}
                  onChange={toggleMostrarSenha}
                  style={{ marginTop: "10px" }}
                />
              </div>
              {pass !== confirmPass && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                  As senhas não coincidem.
                </div>
              )}
            </>
          )}
        </Form>
        {showMessage && <p className={`message ${messageType}`}>{message}</p>}
      </div>
      <div className="pt-3 pb-2 d-flex justify-content-center align-items-center">
        <Form>
          {editando ? (
            <div className="container my-1">
              <div className="d-flex flex-wrap gap-3 flex-md-row flex-column">
                <Button className='button-perfil' as={Link} to={backPagePerfil()} onClick={handleGerenciar}>Voltar</Button>{' '}
                <Button className='button-perfil' onClick={handleSalvar}>Salvar Alterações</Button>{' '}
              </div>
            </div>
          ) : (
            <div className='container my-1'>
              <div className="d-flex flex-wrap gap-3 flex-md-row flex-column">
                <Button className='button-perfil' as={Link} to={backPageOrcamentos()} onClick={handleGerenciar}>Voltar</Button>{' '}
                <Button className='button-perfil' id='btn-2' onClick={handleEditar}>Editar Perfil</Button>{' '}
              </div>
            </div>
          )}
        </Form>
      </div>
    </>
  );
};

export default Perfil;