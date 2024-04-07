import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.css";

import InputGroup from "react-bootstrap/InputGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserAlt,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

export default function FormInput() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-md">
      <div className="row justify-content-center">
        <Form className="col-md-6 pt-2">
          <div className={`password-wrapper ${showPassword ? "password" : ""}`}>
            <InputGroup className="mb-2">
              <InputGroup.Text id="basic-addon1" className="icon-input">
                <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                className="custom-input"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon2" className="icon-input">
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-label="Password"
                aria-describedby="basic-addon2"
                className="custom-input"
                id="input-active"
                style={{ paddingRight: "2.5rem" }}
              />
              <InputGroup.Text
                className="eye-icon"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </Form>
      </div>
    </div>
  );
}
