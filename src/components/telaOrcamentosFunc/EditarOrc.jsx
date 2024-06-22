import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';

const getToken = () => {    
  const token = localStorage.getItem('token');  
  return token;
} 

function EditarOrc(props) {
  const { show, onHide, orcamento, onEdit, laboratorios } = props; 
  const [orcamentoAtualizado, setOrcamentoAtualizado] = useState({
    descricao: "",
    preco: null,
    data_entrega: "",
    fatura: null,
    laboratorio_id: null
  });

  useEffect(() => {
    if (orcamento) {
      setOrcamentoAtualizado({
        descricao: orcamento.descricao || "",
        preco: orcamento.preco || null,
        data_entrega: orcamento.data_entrega || "",
        fatura: orcamento.fatura || null,
        laboratorio_id: orcamento.laboratorio_id || null
      });
    }
  }, [orcamento]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrcamentoAtualizado((prevOrcamentoAtualizado) => ({
      ...prevOrcamentoAtualizado,
      [name]: value
    }));
  };

  const handleServicoChange = (id, field, value) => {
    setOrcamentoAtualizado((prevOrcamentoAtualizado) => {     

      return {
        ...prevOrcamentoAtualizado,
        servicoOrcamentos: newServicoOrcamentos
      };
    });
  };

  const handleSubmit = (e) => {
    const token = getToken();
    const dataToSend = { ...orcamentoAtualizado };

    axios.put(`http://localhost:8080/api/orcamento/${orcamento.id}`, dataToSend, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        onEdit(response.data);
        onHide();
      })
    // e.preventDefault();
    // onHide();
    // console.log(orcamentoAtualizado);
    // Aqui você pode adicionar a lógica para enviar os dados atualizados
  };

  const getNome = (id, valor) => {
    if (valor === 1) {
      const item = laboratorios.find(laboratorio => laboratorio.id === id);
      return item ? item.nome : ''
    }
    if (valor === 2) {
      if (orcamento && orcamento.servicoOrcamentos) {
        const item = orcamento.servicoOrcamentos.find(servico => servico.servico_id === id);
        return item ? true : null;
      }
      return null;
    }
    if (valor === 3) {
      if (orcamento && orcamento.servicoOrcamentos) {
        const item = orcamento.servicoOrcamentos.find(servico => servico.servico_id === id);
        return item ? item.quantidade : '';
      }
      return '';
    }
    if (valor === 4) {
      const item = estados.find(estado => estado.id === id);
      return item ? item.estado : '';
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Orçamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="descricao">
            <h6>Descrição:</h6>
            <Form.Control
              type="text"
              name="descricao"
              value={orcamentoAtualizado.descricao}
              onChange={handleChange}
            />
          </Form.Group> 
          <Form.Group controlId="preco">
            <h6>Preço:</h6>
            <Form.Control
              type="number"
              name="preco"
              value={orcamentoAtualizado.preco}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="data_entrega">
            <h6>Data de entrega:</h6>
            <Form.Control
              type="date"
              name="data_entrega"
              value={orcamentoAtualizado.data_entrega}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="laboratorio">
            <Form.Label>Laboratório</Form.Label>
            <Form.Select
              as="select"
              name="laboratorio_id"
              value={orcamentoAtualizado.laboratorio_id}
              onChange={handleChange}
            >
              <option value="">Selecione um laboratório</option>
              {laboratorios.map(laboratorio => (
                <option key={laboratorio.id} value={laboratorio.id}>
                  {laboratorio.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>           
          <Button variant="primary" type="submit">
            Salvar Alterações
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditarOrc;
