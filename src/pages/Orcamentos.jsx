import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ListaOrcamentos from "./components/telaOrcamentos/ListaOrcamentos";


function Orcamentos() {
  return (
    <>
    <div className="Orcamentos">
      <Navbar />
      <ListaOrcamentos />
      <Footer />
    </div>
    </>
  );
}

export default Orcamentos;