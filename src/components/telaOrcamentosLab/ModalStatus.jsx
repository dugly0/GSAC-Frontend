import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const endpoint =
  "http://localhost:8080/api/orcamento/orcamento-por-laboratorio";

function MyVerticallyCenteredModal(props) {
  const { servicos, estadoOrcamentos } = props.itemId || {};

  const renderServicos = () => (    
    <Table>
      <thead>
        <tr>
          <th>Nome:</th>
          <th>Descrição:</th>
          <th>Preço Unitário:</th>
          <th>Preço de Venda:</th>
          <th>Quantidade:</th>
        </tr>
      </thead>
      <tbody>
        {servicos.map((servico)=> (
          <tr key={servico.id}>
            <td>{servico.nome}</td>
            <td>{servico.descricao}</td>
            <td>{servico.preco_unitario_custo}</td>
            <td>{servico.preco_unitario_venda}</td>
            <td>{servico.quantidade}</td>
          </tr>
        ))}
        </tbody>       
  </Table>
  );

  const renderEstados = () => (
    <Table>
      <thead>
        <tr>
          <th>Estado:</th>
          <th>Data:</th>
        </tr>
      </thead>
      <tbody>
        {estadoOrcamentos.map((estado) => (
          <tr key={estado.id}>
            <td>{estado.estado}</td>
            <td>{estado.data}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Serviços e Estados
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div>
          <h1>Lista de Serviços</h1>
          {servicos && servicos.length > 0 ? (
            <ul>{renderServicos()}</ul>
          ) : (
            <p>Nenhum serviço disponível</p>
          )}
          <h1>Estados dos Orçamentos</h1>
          {estadoOrcamentos && estadoOrcamentos.length > 0 && renderEstados()}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;
