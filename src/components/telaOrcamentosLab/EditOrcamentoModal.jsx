import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function EditOrcamentoModal(props) {
  const { show, onHide, orcamento, onEdit } = props;
  const [servicos, setServicos] = useState([]);
  const [selectedServicos, setSelectedServicos] = useState([]);
  const [dataEntrega, setDataEntrega] = useState("");
  const [estado, setEstado] = useState("");
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    if (show && orcamento) {
      setDataEntrega(orcamento.data_entrega || "");
      setEstado(orcamento.estado_orcamento.id || "");

      const fetchEstadosEServicos = async () => {
        try {
          const [estadosRes, servicosRes] = await Promise.all([
            axios.get("http://localhost:8080/api/estado", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
            axios.get("http://localhost:8080/api/servico", {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }),
          ]);

          setEstados(estadosRes.data);
          setServicos(servicosRes.data);

          // Pré-carregar os serviços selecionados com as quantidades do orçamento
          const servicosSelecionados = orcamento.servicos.map((item) => ({
            servico_id: item.id,
            quantidade: item.quantidade,
          }));
          setSelectedServicos(servicosSelecionados);
        } catch (error) {
          console.error("Failed to fetch estados and servicos:", error);
        }
      };

      fetchEstadosEServicos();
    }
  }, [show, orcamento]);

  const handleServicoChange = (index, field, value) => {
    const updatedServicos = [...selectedServicos];
    updatedServicos[index][field] = value;
    setSelectedServicos(updatedServicos);
  };

  const handleAddServico = () => {
    setSelectedServicos([
      ...selectedServicos,
      { servico_id: "", quantidade: 1 },
    ]);
  };

  const handleRemoveServico = (index) => {
    const updatedServicos = selectedServicos.filter((_, i) => i !== index);
    setSelectedServicos(updatedServicos);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedOrcamento = {
      data_entrega: dataEntrega,
      estadoOrcamentos: estado,
      servico_orcamento: selectedServicos.map((item) => ({
        servico_id: item.servico_id,
        quantidade: item.quantidade,
      })),
    };

    try {
      await axios.put(
        `http://localhost:8080/api/orcamento/${orcamento.id}`,
        updatedOrcamento,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onEdit(updatedOrcamento);
      onHide();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update orcamento:", error);
    }
  };
  const estadosFiltrados = estados.filter((estado) => {
    return estado.estado !== "Aceito" && estado.estado !== "Recusado";
  });

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Orçamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="dataEntrega">
            <Form.Label>Data de entrega:</Form.Label>
            <Form.Control
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="estado">
            <Form.Label>Estado:</Form.Label>
            <Form.Control
              as="select"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              {estadosFiltrados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.estado}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Label>Serviços:</Form.Label>
          {selectedServicos.map((servico, index) => (
            <div key={index} className="mb-3">
              <Form.Group controlId={`servico-${index}`}>
                {/* Modificação para posicionar o botão X */}
                <div className="d-flex align-items-center">
                  <Form.Label>Serviço</Form.Label>
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => handleRemoveServico(index)}
                    style={{
                      marginLeft: "auto",
                      cursor: "pointer",
                      color: "rgb(255, 0, 0)",
                    }}
                  />
                </div>

                <Form.Control
                  as="select"
                  value={servico.servico_id}
                  onChange={(e) =>
                    handleServicoChange(index, "servico_id", e.target.value)
                  }
                >
                  <option value="">Selecione um serviço</option>
                  {servicos.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nome}
                    </option>
                  ))}
                </Form.Control>

                <Form.Label>Quantidade</Form.Label>
                <Form.Control
                  type="number"
                  value={servico.quantidade}
                  onChange={(e) =>
                    handleServicoChange(index, "quantidade", e.target.value)
                  }
                />
              </Form.Group>
            </div>
          ))}

          <Button
            variant="outline-light"
            onClick={handleAddServico}
            style={{ backgroundColor: "#820053" }}
          >
            Adicionar Serviço
          </Button>
          <div className="d-flex justify-content-end mt-3">
            <Button
              variant="outline-light"
              type="submit"
              className="mt-3"
              style={{ backgroundColor: "#820053" }}
            >
              Salvar Alterações
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditOrcamentoModal;
