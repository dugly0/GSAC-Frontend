import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function EditOrcamentoModal(props) {
  const { show, onHide, orcamento, onEdit } = props;
  const [servicos, setServicos] = useState(orcamento.servicos || []);
  const [dataEntrega, setDataEntrega] = useState(orcamento.data_entrega);

  const handleServicoChange = (index, field, value) => {
    const updatedServicos = [...servicos];
    updatedServicos[index][field] = value;
    setServicos(updatedServicos);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit({ ...orcamento, servicos, data_entrega: dataEntrega });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Orçamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="dataEntrega">
            <h2>Data de entrega:</h2>
            <Form.Control
              type="date"
              value={dataEntrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />
          </Form.Group>

          <h2>Serviços:</h2>
          {servicos.map((servico, index) => (
            <div key={servico.id}>
              <Form.Group controlId={`servico-${servico.id}`}>
                <Form.Label>{servico.nome}</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Quantidade"
                  value={servico.quantidade}
                  onChange={(e) =>
                    handleServicoChange(index, "quantidade", e.target.value)
                  }
                />
              </Form.Group>
            </div>
          ))}

          <Button variant="primary" type="submit">
            Salvar Alterações
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditOrcamentoModal;
