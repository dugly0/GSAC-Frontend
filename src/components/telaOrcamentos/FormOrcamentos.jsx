import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function GridComplexExample() {
  const [formData, setFormData] = useState({
    quantidade: '',
    data_entrega: '',
    descricao: '',
    servico: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/orcamento', formData)
        .then(response => {
            console.log(response.data);
            // lidando com a resposta
        })
        .catch(error => {
            alert('There was an error!', error);
        });
};

  return (
    <Form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
      <h5 style={{ color: "white" }}>Formulário</h5>

      {/* <Form.Group className="mb-3" controlId="quantidade">
        <Form.Control type="text" placeholder="Quantidade de Serviço" value={formData.quantidade} onChange={handleChange} />
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="data_entrega">
        <Form.Control type="text" placeholder="Data de entrega" value={formData.data_entrega} onChange={handleChange} />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="descricao">
          <Form.Label>Descreva sua solicitação</Form.Label>
          <Form.Control as="textarea" placeholder="" rows="5" value={formData.descricao} onChange={handleChange} />
        </Form.Group>
        <Form.Group as={Col} controlId="servico">
          <Form.Label>Serviço</Form.Label>
          <Form.Select defaultValue="Selecionar Serviço" value={formData.servico} onChange={handleChange}>
            <option>Selecionar Serviço</option>
            <option>Serviço 1</option>
            <option>Serviço 2</option>
            <option>Serviço 3</option>
            <option>Serviço 4</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
}

export default GridComplexExample;
