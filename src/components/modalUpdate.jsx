import { useState, useEffect } from "react";
import axios from "axios";
import { Collapse, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormUpdate from "./formUpdate"; // Certifique-se de que o caminho está correto
import User from "./User.jsx";

export default function ModalUpdate({ isShow, handleClose }) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        setUsers(response.data);
        setHasError(false);
      } catch (error) {
        console.error(error);
        setHasError(true);
      }
    };

    if (isShow) {
      fetchUsers();
    }
  }, [isShow]);

  const handleCollapseToggle = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  return (
    <Modal show={isShow} onHide={handleClose} scrollable>
      <Modal.Header>
        <Modal.Title>
          <img className="img1" src="../../src/assets/logo-ipb.png" />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hasError ? (
          <Alert variant="danger">Erro ao carregar utilizadores.</Alert>
        ) : (
          <>
            {users.map((user) => (
              <div key={user.id}>
                <User
                  id={user.id}
                  utilizador={user.utilizador}
                  username={user.username}
                  isExpanded={selectedUserId === user.id}
                  handleCollapseToggle={handleCollapseToggle}
                />
                <Collapse in={selectedUserId === user.id}>
                  <div id={`collapseExample${user.id}`}>
                    <div className="card card-body">
                      <FormUpdate user={user} />
                    </div>
                  </div>
                </Collapse>
              </div>
            ))}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleClose}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}
