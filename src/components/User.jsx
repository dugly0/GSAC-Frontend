import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function User({ id, utilizador, username, isExpanded, handleCollapseToggle }) {
  const displayName = utilizador?.nome || "";

  return (
    <div className="d-flex align-items-center border-bottom border-black-50">
      <div className="flex-shrink-0">
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
        <a href="#exampleModal" data-bs-toggle="modal">
          <FontAwesomeIcon icon={faXmark} />
        </a>
      </div>
    </div>
  );
}