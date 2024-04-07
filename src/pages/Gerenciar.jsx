import { useState } from "react";
import ModalUpdate from "../components/modalUpdate";
import ModalCreate from "../components/modalCreate";
import Button from "react-bootstrap/Button";

export default function Gerenciar() {
  const [showU, setShowU] = useState(false);
  const [showC, setShowC] = useState(false);

  const handleCloseC = () => setShowC(false);
  const handleShowC = () => setShowC(true);
  const handleCloseU = () => setShowU(false);
  const handleShowU = () => setShowU(true);

  return (
    <>
      <div className="container p-5">
        <div className="container">
          <h1 className="text-center">Gerenciar</h1>
        </div>
        <div className="border-bottom border-black-50"></div>
        <div className="d-flex justify-content-evenly mt-5">
          <Button className="btn-secondary bt bt" onClick={handleShowC}>
            Criar Utilizador
          </Button>
          <Button className="btn-secondary bt bt" onClick={handleShowU}>
            Editar Utilizador
          </Button>
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Button className="btn-secondary bt">Voltar</Button>
        </div>
        <div className="border-bottom border-black-50 p-5"></div>
      </div>

      <ModalUpdate isShow={showU} handleClose={handleCloseU} />
      <ModalCreate isShow={showC} handleClose={handleCloseC} />
    </>
  );
}
