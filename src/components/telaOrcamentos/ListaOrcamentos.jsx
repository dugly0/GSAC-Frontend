import React, { useState, useEffect } from 'react';
import { Container ,Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import ModalButton from './ModalButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyVerticallyCenteredModal from './ModalStatus';


const endpoint = "http://localhost:8080/api/orcamento/orcamento-por-utilizador-id";
const getToken = () => {
  const roleID = localStorage.getItem('role_id');
  if(roleID != 2) {
    alert('Você não tem permissão para acessar esta página.');  
    return;
  }
  const token = localStorage.getItem('token');  
  return token;
}
const getOrcamentos = async () => {
  try {    
    const token = getToken();
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
    const [modalShow, setModalShow] = React.useState(false);
    const [selectedItemId, setSelectedItemId] = React.useState(null);
    const history = useNavigate();
  
    const handleShowModal = (itemId) => {
      setSelectedItemId(itemId);
      setModalShow(true);
    };
    useEffect(() => {   
      const fetchData = async () => {      
        try {
          const data = await getOrcamentos();        
          setOrcamentos(data);
          setError(null);
          
        } catch (err) {
          // setError('Failed to fetch orcamentos. Please check your credentials.');
          //setOrcamentos([]);
          //history('/'); 
          return;
        }
      };
      fetchData();
    }, [history]); // O array com history assegura que o efeito seja executado ao montar o componente e quando o objeto history mudar
  

    
  return (
    <Container>
        <Accordion defaultActiveKey="0" className='mt-5'>
        <Accordion.Item eventKey="0" style={{textAlign: "right"}}>
            <Accordion.Header >Orçamentos</Accordion.Header>
            <Accordion.Body style={{textAlign: "center"}}>
                <Table striped bordered hover>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <thead>
                        <tr>
                        <th>Data de entrada</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Data de entrega</th>
                        <th>Fatura</th>
                        <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orcamentos.map((item, index) => (
                  <tr key={index} >
                    <td >{item.data_entrada}</td>
                    <td>{item.descricao}</td>
                    <td>{item.preco}</td>
                    <td>{item.data_entrega}</td>
                    <td>
                     <Button variant="outline-info">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"/>
                    </svg>
                      </Button>{' '}
                      </td>
                      <td onClick={() => handleShowModal(item)}className='' >
                      <Button variant="outline-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                      </svg>
                      </Button>{' '}
                      </td>   
                  </tr>
                ))}                
                    </tbody>
            </Table>
        </Accordion.Body>
        </Accordion.Item>
        <Accordion/>
        </Accordion>
        <Accordion defaultActiveKey="0" className='mt-5'>
        <Accordion.Item eventKey="0" style={{textAlign: "right"}}>
            <Accordion.Header >Orçamentos</Accordion.Header>
            <Accordion.Body style={{textAlign: "center"}}>
                <Table striped bordered hover>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                    <thead>
                        <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orcamentos.map((item, index) => (
                  <tr key={index} >
                    <td >{item.data_entrada}</td>
                    <td>{item.descricao}</td>
                    <td onClick={() => handleShowModal(item)}className='' >
                      <Button variant="outline-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                      </svg>
                      </Button>{' '}
                      </td>  
                    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false) }  itemId={selectedItemId}/>                                     
                     
                                     
                  </tr>
                ))}                
                    </tbody>
            </Table>
        </Accordion.Body>
        </Accordion.Item>
        <Accordion/>
        </Accordion>
        <ModalButton />
    </Container>
  );
}

export default BasicExample;