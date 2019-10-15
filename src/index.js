import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import Components from "views/Components/Components.js";
import ExibirSolicitacoes from "views/Components/ExibirSolicitacoes.js";
import Solicitacao from "views/Components/Solicitacao.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={Components} />
      <Route path="/solicitacao" component={Solicitacao} />
      <Route path="/exibir" component={ExibirSolicitacoes} />
      <Route path="/avaliar" component={LandingPage} />
      <Route path="/listar" component={ProfilePage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
