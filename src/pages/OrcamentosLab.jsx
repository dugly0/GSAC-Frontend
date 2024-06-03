import Navbar from "../components/Navbar";
import ListaOrcamentos from "../components/telaOrcamentosLab/ListaOrcamentos";

export default function OrcamentosLab() {
  return (
    <>
      <div className="app">
        <Navbar tipoPerfil={false} tipoOrcamento={false} />
        <ListaOrcamentos />
      </div>
    </>
  );
}
