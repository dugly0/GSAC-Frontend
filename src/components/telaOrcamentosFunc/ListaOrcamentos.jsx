import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyVerticallyCenteredModal from "./ModalStatus";
import EditarOrc from "./EditarOrc";

const endpoints = {
  orcamentos: "http://localhost:8080/api/orcamento/orcamento-por-utilizador-id",
  laboratorios: "http://localhost:8080/api/laboratorio",
  estados: "http://localhost:8080/api/estado",
  servicos: "http://localhost:8080/api/servico",
};
const getToken = () => {
  const roleID = localStorage.getItem("role_id");
  if (roleID != 1) {
    alert("Você não tem permissão para acessar esta página.");
    return;
  }
  const token = localStorage.getItem("token");
  return token;
};
const getDados = async (key) => {
  try {
    const token = getToken();
    const result = await axios.get(endpoints[key], {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error("Failed to get token:", error);
    throw error;
  }
};

function ListaOrcamentos() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [estados, setEstado] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [orcamentoSelect, setOrcamentoSelect] = useState([]);
  const mostrarServicos = (item) => {
    setOrcamentoSelect(item);
    setModalShow(true);
  };
  const history = useNavigate();

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [orcamentoEdit, setOrcamentoEdit] = useState(null);

  const handleEdit = (item) => {
    setOrcamentoEdit(item);
    setShowModalEdit(true);
  };

  const getNomeLab = (id) => {
    const item = laboratorios.find((laboratorio) => laboratorio.id === id);
    return item ? item.nome : "";
  };
  const orcamentosAceitos = orcamentos.filter((orcamento) => {
    const ultimoEstado = orcamento.estadoOrcamentos.reduce((prev, current) =>
      prev.id > current.id ? prev : current
    );
    return ultimoEstado.estado === "Aceito";
  });
  // Lógica para filtrar apenas orçamentos aceitos
  const orcamentosNaoAceitos = orcamentos.filter(
    (orcamento) => !orcamentosAceitos.includes(orcamento)
  );
  // console.log(orcamentos)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setOrcamentos(await getDados("orcamentos"));
        console.log(orcamentos);
        setError(null);
        setLaboratorios(await getDados("laboratorios"));
        setError(null);
        setEstado(await getDados("estados"));
        setError(null);
        setServicos(await getDados("servicos"));
        setError(null);
        // console.log(
        //   "Laboratorios: " + JSON.stringify(laboratorios),
        //   "Estados: " + JSON.stringify(estado),
        //   "Servicos: " + JSON.stringify(servicos)
        // )
      } catch (err) {
        history("/");
        return;
      }
    };
    fetchData();
  }, [history]); // O array com history assegura que o efeito seja executado ao montar o componente e quando o objeto history mudar

  return (
    <Container>
      <Accordion defaultActiveKey="0" className="mt-5">
        <Accordion.Item
          eventKey="0"
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          <Accordion.Header>Orçamentos Solicitados</Accordion.Header>
          <Accordion.Body style={{ textAlign: "center" }}>
            <Table striped bordered hover>
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Data de entrada</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Data de entrega</th>
                  <th>Estado atual</th>
                  <th>Utilizador</th>
                  <th>Laboratório</th>
                  <th>Serviços e Estados</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {orcamentosNaoAceitos.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.data_entrada}</td>
                      <td>{item.descricao}</td>
                      <td>{item.preco}</td>
                      <td>{item.data_entrega}</td>
                      <td>{item.estadoOrcamentos[0].estado}</td>
                      <td>{item.utilizador_id}</td>
                      <td>{item.laboratorio_id}</td>
                      <td onClick={() => mostrarServicos(item)} className="">
                        <Button variant="outline-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                          </svg>
                        </Button>{" "}
                      </td>
                      <td onClick={() => handleEdit(item)}>
                        <Button variant="outline-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                          </svg>
                        </Button>{" "}
                      </td>
                    </tr>
                    {/* Renderiza o modal de edição apenas para o orçamento selecionado */}
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      orcamento={orcamentoSelect}
                      estados={estados}
                    />
                    {orcamentoEdit && orcamentoEdit.id === item.id && (
                      <EditarOrc
                        show={showModalEdit}
                        onHide={() => setShowModalEdit(false)}
                        orcamento={orcamentoEdit}
                        estados={estados}
                        servicos={servicos}
                        laboratorios={laboratorios}
                      />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <hr />
        <Accordion.Item
          eventKey="0"
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          <Accordion.Header>Orçamentos Solicitados</Accordion.Header>
          <Accordion.Body style={{ textAlign: "center" }}>
            <Table striped bordered hover>
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{error}</p>
              )}
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Data de entrada</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Data de entrega</th>
                  <th>Estado atual</th>
                  <th>Utilizador</th>
                  <th>Laboratório</th>
                  <th>Serviços e Estados</th>
                  <th>Editar</th>
                </tr>
              </thead>
              <tbody>
                {orcamentosAceitos.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.data_entrada}</td>
                      <td>{item.descricao}</td>
                      <td>{item.preco}</td>
                      <td>{item.data_entrega}</td>
                      <td>{item.estadoOrcamentos[0].estado}</td>
                      <td>{item.utilizador_id}</td>
                      <td>{getNomeLab(item.laboratorio_id)}</td>
                      <td onClick={() => mostrarServicos(item)} className="">
                        <Button variant="outline-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                          </svg>
                        </Button>{" "}
                      </td>
                      <td onClick={() => handleEdit(item)}>
                        <Button variant="outline-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-pencil-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                          </svg>
                        </Button>{" "}
                      </td>
                    </tr>
                    {/* Renderiza o modal de edição apenas para o orçamento selecionado */}
                    <MyVerticallyCenteredModal
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                      orcamento={orcamentoSelect}
                    />
                    {orcamentoEdit && orcamentoEdit.id === item.id && (
                      <EditarOrc
                        show={showModalEdit}
                        onHide={() => setShowModalEdit(false)}
                        orcamento={orcamentoEdit}
                        estados={estados}
                        servicos={servicos}
                        laboratorios={laboratorios}
                      />
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default ListaOrcamentos;
