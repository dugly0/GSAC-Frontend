import logo from "./assets/images/logo-ipb.svg";
import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.css";

export default function Header() {
  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <header className="header text-center">
          <div className="pt-1 mb-2">
            <img src={logo} alt="logo-ipb" className="img-fluid custom-img1" />
            <hr className="small-margin"></hr>
          </div>
          <div className="font-weight-bold fs-2">
            <span>IPB.Orçamentos</span>
          </div>
        </header>
      </div>
    </div>
  );
}
