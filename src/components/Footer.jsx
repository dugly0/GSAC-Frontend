import { faArrowUpRightFromSquare, faFax, faHouse, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer>
      <div className="d-lg-flex d-md-flex justify-content-between container mt-5">
        <img src="./src/assets/logo_footer.png" className="img-thumbnail"/>
        <ul>
        <li><FontAwesomeIcon icon={faHouse}/>Campus de Santa Apolónia - 5300-253 BRAGANÇA</li>
        <ul className="list-group list-group-horizontal"><li><FontAwesomeIcon icon={faPhone}/>Tel: (+351) 273 330 850</li><li><FontAwesomeIcon icon={faFax}/>Fax: (+351) 273 325 405</li></ul>
        <li><FontAwesomeIcon icon={faArrowUpRightFromSquare}/>Página de Suporte</li>
        </ul>
      </div>
    </footer> 
  )
}
