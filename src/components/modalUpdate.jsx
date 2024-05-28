import { Collapse, Alert } from "react-bootstrap"; // Added Alert for errors
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import User from "./User";
import FormUpdate from "./formUpdate";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ModalUpdate({ isShow, handleClose }) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user");
        setUsers(response.data);
        setHasError(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setHasError(true);
      }
    };

    if (isShow) {  // Fetch when modal is shown
      fetchUsers();
    }
  }, [isShow]);

  const handleCollapseToggle = () => {
    setOpen(!open);
  };

  return (
    <Modal show={isShow} onHide={handleClose} scrollable>
      <Modal.Header>
        <Modal.Title>
          <img className="img1" src="../../src/assets/logo-ipb.png"></img>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {hasError ? (
          <Alert variant="danger">Error fetching users. Please try again.</Alert>
        ) : (
          <>
            {users.map((user) => (
              <div className="p-1 border"><User 
                key={user.id}
                handleCollapseToggle={handleCollapseToggle}
                username={user.utilizador?.nome || user.username} // Use nome if available
                {...user} // Pass all user data for future use
              /></div>
            ))}
            <Collapse in={open}>
              <div id="example-collapse-text">
                <FormUpdate />
              </div>
            </Collapse>
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