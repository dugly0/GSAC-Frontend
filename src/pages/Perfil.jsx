import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Navbar from '../components/Navbar';

const Perfil = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [codigo, setCodigo] = useState("");
  const [nif, setNif] = useState("");
  const [pass, setPass] = useState(""); // Adicione o estado para a senha
  const [editando, setEditando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/utilizador/7', {
          headers: {
            'Authorization': token 
          }
        });

        if (response.ok) {
          const data = await response.json();
          setNome(data.utilizador.nome);
          setEmail(data.email);
          setTelefone(data.utilizador.telefone || "");
          setEndereco(data.utilizador.endereco || "");
          setCodigo(data.utilizador.cod_postal || "");
          setNif(data.utilizador.nif);
          setPass(data.password || ""); // Defina a senha se estiver disponível na API
        } else {
          console.error("Erro ao buscar dados do usuário:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditar = () => {
    setEditando(true);
  };

  const handleSalvar = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/utilizador/7', { // Supondo que sua API use PUT para atualizar
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token 
        },
        body: JSON.stringify({
          nome,
          telefone,
          endereco,
          cod_postal: codigo,
          nif,
          password: pass, // Inclua a senha se necessário
        })
      });

      if (response.ok) {
        setEditando(false);
        // Lógica para lidar com sucesso (exibir mensagem, etc.)
      } else {
        console.error("Erro ao salvar dados do usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <>
    <Navbar tipoPerfil={true} tipoOrcamento={true}/>
    <div className="container mt-5">
    <img src="../src/assets/imagem_perfil.png" style={{
            width: "150px",
            height: "150px", 
            borderRadius: "50%", 
            marginBottom: "20px", 
            display: "block",
            margin: "0 auto"
          }}
        />
      <h1 className="text-center">Perfil</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formNome">
          <Form.Label>
            <b>Nome:</b>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            readOnly={!editando}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>
            <b>Email:</b>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!editando}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formTelefone">
          <Form.Label>
            <b>Telefone:</b>
          </Form.Label>
          <Form.Control
            type="tel"
            placeholder="Digite seu telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            readOnly={!editando}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEndereco">
          <Form.Label>
            <b>Endereço</b>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu endereço"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            readOnly={!editando}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCodigo">
          <Form.Label>
            <b>Código postal</b>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite seu Código postal"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            readOnly={!editando}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNif">
          <Form.Label>
            <b>Nif</b>
          </Form.Label>
          <Form.Control
            type="number"
            placeholder="Digite seu nif"
            value={nif}
            onChange={(e) => setNif(e.target.value)}
            readOnly={!editando}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>
            <b>Palavra-passe</b>
          </Form.Label>
          <div className="d-flex align-items-center ">
            <Form.Control
              type={mostrarSenha ? "text" : "password"}
              placeholder="Digite sua Palavra-passe"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              readOnly={!editando}
            />
            <Button
              variant="primary"
              onClick={toggleMostrarSenha}
              style={{ marginLeft: "5px", backgroundColor: "#820053" }}
            >
              {mostrarSenha ? "Ocultar" : "Mostrar"}
            </Button>
          </div>
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Form>
        {editando ? (
          <Button
            style={{ backgroundColor: "#820053" }}
            className="btn btn-primary bt"
            variant="primary"
            onClick={handleSalvar}
          >
            Salvar
          </Button>
        ) : (
          <Button
            style={{ backgroundColor: "#820053" }}
            variant="secondary"
            onClick={handleEditar}
          >
            Editar
          </Button>
        )}
      </Form>
    </div>
    </Form>
    </div>
    </>
  );
};

export default Perfil;