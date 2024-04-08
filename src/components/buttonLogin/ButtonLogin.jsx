import Button from "react-bootstrap/Button";
import "./assets/css/styles.css";
import useLogin from "./assets/js/useLogin.js";
import { Link } from "react-router-dom";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function BtnLogin({nomeBotao}) {
  const { isLoading, onClickLogin } = useLogin();
  return (
    <div className="container">
          <div className={`button-wrapper ${isLoading ? "loading" : ""}`}>
              <Button
                variant="primary"
                type="submit"
                className="button"
                onClick={onClickLogin}
                disabled={isLoading}>
                {isLoading ? (
                  <>
                    <a href="">Login Funcionário</a>
                    <FontAwesomeIcon icon={faSpinner} className="icon-btn" spin />
                  </>
                ) : (
                  <>
                    <a href="">{nomeBotao}</a>
                    <FontAwesomeIcon icon={faArrowRight} className="icon-btn" />
                  </>
                )}
                </Button>
              
          </div>
        </div>
  );
}
