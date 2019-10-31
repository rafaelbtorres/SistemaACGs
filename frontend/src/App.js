import React from "react";
import "./App.css";

import Routes from "./routes";

import logo from "./assets/logo.png";

function App() {
  return (
    <div className="container">
      <img
        src={logo}
        alt="SGACG - Sistema Gerenciador de Atividades Complementar de Graduação"
      />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
}

export default App;
