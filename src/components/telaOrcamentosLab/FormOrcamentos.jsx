import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function GridComplexExample() {
  return (
    <Form style={{ textAlign: "center" }}>
      <h5 style={{ color: "white" }}>Formulário</h5>

      <Form.Group  className="mb-3" controlId="formGridNome">
        <Form.Control type="text" placeholder="Nome" />
      </Form.Group>

      <Form.Group  className="mb-3" controlId="formGridApelido">
        <Form.Control type="text" placeholder="Apelido" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Control type='text' placeholder="Rua ou Avenida/N/Distrito" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridAddress2">
        <Form.Control type="number" placeholder="Cod. Postal" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Control type= "number" placeholder="NIF" />
        </Form.Group>       
        
      </Row>
      
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridApelido">
          <Form.Label>Descreva sua solicitação</Form.Label>
          <Form.Text as="textarea" placeholder=""  rows="5"/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Serviço</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Selecionar Serviço</option>
            <option>...</option>
            <option>...</option>
            <option>...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>        
      </Row>
      
    </Form>
  );
}

export default GridComplexExample;