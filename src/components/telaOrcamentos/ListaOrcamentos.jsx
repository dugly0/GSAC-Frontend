import React, { useState, useEffect } from 'react';
import { Container ,} from 'react-bootstrap';
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
                        <th>#</th>
                        <th>Nome do Usuário</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Data de entrada</th>
                        <th>Data de entrega</th>
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
                    <td onClick={() => handleShowModal(item.id)}>Status</td>  
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
        <Accordion>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Serviços</Accordion.Header>
            <Accordion.Body>
            <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Username</th>
                        <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>#</td>
                        <td>#</td>
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
                        <td>#</td>
                        <td>#</td>
                        </tr>
                        <tr>
                        <td>#</td>
                        <td>#</td>
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