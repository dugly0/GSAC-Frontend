import logo from './assets/images/logo-ipb.svg'

import './assets/css/styles.css'

export function App() {
  return (
    <div className="container">
      <header className="header">
        <img src={logo} alt="logo-ipb" />
        <span>IPB.Orçamentos</span>
      </header>

      <form>
        <div className="inputContainer">
          <label htmlFor="email">E-mail</label>
          <input 
          type="text" 
          name="email" 
          id="email" 
          placeholder="email" />
        </div>

        <div className="inputContainer">
          <label htmlFor="password">Password</label>
          <input 
          type="text" 
          name="password" 
          id="password" 
          placeholder="password" />
        </div>

        <button className="button">
          Login
        </button>

        <a href="">Esqueceste-te da tua conta?</a>
        <a href="">Regista-te no IPB.Orçamentos</a>

      </form>

    </div>
  );
}
