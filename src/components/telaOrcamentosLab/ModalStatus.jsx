import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const endpoint =
  "http://localhost:8080/api/orcamento/orcamento-por-laboratorio";

function MyVerticallyCenteredModal(props) {
  const { servicos, estadoOrcamentos } = props.itemId || {};

  const renderServicos = () => {
    const elementos = [];
    if (servicos) {
      servicos.forEach((servico) => {
        elementos.push(
          <li key={servico.id}>
            <strong>Nome:</strong> {servico.nome}
            <br />
            <strong>Descrição:</strong> {servico.descricao}
            <br />
            <strong>Preço Unitário Custo:</strong>{" "}
            {servico.preco_unitario_custo}
            <br />
            <strong>Preço Unitário Venda:</strong>{" "}
            {servico.preco_unitario_venda}
            <br />
            <strong>Quantidade:</strong> {servico.quantidade}
          </li>
        );
      });
    }
    return elementos;
  };

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
