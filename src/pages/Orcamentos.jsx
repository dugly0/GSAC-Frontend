import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import ListaOrcamentos from "../components/telaOrcamentos/ListaOrcamentos";

export default function Orcamentos() {
  return (
    <>
      <div className="Orcamentos">
        <Navbar />
        <ListaOrcamentos />
      </div>
    </>
  );
}
