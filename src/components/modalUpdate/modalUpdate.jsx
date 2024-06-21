import React, { useState, useEffect } from "react";
import axios from "axios";
import { Collapse, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormUpdate from "../formUpdate.jsx";
import User from "../User.jsx";
import "./assets/css/modalUpdate.css";

export default function ModalUpdate({ isShow, handleClose }) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [search, setSearch] = useState('');
  const [userType, setUserType] = useState('');

  // Função para buscar dados dos usuários e laboratórios
  useEffect(() => {
    if (isShow) {
      const fetchUserData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            throw new Error("Token não encontrado");
          }

          const [userResponse, labResponse] = await Promise.all([
            axios.get('http://localhost:8080/api/user', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            }),
            axios.get('http://localhost:8080/api/laboratorio', {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              }
            })
          ]);

          setUsers(userResponse.data);
          setLabs(labResponse.data);
          setHasError(false);
        } catch (error) {
          console.error("Erro ao buscar dados:", error);
          setHasError(true);
        }
      };

      fetchUserData();
    }
  }, [isShow]);

  // Função para obter o nome do laboratório pelo ID
  const getLabNameById = (labId) => {
    const lab = labs.find(l => l.id === labId);
    return lab ? lab.nome : '';
  };

  // Função para obter o nome do role_id pelo ID
  const getRoleNameById = (roleId) => {
    switch (roleId) {
      case 1:
        return "Admin";
      case 2:
        return "Cliente";
      case 3:
        return "Laboratorio";
      default:
        const lab = labs.find(l => l.id === roleId);
        return lab ? lab.nome : '';
    }
  };

  // Função para deletar um usuário
  const handleDeleteUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:8080/api/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        alert('Usuário excluído com sucesso!');
        // Atualizar a lista de usuários após a exclusão
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
      } else {
        console.error("Erro ao excluir usuário:", response.data);
        alert('Erro ao excluir usuário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert('Erro na requisição. Por favor, verifique sua conexão ou tente novamente mais tarde.');
    }
  };

  // Filtrar usuários com base nos critérios de pesquisa
  const filteredUsers = users.filter(user => {
    const utilizador = user.utilizador || {};
    const matchesName = !search || (utilizador.nome && utilizador.nome.toLowerCase().includes(search.toLowerCase()));
    const matchesUserType = !userType ||
      (user.role_id && getRoleNameById(user.role_id).toLowerCase() === userType.toLowerCase()) ||
      (utilizador.idLab && getLabNameById(utilizador.idLab).toLowerCase() === userType.toLowerCase());

    return matchesName && matchesUserType;
  });

  // Alternar o estado expandido de um usuário
  const handleCollapseToggle = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  return (
    <Modal show={isShow} onHide={handleClose} scrollable>
      <Modal.Header className="d-flex flex-column align-items-center justify-content-center">
        <Modal.Title className="mb-3">
          <img className="img1" src="../../src/assets/logo-ipb.png" alt="Logo" />
          
        </Modal.Title>
        <div className="w-100">
        <hr className="small-margin"></hr>
          <input
            id="filterName"
            name="search"
            type="text"
            placeholder="Buscar nome..."
            className="form-control filter-custom me-2"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
          <select
            id="filterType"
            name="userType"
            className="form-select mt-1 mb-1 filter-custom"
            onChange={e => setUserType(e.target.value)}
            value={userType}
          >
            <option value="">Todos os Tipos</option>
            <option value="Admin">Admin</option>
            <option value="Cliente">Cliente</option>
            {labs.map(lab => (
              <option key={lab.id} value={lab.nome}>{lab.nome}</option>
            ))}
          </select>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="users-list">
          {hasError ? (
            <Alert variant="danger">Erro ao carregar utilizadores.</Alert>
          ) : (
            <>
              {filteredUsers.map(user => (
                <div key={user.id}>
                  <User
                    id={user.id}
                    utilizador={user.utilizador || {}}
                    username={user.username}
                    isExpanded={selectedUserId === user.id}
                    handleCollapseToggle={handleCollapseToggle}
                    onDelete={() => handleDeleteUser(user.id)}
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>
  );
}
