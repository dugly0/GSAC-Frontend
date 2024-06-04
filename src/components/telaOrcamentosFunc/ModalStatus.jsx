import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';


const endpoint = "http://localhost:8080/api/orcamento/find-estado-by-id-orcamento?idOrcamento=";


function MyVerticallyCenteredModal(props) {
  const { servicos, estadoOrcamentos  } = props.itemId || {};
  const renderServicos = () => {
    const elementos = [];
    if (servicos) {
      servicos.forEach((servico) => {
        elementos.push(
          <li key={servico.id}>
            <strong>Nome:</strong> {servico.nome}<br />
            <strong>Descrição:</strong> {servico.descricao}<br />
            <strong>Preço Unitário Custo:</strong> {servico.preco_unitario_custo}<br />
            <strong>Preço Unitário Venda:</strong> {servico.preco_unitario_venda}<br />
            <strong>Quantidade:</strong> {servico.quantidade}
          </li>
        );
      });
    }
    return elementos;
  };
  const renderEstados = () => {
    const elementos = [];
    if (estadoOrcamentos) {
      estadoOrcamentos.forEach((estado) => {
        elementos.push(
          <Table>
            <thead>
              <tr>
                <th>Estado:</th>
                <th>Data:</th>
              </tr>
            </thead>
            <tbody>
              <tr key={estado.id}>
                <td>{estado.estado_id == 1 ? "Aceito" : "Recusado"}</td>
                <td>{estado.data}</td>
              </tr>
            </tbody>
          </Table>
          // <li key={estado.id}>
          //   <strong>Estado:</strong> {estado.estado_id == 1 ? "Aceito" : "Recusado"} <br />
          //   <strong>Data:</strong> {estado.data}
          // </li>
        );
      });
    }
    return elementos; //mostrar o ultimo estado
  };
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
        <ul>
          {renderServicos()}
        </ul>
      ) : (
        <p>Nenhum serviço disponível</p>
      )}
      <h1>Estados dos Orçamentos</h1>
      {estadoOrcamentos && estadoOrcamentos.length > 0 ? (
        <ul>
          {renderEstados()}
        </ul>
      ) : (
        <p>Nenhum estado disponível</p>
      )}
    </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal;