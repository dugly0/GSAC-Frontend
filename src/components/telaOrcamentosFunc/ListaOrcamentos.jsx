import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MyVerticallyCenteredModal from './ModalStatus';
import EditarOrc from "./EditarOrc";

const endpoint = "http://localhost:8080/api/orcamento/orcamento-por-utilizador-id";
const getToken = () => {
  const roleID = localStorage.getItem('role_id');
  if(roleID != 1) {
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
  const [selectedItemId, setSelectedItemId] = useState([]);
  const history = useNavigate();
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [orcamentoEdit, setOrcamentoEdit] = useState(null);

  const handleEdit = (orcamento) => {
    setOrcamentoEdit(orcamento);
    setShowModalEdit(true);
  };
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
        // setOrcamentos([]);
        history('/'); 
        return;
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
                  <th >Serviços e Estados</th>
                  <th >Editar</th>
                </tr>
              </thead>
              <tbody>
                {orcamentos.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr key={index} >
                      <td >{item.id}</td>
                      <td>{item.data_entrada}</td>
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
                      <td>{item.utilizador_id}</td>
                      <td>{item.laboratorio_id}</td>
                      <td onClick={() => handleShowModal(item)}className='' >
                        <Button variant="outline-info">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                        </svg>
                        </Button>{' '}
                        </td>
                        <td onClick={() => handleEdit(item)}>
                        <Button variant="outline-info">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                      </svg>
                        </Button>{' '}
                        </td>
                    </tr>
                    {/* Renderiza o modal de edição apenas para o orçamento selecionado */}
                    {orcamentoEdit && orcamentoEdit.id === item.id && (
                      <EditarOrc
                        show={showModalEdit}
                        onHide={() => setShowModalEdit(false)}
                        orcamento={orcamentoEdit}
                        onEdit={(updatedOrcamento) => {
                          // Lógica para atualizar o orçamento na API e no estado local
                          // ...
                        }}
                      />
                    )}
                    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false) }  itemId={selectedItemId}/>

                  </React.Fragment>
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
