import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from 'axios';


function EditarOrc(props) {
  const { show, onHide, orcamento, onEdit } = props; 
  const[servicos, setServicos] = useState([]);
  const[laboratorios, setLaboratorios] = useState([]);
  const[laboratorio, setNomeLab] = useState([]);
  const[estados, setEstados] = useState([]);


  const getToken = () => {    
    const token = localStorage.getItem('token');  
    return token;
  }
  const getListOfLabs = async () => {
    try {    
      const token = getToken();
      const result = await axios.get("http://localhost:8080/api/laboratorio", {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return result.data;
    } catch (error) {
      console.error("Failed to get token:", error);
      throw error;
    }
  };
  const getListOfServices = async () => {
    try {    
      const token = getToken();
      const result = await axios.get("http://localhost:8080/api/servico", {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return result.data;
    } catch (error) {
      console.error("Failed to get token:", error);
      throw error;
    }
  };
  const getListOfState = async () => {
    try {    
      const token = getToken();
      const result = await axios.get("http://localhost:8080/api/estado", {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return result.data;
    } catch (error) {
      console.error("Failed to get token:", error);
      throw error;
    }
  };
  const getServicosUsados =  (id) => {
    const servico = orcamento.servicoOrcamentos
    const servicosUsados  = getServicosUsados().map(servico => servico.servico_id);
    return id in servicosUsados ? true : false
  }
  const getQuantidadeById = (servicoId) => {
    const servicoOrcamento = orcamento.servicoOrcamentos.find(servico => servico.servico_id === servicoId);
    return servicoOrcamento ? servicoOrcamento.quantidade : '';
  };
  useEffect(() => {   
    const fetchData = async () => {      
      try {
        const labs = await getListOfLabs();        
        setLaboratorios(labs);
        const servs = await getListOfServices();
        setServicos(servs);
        const states = await getListOfState();
        setEstados(states);

        const nameLab = labs.find(lab => lab.id === orcamento.laboratorio_id);
        setNomeLab(nameLab.nome); 
      } catch (err) {
        
        return;
      }
    };
    fetchData();
  }, []); 

  

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
          <Form.Control
            as={"select"}
            onChange={(e) => setDataEntrega(e.target.value)}
          >
          <option key={orcamento.laboratorio_id} value={orcamento.laboratorio_id}>{laboratorio}</option>
          {laboratorios.map((laboratorio) => (            
            <option key={laboratorio.id} value={laboratorio.id}>{laboratorio.nome}</option>
          ))}
          </Form.Control>
        </Form.Group> 

        <Form.Group controlId="servico">
        <h6>Serviços:</h6>       
        {servicos.map((servico) => (
          <div key={servico.id} className="form-check">            
            <input
              type="checkbox"
              className="form-check-input"
              id={`servico-${servico.id}`}
              // value={servico.quantidade}
              checked={orcamento.servicoOrcamentos.map(servico => servico.servico_id).includes(servico.id)}
                onChange={() => handleServicoChange(servico.id)}
            />
            <label className="form-check-label" htmlFor={`servico-${servico.id}`}>
              {servico.nome}
            </label>
            <input
            type="number"
            className="form-control"
            id={`quantidade-${servico.id}`}
            value={getQuantidadeById(servico.id)}
            onChange={(e) => handleQuantidadeChange(servico.id, e.target.value)}
          />
          </div>
        ))}
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
