import { Container } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import ModalButton from './ModalButton';


function BasicExample() {
    
  return (
    <Container>
        <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" style={{textAlign: "right"}}>
            <Accordion.Header >Orçamentos</Accordion.Header>
            <Accordion.Body style={{textAlign: "center"}}>
                <Table striped bordered hover>
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
        <ModalButton />
        </Accordion.Item>
        <Accordion.Item eventKey="1">
            <Accordion.Header>Faturas</Accordion.Header>
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