import logo from "./assets/images/logo-ipb.svg";

import "./assets/css/styles.css";

export function App() {
  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="logo-ipb" />
        <span>IPB.Orçamentos</span>
      </header>

      <form>
        <div className="inputContainer">
          <input 
          type="text" 
          name="email" 
          id="email" 
          placeholder="Email" />
        </div>

        <div className="inputContainer">
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Senha"
          />
        </div>

        <button className="button">Login</button>
      </form>

      <div>
      <a href="">Esqueceste-te da tua conta?</a>
      <a href="">Regista-te no IPB.Orçamentos</a>
      </div>
      
    </div>
  );
}
