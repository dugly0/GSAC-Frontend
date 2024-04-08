import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import Gerenciar from './pages/Gerenciar'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Footer from "./components/footer/Footer";
import Perfil from './pages/Perfil'
import PerfilFunc from './pages/PerfilFunc'
import OrcamentosFunc from './pages/OrcamentosFunc'
import Orcamentos from './pages/Orcamentos';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "orcamentos",
    element: <Orcamentos />,
  },
  {
    path: "orcamentosfunc",
    element: <OrcamentosFunc />,
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
    path: "orcamentosfunc/perfilfunc/gerenciar",
    element: <Gerenciar />,
  },
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <RouterProvider router={router} />
    <Footer />
  </React.StrictMode>,
)
