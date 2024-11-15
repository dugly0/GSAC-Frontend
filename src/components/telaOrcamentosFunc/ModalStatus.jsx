import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useState } from "react";
import { faPencil, faTimes } from "@fortawesome/free-solid-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import Form from "react-bootstrap/Form";

function MyVerticallyCenteredModal(props) {
  const { servicoOrcamentos, estadoOrcamentos } = props.orcamento || {};
  const [estados, setEstados] = useState([]);
  const [estadoId, setEstadoId] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false); 
  const [show, setShow] = useState(false);

  const handleChangeEstado = (event) => {
    setEstadoId(event.target.value); // Atualiza o estadoId com o valor selecionado
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getEstados();
  };

  const getToken = () => {
    const token = localStorage.getItem('token');  
    return token;
  };

  const deleteServico = async (id) => {
    try {
      const token = getToken();
      const result = await axios.delete('http://localhost:8080/api/orcamento/delete-servico-orcamento', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        data: { id }
      });
      console.log("Serviço excluído:", result.data);
      return result.data;
    } catch (error) {
      console.error("Failed to delete service:", error);
      throw error;
    }
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true); // Mostra o botão de confirmação de exclusão
  };

  const handleConfirmDelete = async (servico) => {
    await deleteServico(servico.id);
    setConfirmDelete(false); // Esconde o botão de confirmação após a exclusão
    props.onHide();
    window.location.reload(); // Recarrega a página
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false); // Cancela a exclusão e esconde o botão de confirmação
  };

  const renderServicos = () => (
    <Table>
      <thead>
        <tr>
          <th>Nome:</th>
          <th>Descrição:</th>
          <th>Preço Unitário:</th>
          <th>Preço de Venda:</th>
          <th>Quantidade:</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {servicoOrcamentos.map((servico) => (
          <tr key={servico.id}>
            <td>{servico.nome}</td>
            <td>{servico.descricao}</td>
            <td>{servico.preco_unitario_custo}</td>
            <td>{servico.preco_unitario_venda}</td>
            <td>{servico.quantidade}</td>
            <td>
              {!confirmDelete ? (
                <a href="#deleteConfirm" onClick={handleDeleteClick}>
                  <FontAwesomeIcon icon={faTimes} />
                </a>
              ) : (
                <div>
                  <span>Confirmar exclusão?</span>
                  <button className="btn btn-sm btn-danger ms-2" onClick={() => handleConfirmDelete(servico)}>Confirmar</button>
                  <button className="btn btn-sm btn-secondary ms-2" onClick={handleCancelDelete}>Cancelar</button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const getEstados = async () => {
    try {
      const token = getToken();
      const result = await axios.get("http://localhost:8080/api/estado", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setEstados(result.data);
    } catch (error) {
      console.error("Failed to get estados:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      const token = getToken();
      const result = await axios.put("http://localhost:8080/api/orcamento/update-estado", {
        orcamentoId: props.orcamento.id,
        estadoOrcamentos: estadoId
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log("Token:", token, "Estado ID:", estadoId);
      setShow(false); // Feche o modal após salvar
      window.location.reload(); // Recarrega a página após salvar
      return result.data;
    } catch (error) {
      console.error("Failed to update estado:", error);
      console.log("Token:", token, "Estado ID:", estadoId);
      throw error;
    }
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
    <>
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Serviços e Estados
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h1>Lista de Serviços</h1>
            {servicoOrcamentos && servicoOrcamentos.length > 0 ? (
              <ul>{renderServicos()}</ul>
            ) : (
              <p>Nenhum serviço disponível</p>
            )}
            <h1>Estados dos Orçamentos</h1>
            {estadoOrcamentos && estadoOrcamentos.length > 0 && renderEstados()}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Fechar</Button>
          <Button variant="primary" onClick={handleShow}>
            Alterar Estado
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Alterar Estado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="Estado">
            <Form.Label>Estado</Form.Label>
            <Form.Select onChange={handleChangeEstado} value={estadoId}>
              <option value="">Selecione um estado</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.estado}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MyVerticallyCenteredModal;
