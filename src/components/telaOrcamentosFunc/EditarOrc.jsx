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
  const { show, onHide, orcamento, onEdit, estados, servicos, laboratorios } = props; 
  const [orcamentoAtualizado, setOrcamentoAtualizado] = useState({
    descricao: "",
    preco: null,
    data_entrega: "",
    fatura: null,
    laboratorio_id: null,
    estadoOrcamentos: [],
    servicoOrcamentos: []
  });

  useEffect(() => {
    if (orcamento) {
      setOrcamentoAtualizado({
        descricao: orcamento.descricao || "",
        preco: orcamento.preco || null,
        data_entrega: orcamento.data_entrega || "",
        fatura: orcamento.fatura || null,
        laboratorio_id: orcamento.laboratorio_id || null,
        estadoOrcamentos: orcamento.estadoOrcamentos || [],
        servicoOrcamentos: orcamento.servicoOrcamentos || []
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
      const newServicoOrcamentos = prevOrcamentoAtualizado.servicoOrcamentos.map(servicoOrc => {
        if (servicoOrc.servico_id === id) {
          return { ...servicoOrc, [field]: value };
        }
        return servicoOrc;
      });

      // Add new service if not already in the list
      if (!newServicoOrcamentos.find(servicoOrc => servicoOrc.servico_id === id)) {
        newServicoOrcamentos.push({ servico_id: id, quantidade: field === 'quantidade' ? value : null });
      }

      return {
        ...prevOrcamentoAtualizado,
        servicoOrcamentos: newServicoOrcamentos
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(orcamentoAtualizado);
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
              type="currency"
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
            <h6>Laboratório:</h6>
            <Form.Control
              as="select"
              name="laboratorio_id"
              value={orcamentoAtualizado.laboratorio_id}
              onChange={handleChange}
            >
              <option value="">{orcamento.laboratorio_id ? getNome(orcamento.laboratorio_id, 1) : 'Selecione um laboratório'}</option>
              {laboratorios.map(laboratorio => (
                <option key={laboratorio.id} value={laboratorio.id}>
                  {laboratorio.nome}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="servico">
            <h6>Serviços:</h6>       
            {servicos.map(servico => (
              <div key={servico.id}>
                <input 
                  type="checkbox" 
                  id={`servico-${servico.id}`} 
                  value={servico.id} 
                  checked={getNome(servico.id, 2) || false}                    
                  onChange={(e) => handleServicoChange(servico.id, 'servico_id', e.target.checked ? servico.id : null)}
                />
                <label htmlFor={`servico-${servico.id}`}>{servico.nome}</label>
                <Form.Control
                  type="number"
                  value={getNome(servico.id, 3) || ''}
                  onChange={(e) => handleServicoChange(servico.id, 'quantidade', e.target.value)}
                />
              </div>              
            ))}
          </Form.Group>
          <Form.Group controlId="estado">
            <h6>Estado:</h6>
            <Form.Control
              as="select"
              name="estadoOrcamentos"
              value={orcamentoAtualizado.estadoOrcamentos.length > 0 ? orcamentoAtualizado.estadoOrcamentos[0].estado_id : ''}
              onChange={handleChange}
            >
              <option value="">{orcamento.estadoOrcamentos && orcamento.estadoOrcamentos.length > 0 ? getNome(orcamento.estadoOrcamentos[0].estado_id, 4) : 'Selecione um estado'}</option>
              {estados.map(estado => (
                <option key={estado.id} value={estado.id}>
                  {estado.estado}
                </option>
              ))}
            </Form.Control>
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
