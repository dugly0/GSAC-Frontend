import Navbar from "../components/Navbar";
import ListaOrcamentos from "../components/telaOrcamentos/ListaOrcamentos";


export default function Orcamentos() {
  return (
    <>
    <div className="Orcamentos">
      <Navbar tipoPerfil={true} tipoOrcamento={true}/>
      <ListaOrcamentos />
    </div>
    </>
  );
}

