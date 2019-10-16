import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

//import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Principal from "views/Principal/Principal.js";
import Solicitacao from "views/Solicitacao/Solicitacao.js";
import ListarSolicitacoes from "views/Listar/ListarSolicitacoes.js";
import Avaliar from "views/Avaliacao/Avaliar.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={Principal} />
      <Route path="/solicitacao" component={Solicitacao} />
      <Route path="/listar" component={ListarSolicitacoes} />
      <Route path="/avaliar" component={Avaliar} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
