import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import ModalButton from "./ModalButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyVerticallyCenteredModal from "./ModalStatus";
import ModalAceitarRecusar from "./ModalAceitarRecusar";

const endpoint =
  "http://localhost:8080/api/orcamento/orcamento-por-utilizador-id";
const getToken = () => {
  const roleID = localStorage.getItem("role_id");
  if (roleID != 2) {
    alert("Você não tem permissão para acessar esta página.");
    return;
  }
  const token = localStorage.getItem("token");
  return token;
};
const getOrcamentos = async () => {
  try {
    const token = getToken();
    const result = await axios.get(endpoint, {
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

function BasicExample() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [error, setError] = useState(null);

  const history = useNavigate();
  const [showModalAceitarRecusar, setShowModalAceitarRecusar] = useState(false);
  const [showModalServicosEstados, setShowModalServicosEstados] =
    useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleShowModalAceitarRecusar = (itemId) => {
    setSelectedItemId(itemId);
    setShowModalAceitarRecusar(true);
  };

  const handleShowModalServicosEstados = (itemId) => {
    setSelectedItemId(itemId);
    setShowModalServicosEstados(true);
  };

  const handleHideModal = () => {
    setSelectedItemId(null);
    setShowModalAceitarRecusar(false);
    setShowModalServicosEstados(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrcamentos();
        setOrcamentos(data);
        setError(null);
      } catch (err) {
        // Verifica se o erro é devido à falta de orçamentos (por exemplo, status 404)
        if (err.response && err.response.status === 404) {
          setOrcamentos([]); // Define o estado como um array vazio
        } else {
          // Outros tipos de erro (autenticação, etc.)
          history("/"); // Redireciona para a página inicial
          return;
        }
      }
    };

    fetchData();
  }, [history]);

  const orcamentosSolicitados = orcamentos.filter(
    (item) => item.estadoAtual.estado !== "Aceito"
  );
  const prestacaoServicos = orcamentos.filter(
    (item) => item.estadoAtual.estado === "Aceito"
  );

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
                  <th>Serviços e Estados</th>
                  <th>Aceitar ou Recusar Orçamento</th>
                </tr>
              </thead>
              <tbody>
                {orcamentosSolicitados.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.data_entrada}</td>
                      <td>{item.descricao}</td>
                      <td>{item.preco}</td>
                      <td>{item.data_entrega}</td>
                      <td>{item.estadoAtual.estado}</td>
                      <td
                        onClick={() => handleShowModalServicosEstados(item.id)}
                        className=""
                      >
                        <Button variant="outline-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                          </svg>
                        </Button>{" "}
                      </td>

                      <td>
                        <Button
                          variant="outline-info"
                          onClick={() => handleShowModalAceitarRecusar(item.id)}
                          disabled={
                            item.estadoAtual.estado !==
                            "Aguardando resposta do cliente"
                          } // Desabilita se o estado não for o desejado
                        >
                          Aceitar/Recusar
                        </Button>
                      </td>
                    </tr>
                    {/* Renderiza o modal de edição apenas para o orçamento selecionado
                    {orcamentoEdit && orcamentoEdit.id === item.id && (
                      <EditOrcamentoModal
                        show={showModalEdit}
                        onHide={() => setShowModalEdit(false)}
                        orcamento={orcamentoEdit}
                        onEdit={(updatedOrcamento) => {
                          // Lógica para atualizar o orçamento na API e no estado local
                          // ...
                        }}
                      />
                    )} */}
                    {/* Renderiza o modal apenas para o orçamento selecionado */}
                    {selectedItemId === item.id && ( // Adicionado modalShow na condição
                      <MyVerticallyCenteredModal
                        show={showModalServicosEstados}
                        onHide={handleHideModal}
                        itemId={orcamentos.find(
                          (orcamento) => orcamento.id === selectedItemId
                        )}
                      />
                    )}
                  </React.Fragment>
                ))}

                {/* Renderiza a mensagem "Nenhum orçamento encontrado" se não houver orçamentos */}
                {orcamentosSolicitados.length === 0 && (
                  <tr className="empty-table-message">
                    <td colSpan={10}>
                      <div style={{ width: "100%" }}>
                        <p>Nenhum orçamento encontrado.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <>
        <ModalButton />
      </>
      {/* A tabela abaixo mostra somente os orçamentos que já viraram prestação de serviço, ou seja, que estão com o estado atual igual a aceito */}
      <Accordion defaultActiveKey="1" className="mt-5">
        <Accordion.Item
          eventKey="1"
          style={{ textAlign: "center", marginBottom: "50px" }}
        >
          <Accordion.Header>Prestação de Serviços</Accordion.Header>
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
                  <th>Serviços e Estados</th>
                </tr>
              </thead>
              <tbody>
                {prestacaoServicos.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.data_entrada}</td>
                      <td>{item.descricao}</td>
                      <td>{item.preco}</td>
                      <td>{item.data_entrega}</td>
                      <td>{item.estadoAtual.estado}</td>
                      <td
                        onClick={() => handleShowModalServicosEstados(item.id)}
                        className=""
                      >
                        <Button variant="outline-info">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-search"
                            viewBox="0 0 16 16"
                          >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                          </svg>
                        </Button>{" "}
                      </td>
                    </tr>
                    {/* Renderiza o modal apenas para o orçamento selecionado */}
                    {selectedItemId === item.id && ( // Adicionado modalShow na condição
                      <MyVerticallyCenteredModal
                        show={showModalServicosEstados}
                        onHide={handleHideModal}
                        itemId={orcamentos.find(
                          (orcamento) => orcamento.id === selectedItemId
                        )}
                      />
                    )}
                  </React.Fragment>
                ))}

                {/* Renderiza a mensagem "Nenhum orçamento encontrado" se não houver orçamentos */}
                {prestacaoServicos.length === 0 && (
                  <tr className="empty-table-message">
                    <td colSpan={10}>
                      <div style={{ width: "100%" }}>
                        <p>Nenhum orçamento encontrado.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <ModalAceitarRecusar
        show={showModalAceitarRecusar}
        onHide={handleHideModal}
        orcamento={orcamentos.find(
          (orcamento) => orcamento.id === selectedItemId
        )}
      />
    </Container>
  );
}

export default BasicExample;
