import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import './assets/css/navbar.css';

export default function RenderNavbar({ tipoOrcamento }) {
  const [autenticado, setAutenticado] = useState(false);
  const [nome, setNome] = useState('');
  const location = useLocation();
  const nav = useNavigate();

  const roleId = localStorage.getItem('role_id');
  const path = roleId === '1' ? '/perfilfunc' : '/perfil';
  const patho =
    roleId === '1' ? '/orcamentosfunc' : roleId === '2' ? '/orcamentos' : '/orcamentoslab';

  useEffect(() => {
    const verificarAutenticacao = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        setAutenticado(true);

        try {
          const response = await axios.get('http://localhost:8080/api/utilizador/view-id', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const data = response.data;
            setNome(data.utilizador.nome);
          } else {
            console.error('Erro ao buscar dados do usuário:', response.statusText);
          }
        } catch (error) {
          console.error('Erro na requisição:', error);
        }
      } else {
        setAutenticado(false);
      }
    };

    verificarAutenticacao();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role_id');
    localStorage.removeItem('user_id');
    setAutenticado(false);
    nav('/');
  };

  const isLoginScreen = location.pathname === './components/telaLogin/formInput/FormInput'; // Verifica se está na tela de login

  if (isLoginScreen || !autenticado) {
    return (
      <div id='nav-out'>
        {/* Estilo cinza para a tela de login */}
      </div>
    );
  }

  return (
    <Navbar expand="lg" style={{ backgroundColor: '#820053' }}>
      <Container>
        <Navbar.Brand onClick={() => nav(patho)} style={{ cursor: 'pointer', color: 'white' }}>
          IPB.Orçamentos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="ml-auto">
            <NavDropdown className="nav-name" title={<span>{nome}</span>}>
              <NavDropdown.Item className="drop-custom" onClick={() => nav(patho + path)}>Perfil</NavDropdown.Item>
              <NavDropdown.Item className="drop-custom" onClick={handleLogout}>Sair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
