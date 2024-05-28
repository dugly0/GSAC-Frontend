import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

// User.js
export default function User({ utilizador, username, handleCollapseToggle }) {
  const displayName = utilizador?.nome || "";
  return (
    <div className="d-flex align-items-center ">
      <div className="flex-shrink-0">
        <a href="#Perfil">
          <img className="img2" src="../../src/assets/imagem_perfil.png" />
        </a>
      </div>
      <div className="flex-grow-1 ms-3">{displayName}</div> 
      <div className="p-1" title="Editar Usuário">
        <FontAwesomeIcon
          cursor={"pointer"}
          icon={faPencil}
          onClick={handleCollapseToggle}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        />
      </div>
      <div className="p-1" title="Excluir Usuário">
        <FontAwesomeIcon icon={faXmark} cursor={"pointer"} />
      </div>
    </div>
  );
}
