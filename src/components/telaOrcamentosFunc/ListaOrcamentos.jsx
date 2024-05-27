import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const endpoint = "http://localhost:8080/api/orcamento/orcamento-por-utilizador-id";
const token = "LnkeNnnbkd3N5WZiYOR_9RE8k33nK1RX";

const getOrcamentos = async () => {
  try {
    const result = await axios.get(endpoint, {
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

function BasicExample() {
  const [orcamentos, setOrcamentos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOrcamentos();
        setOrcamentos(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch orcamentos. Please check your credentials.');
        setOrcamentos([]);
      }
    };

    fetchData();
  }, []); // O array vazio assegura que o efeito seja executado apenas uma vez, ao montar o componente

  return (
    <Container>    
      <Accordion defaultActiveKey="0" className='mt-5'>
        <Accordion.Item eventKey="0" style={{ textAlign: "center", marginBottom: "50px" }}>
          <Accordion.Header>Orçamentos Solicitados</Accordion.Header>
          <Accordion.Body style={{ textAlign: "center" }}>
            <Table striped bordered hover>
              {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Data de entrada</th>
                  <th>Descrição</th>
                  <th>Preço</th>
                  <th>Data de entrega</th>
                  <th>Fatura</th>
                  <th>Utilizador</th>
                  <th>Laboratório</th>
                </tr>
              </thead>
              <tbody>
                {orcamentos.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.data_entrada}</td>
                    <td>{item.descricao}</td>
                    <td>{item.preco}</td>
                    <td>{item.data_entrega}</td>
                    <td>{item.fatura}</td>
                    <td>{item.utilizador_id}</td>
                    <td>{item.laboratorio_id}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item className="accordion-item2" style={{ marginBottom: "5%" }} eventKey="1">
          <Accordion.Header>Análises</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Data Vencimento</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Operações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#</td>
                  <td>#</td>
                  <td>#</td>
                  <td>#</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>#</td>
                  <td>#</td>
                  <td>#</td>
                </tr>
                <tr>
                  <td>#</td>
                  <td>#</td>
                  <td>#</td>
                  <td>#</td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default BasicExample;
