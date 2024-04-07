import Button from "react-bootstrap/Button";
import "./assets/css/styles.css";
import useLogin from "./assets/js/useLogin.js";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function BtnLogin() {
  const { isLoading, onClickLogin } = useLogin();
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <div className={`button-wrapper ${isLoading ? "loading" : ""}`}>
              <Button
                variant="primary"
                type="submit"
                className="button"
                onClick={onClickLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <a href="">Login</a>
                    <FontAwesomeIcon icon={faSpinner} className="icon-btn" spin />
                  </>
                ) : (
                  <>
                    <a href="">Login</a>
                    <FontAwesomeIcon icon={faArrowRight} className="icon-btn" />
                  </>
                )}
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
