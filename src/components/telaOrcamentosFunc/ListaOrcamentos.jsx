import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import ModalButton from './ModalButton';
import './ListaOrcamentos.css';


function BasicExample() {
    
  return (
    <Container>
        <Accordion defaultActiveKey="">
        <Accordion.Item  eventKey="0" style={{textAlign: "center", marginBottom: "50px",}}>
            <Accordion.Header >Orçamentos Solicitados</Accordion.Header>
            <Accordion.Body style={{textAlign: "center"}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Data</th>
                        <th>Centro de custo</th>
                        <th>Nome técnico</th>
                        <th>Nome laboratório</th>
                        <th>Nome e morada cliente</th>
                        
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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
                        </tr>
                        <tr>
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
        <Accordion.Item className="accordion-item2" style={{ marginBottom: "5%"  }} eventKey="1">
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