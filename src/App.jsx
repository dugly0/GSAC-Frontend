import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/styles.css";
import { Link } from "react-router-dom";
import NavBar from "./components/navbar/Navbar";
import Header from "./components/header/Header";
import FormInput from "./components/formInput/FormInput";
import AccountServices from "./components/accountServices/AccountServices";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Header />
        <FormInput />
        <div className="d-flex justify-content-center">
        </div>
        <AccountServices />
      </div>
    </div>
  );
}

export default App;
