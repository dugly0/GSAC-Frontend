import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTimes } from "@fortawesome/free-solid-svg-icons"; // Importe o ícone faTimes para o ícone de X

export default function User({ id, utilizador, username, isExpanded, handleCollapseToggle, onDelete }) {
  const displayName = utilizador?.nome || username || "";
  const [confirmDelete, setConfirmDelete] = useState(false); // Estado para controlar a confirmação de exclusão

  const handleDeleteClick = () => {
    setConfirmDelete(true); // Mostra o botão de confirmação de exclusão
  };

  const handleConfirmDelete = () => {
    // Realiza a exclusão do usuário
    onDelete(id);
    setConfirmDelete(false); // Esconde o botão de confirmação após a exclusão
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false); // Cancela a exclusão e esconde o botão de confirmação
  };

  return (
    <div className="d-flex align-items-center border-bottom border-black-50">
      <div className="flex-shrink-0">
        {/* Conteúdo específico do usuário, se houver */}
      </div>
      <div className="flex-grow-1 ms-3">{displayName}</div>
      <div className="p-1" toggle="tooltip" title="Editar Usuário">
        <a
          data-bs-toggle="collapse"
          href={`#collapseExample${id}`}
          aria-expanded={isExpanded}
          aria-controls={`collapseExample${id}`}
          onClick={() => handleCollapseToggle(id)}
        >
          <FontAwesomeIcon icon={faPencil} />
        </a>
      </div>
      <div className="p-1" toggle="tooltip" title="Excluir Usuário">
        {!confirmDelete ? (
          <a href="#deleteConfirm" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTimes} />
          </a>
        ) : (
          <div>
            <span>Confirmar exclusão?</span>
            <button className="btn btn-sm btn-danger ms-2" onClick={handleConfirmDelete}>Confirmar</button>
            <button className="btn btn-sm btn-secondary ms-2" onClick={handleCancelDelete}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
}
