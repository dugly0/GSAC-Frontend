import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Gerenciar from "./pages/Gerenciar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Perfil from "./pages/Perfis/Perfil";
import PerfilFunc from "./pages/Perfis/PerfilFunc";
import OrcamentosFunc from "./pages/OrcamentosFunc";
import Orcamentos from "./pages/Orcamentos";
import OrcamentosLab from "./pages/OrcamentosLab";
import PerfilLab from "./pages/PerfilLab";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "orcamentos",
    element: (
      <PrivateRoute>
        <Orcamentos />
      </PrivateRoute>
    ),
  },
  {
    path: "orcamentosfunc",
    element: <OrcamentosFunc />,
  },
  {
    path: "orcamentoslab",
    element: <OrcamentosLab />,
  },
  {
    path: "orcamentos/perfil",
    element: <Perfil />,
  },
  {
    path: "orcamentosfunc/perfilfunc",
    element: <PerfilFunc />,
  },
  {
    path: "orcamentoslab/perfillab",
    element: <PerfilLab />,
  },
  {
    path: "orcamentosfunc/perfilfunc/gerenciar",
    element: <Gerenciar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>
);
