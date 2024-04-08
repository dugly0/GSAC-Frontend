import Navbar from "../components/Navbar";
import ListaOrcamentos from "../components/telaOrcamentosFunc/ListaOrcamentos";



export default function OrcamentosFunc() {
  return (
    <>
    <div className="app">
      <Navbar tipoPerfil={false} tipoOrcamento={false}/>
      <ListaOrcamentos />
    </div>
    </>
  );
}


