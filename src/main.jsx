import { createRoot } from "react-dom/client";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Footer from "./components/footer/Footer";
import Perfil from "./pages/Perfis/Perfil";
import PerfilFunc from "./pages/Perfis/PerfilFunc";
import OrcamentosFunc from "./pages/OrcamentosFunc";
import Orcamentos from "./pages/Orcamentos";
import OrcamentosLab from "./pages/OrcamentosLab";
import PrivateRoute from "./PrivateRoute";

// Obtém o contêiner DOM onde o root do React será inicializado
const container = document.getElementById("root");

// Cria o root do React se ainda não estiver criado
let root = createRoot(container);

// Definição das rotas do aplicativo
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="orcamentos" element={<PrivateRoute><Orcamentos /></PrivateRoute>} />
    <Route path="orcamentosfunc" element={<OrcamentosFunc />} />
    <Route path="orcamentoslab" element={<OrcamentosLab />} />
    <Route path="orcamentos/perfil" element={<Perfil />} />
    <Route path="orcamentosfunc/perfilfunc" element={<PerfilFunc />} />
    <Route path="orcamentoslab/perfil" element={<Perfil />} />
  </Routes>
);

// Renderização inicial do aplicativo
root.render(
  <React.StrictMode>
    <Router>
      <AppRoutes />
      <Footer />
    </Router>
  </React.StrictMode>
);
