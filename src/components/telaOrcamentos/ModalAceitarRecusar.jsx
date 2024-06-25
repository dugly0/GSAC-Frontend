// ModalAceitarRecusar.js

import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const ModalAceitarRecusar = ({ show, onHide, orcamento }) => {
  const handleAceitar = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/orcamento/${orcamento.id}`,
        {
          estadoOrcamentos: 1, // 1 para "Aceito"
          servico_orcamento: orcamento.servicoOrcamentos // <-- Corrigido aqui
            ? orcamento.servicoOrcamentos.map((servico) => ({
                servico_id: servico.servico_id,
                quantidade: servico.quantidade,
              }))
            : [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Orcamento Aceito:", response.data);
      onHide();
      // Aqui você pode adicionar lógica para atualizar o estado local ou recarregar os dados
    } catch (error) {
      console.error("Erro ao aceitar orçamento:", error);
      // Lógica de tratamento de erro, exibir mensagem para usuário, etc.
    }
  };

  const handleRecusar = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8080/api/orcamento/${orcamento.id}`,
        {
          estadoOrcamentos: 2, // 2 para "Recusado"
          servico_orcamento: orcamento.servicoOrcamentos // <-- Corrigido aqui
            ? orcamento.servicoOrcamentos.map((servico) => ({
                servico_id: servico.servico_id,
                quantidade: servico.quantidade,
              }))
            : [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Orcamento Recusado:", response.data);
      onHide();
      // Aqui você pode adicionar lógica para atualizar o estado local ou recarregar os dados
    } catch (error) {
      console.error("Erro ao recusar orçamento:", error);
      // Lógica de tratamento de erro, exibir mensagem para usuário, etc.
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Aceitar ou Recusar Orçamento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Deseja aceitar ou recusar este orçamento?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleAceitar}>
          Aceitar
        </Button>
        <Button variant="danger" onClick={handleRecusar}>
          Recusar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAceitarRecusar;
