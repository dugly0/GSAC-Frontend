import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

export default function BasicExample({ tipoPerfil, tipoOrcamento }) {
  const path = tipoPerfil ? "/perfil" : "/perfilfunc";
  const patho = tipoOrcamento ? "/orcamentos" : "/orcamentosfunc";
  const isPerfilPage = location.pathname.includes("perfil");
  const nav = useNavigate();

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#820053" }}>
      <Container>
        <Navbar.Brand onClick={()=>nav(patho)} 
        style={{
          cursor:"pointer",
          color:"white",
        }}>
          IPB.Orçamentos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="ml-auto">
            <NavDropdown
              title={<span style={{ color: "white" }}>Fulana</span>}
              id="basic-nav-dropdown"
            >
              {!isPerfilPage && (
                <NavDropdown.Item onClick={() => nav(patho + path)}>
                  Perfil
                </NavDropdown.Item>
              )}
              <NavDropdown.Item onClick={() => nav("/")}>Sair</NavDropdown.Item>
            </NavDropdown>

            <div className="d-flex align-items-center">
              <img
                src="../../src/assets/imagem_perfil.png"
                alt="Foto do usuário"
                className="rounded-circle"
                style={{ width: "40px", height: "40px" }}
              />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
