import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Solicitar from "./pages/Solicitar";
import Avaliar from "./pages/Avaliar";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/solicitar" component={Solicitar} />
        <Route path="/avaliar/:id" component={Avaliar} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
}
