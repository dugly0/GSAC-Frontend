import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function BasicExample() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#820053" }}>
      <Container>
        <Navbar.Brand href="#home" style={{ color: "white" }}>
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
              <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Sair</NavDropdown.Item>
            </NavDropdown>
            <div className="d-flex align-items-center">
              <img
                src="./src/assets/imagem_perfil.png"
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
