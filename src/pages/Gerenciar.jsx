import { useState } from "react";
import ModalUpdate from "../components/modalUpdate";
import ModalCreate from "../components/modalCreate";
import Button from "react-bootstrap/Button";
import '../assets/css/Gerenciar.css'
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'

export default function Gerenciar() {
  const [showU, setShowU] = useState(false);
  const [showC, setShowC] = useState(false);

  const handleCloseC = () => setShowC(false);
  const handleShowC = () => setShowC(true);
  const handleCloseU = () => setShowU(false);
  const handleShowU = () => setShowU(true);
  const nav = useNavigate();

  return (
    <>
    <Navbar/>
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
          <Button className="btn-secondary bt" onClick={()=> nav('/orcamentosfunc/perfilfunc')}>Voltar</Button>
        </div>
        <div className="border-bottom border-black-50 p-5"></div>
      </div>

      <ModalUpdate isShow={showU} handleClose={handleCloseU} />
      <ModalCreate isShow={showC} handleClose={handleCloseC} />
    </>
  );
}
