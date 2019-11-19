import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Solicitar from "./pages/Solicitar";
import Avaliar from "./pages/Avaliar";
import Visualizar from "./pages/Visualizar";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/solicitar" component={Solicitar} />
        <Route path="/avaliar/:id" component={Avaliar} />
        <Route path="/visualizar/:id" component={Visualizar} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
