import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <p>Item ID: {props.itemId}</p> {/* Exibe o item.id */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

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
                  <th >Status</th>
                </tr>
              </thead>
              <tbody>
                {orcamentos.map((item, index) => (
                  <tr key={index} >
                    <td >{item.id}</td>
                    <td>{item.data_entrada}</td>
                    <td>{item.descricao}</td>
                    <td>{item.preco}</td>
                    <td>{item.data_entrega}</td>
                    <td>{item.fatura}</td>
                    <td>{item.utilizador_id}</td>
                    <td>{item.laboratorio_id}</td>                    
                    <td onClick={() => handleShowModal(item.id)}>Status</td>  
                    <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false) }  itemId={selectedItemId}/>
                                     
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
