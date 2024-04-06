import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import {
  faArrowUpRightFromSquare,
  faFax,
  faHouse,
  faInfoCircle,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ipbFooter from "./assets/images/ipb-footer.png";

export default function Footer() {
  return (
    <footer>
      <div className="innerAll">
        <div className="row clearfix">
          <div className="col-md-6">
            <img src={ipbFooter} alt="Footer" className="img-fluid custom-img" />
          </div>
          <div className="col-md-6">
            <div className="pull-right">
              <div className="small text-muted">
                <div className="col-md">
                  <FontAwesomeIcon id="icon-footer" icon={faHouse} />
                  {" Campus de Santa Apolónia - 5300-253 BRAGANÇA"}
                </div>
                <div className="col-md">
                  <FontAwesomeIcon id="icon-footer" icon={faPhone} />
                  {" Tel: (+351) 273 330 850 - "}
                  <FontAwesomeIcon id="icon-footer" icon={faFax} />
                  {"Fax: (+351) 273 325 405"}
                </div>
                <div className="col-md">
                  <FontAwesomeIcon id="icon-footer" icon={faArrowUpRightFromSquare} />
                  <a href="http://suporte.ipb.pt"> Página de Suporte</a>
                </div>
                <div id="line" className="text-muted small strong innerB ng-binding">
                  <hr className="small-margin"></hr>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  {" Versão: teste"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
