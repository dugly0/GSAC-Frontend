import logo from "./assets/images/logo-ipb.svg";

import "./assets/css/styles.css";

import useLogin from "../src/assets/js/useLogin.js";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Spinner } from 'react-bootstrap';
import {
  faArrowRight,
  faUserAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";


export function App() {
  
  const { isLoading, onClickLogin } = useLogin();
  
  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="logo-ipb" className="img-fluid" />
        <span>IPB.Orçamentos</span>
      </header>

      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1" className="icon-input">
            <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
          </InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            className="custom-input rounded"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2" className="icon-input">
            <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
          </InputGroup.Text>
          <Form.Control
            type="password"
            placeholder="Password"
            aria-label="Password"
            aria-describedby="basic-addon2"
            className="custom-input rounded"
          />
        </InputGroup>

        <Button
          variant="primary"
          type="submit"
          className="button"
          onClick={onClickLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            <>
              Login <FontAwesomeIcon icon={faArrowRight} className="icon-btn" />
            </>
          )}
        </Button>
      </Form>

      <div>
        <a href="">Esqueceste-te da tua conta?</a>
        <a href="">Regista-te no IPB.Orçamentos</a>
      </div>
    </div>
  );
}
