import Button from "react-bootstrap/Button";
import "./assets/css/styles.css";
import useLogin from "./assets/js/useLogin.js";
import { Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function BtnLogin({ onClick, children, isLoading }) {
  return (
    <div className="container">
      <div className="d-flex p-2d-flex justify-content-center">
        <Button variant="primary" className="button" onClick={onClick} disabled={isLoading}>Login
          {children}
          {isLoading ? (
            <FontAwesomeIcon icon={faSpinner} className="icon-btn" spin />
          ) : (
            <FontAwesomeIcon icon={faArrowRight} className="icon-btn" />
          )}
        </Button>
      </div>
    </div>
  );
}