import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint = "http://localhost:8080/api/orcamento/orcamento-por-utilizador-id";
const token = localStorage.getItem('token');  
const roleID = localStorage.getItem('role_id');
console.log(roleID);

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
  const history = useNavigate();

  useEffect(() => {
    // Verifica o roleID e redireciona se necessário
    if (roleID !== '1') {
      setTimeout(() => {
        alert('Você não tem permissão para acessar esta página.');        
      },1000)
      setTimeout(() => {
      history('/');        
      },2000)
      return;
    }

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
  }, [history]); // O array com history assegura que o efeito seja executado ao montar o componente e quando o objeto history mudar

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
                  <th>Serviço</th>
                  <th>Estado</th>
                  <th>Data</th>
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
                    <td>{item.servicos.nome}</td>
                    <td>{item.estadoOrcamentos.estado_id}</td>
                    <td>{item.estadoOrcamentos.data}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>  
      </Accordion>      
    </Container>
  );
}

export default BasicExample;
