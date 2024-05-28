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
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BtnLogin from "../buttonLogin/ButtonLogin";

export default function FormInput() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [roleid, setRoleId] = useState(null);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.access_token);
      setRoleId(response.data.role_id);

      if (response.data.role_id == 1) {
        navigate("/orcamentosfunc"); 
      } else if (response.data.role_id == 2) {
        navigate("/orcamentos"); 
      }

    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="container-md">
      <div className="row justify-content-center">
        <Form className="col-md-6 pt-2" onSubmit={handleSubmit}>
          <div className={`password-wrapper ${showPassword ? "password" : ""}`}>
            <InputGroup className="mb-2">
              <InputGroup.Text id="basic-addon1" className="icon-input">
                <FontAwesomeIcon icon={faUserAlt}></FontAwesomeIcon>
              </InputGroup.Text>
              <Form.Control
                type=""
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                className="custom-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputGroup.Text
                className="eye-icon"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </InputGroup.Text>
            </InputGroup>
          </div>

          {error && <div className="text-danger">{error}</div>}

          <BtnLogin onClick={handleSubmit}></BtnLogin>

        </Form>
      </div>
    </div>
  );
}
