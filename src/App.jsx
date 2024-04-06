import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/styles.css";

import NavBar from "./components/navbar/Navbar";
import FormInput from "./components/formInput/FormInput";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Header />
        <FormInput />
        <Footer />
      </div>
    </div>
  );
}

export default App;
