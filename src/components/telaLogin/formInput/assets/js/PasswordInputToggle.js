import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group controlId="password">
      <Form.Label>Password</Form.Label>
      <div id="show_hide_password">
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <a href="#" onClick={togglePasswordVisibility}>
          <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`} />
        </a>
      </div>
    </Form.Group>
  );
}

export default PasswordInput;
