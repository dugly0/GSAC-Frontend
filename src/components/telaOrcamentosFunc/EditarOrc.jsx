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
  const getNome = (id, valor) => {
    if (valor == 1){
      const item = laboratorios.find(laboratorio => laboratorio.id === id);
      return item ? item.nome : ''
    }
    if (valor == 2){
      const item = orcamento.servicoOrcamentos.find(servico => servico.servico_id === id);
      return item ? true : null
    }
    if (valor == 3){
      const item = orcamento.servicoOrcamentos.find(servico => servico.servico_id === id);
      return item ? item.quantidade : false
    }
    if (valor == 4){
      const item = estados.find(estado => estado.id === id);
      return item ? item.estado : ''
    }
  }  
  const handleCheckboxChange = () =>{
    alert('teste');
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit({ ...orcamento,  data_entrega: dataEntrega });
    onHide();
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
                value={orcamento.descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
          </Form.Group> 
          <Form.Group controlId="preco">
            <h6>Preço:</h6>
            <Form.Control
              type="currency"
              value={orcamento.preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="dataEntrega">
            <h6>Data de entrega:</h6>
            <Form.Control
              type="date"
              value={orcamento.data_entrega}
              onChange={(e) => setDataEntrega(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="laboratorio">
            <h6>Laboratorio:</h6>
            <select id="laboratorio" >
            <option value={orcamento.laboratorio_id}>{getNome(orcamento.laboratorio_id, 1)}</option>
            {laboratorios.map(laboratorio => (              
                <option key={laboratorio.id} value={laboratorio.id}>
                    {laboratorio.nome}
                </option>
            ))}
            </select>
          </Form.Group> 
          <Form.Group controlId="servico">
            <h6>Serviços:</h6>       
            {
            servicos.map(servico => (
              <div key={servico.id}>
                <input 
                    type="checkbox" 
                    id={`servico-${servico.id}`} 
                    value={servico.id} 
                    checked={getNome(servico.id, 2)}
                />
                  <label htmlFor={`servico-${servico.id}`}>{servico.nome}</label>
                  <Form.Control
                    type="number"
                    value={getNome(servico.id, 3)}
                    onClick={(e) => setPreco(e.target.value)}
                  />
              </div>              
            ))
            }
          </Form.Group>
          <Form.Group controlId="laboratorio">
            <h6>Estado:</h6>
            <select id="laboratorio" >
            <option value={orcamento.estadoOrcamentos}>{getNome(orcamento.estadoOrcamentos[0]["estado_id"], 4)}</option>
            {estados.map(estado => (              
                <option key={estado.id} value={estado.id}>
                    {estado.estado}
                </option>
            ))}
            </select>
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
