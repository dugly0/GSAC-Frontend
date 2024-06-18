import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function BasicExample({ tipoOrcamento }) {
  const roleId = localStorage.getItem("role_id");

  let patho;
  if (roleId === "1") {
    patho = `/orcamentosfunc`;
  } else if (roleId === "2") {
    patho = `/orcamentos`;
  } else if (roleId === "3") {
    patho = `/orcamentoslab`;
  }

  let path;
  if (roleId === "1") {
    path = `/perfilfunc`;
  } else if (roleId === "2") {
    path = `/perfil`;
  } else if (roleId === "3") {
    path = `/perfillab`;
  }

  const location = useLocation();
  const isPerfilPage = location.pathname.includes("perfil");
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role_id");
    nav("/");
  };

  const [nome, setNome] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:8080/api/utilizador/view-id`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          setNome(data.utilizador.nome);
        } else {
          console.error("Erro ao buscar dados do usuário:", response.statusText);
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#820053" }}>
      <Container>
        <Navbar.Brand
          onClick={() => nav(path)}
          style={{ cursor: "pointer", color: "white" }}
        >
          IPB.Orçamentos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="ml-auto">
            <NavDropdown
              title={<span style={{ color: "white" }}>{nome}</span>}
              id="basic-nav-dropdown"
            >
              {!isPerfilPage && (
                <NavDropdown.Item onClick={() => nav(patho + path)}>
                  Perfil
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={handleLogout}>Sair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
