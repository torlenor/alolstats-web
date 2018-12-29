import React from "react";
import { Route, Switch } from "react-router-dom";
import FreeRotation from "./FreeRotation.js";
import NotFound from "./NotFound";
import Home from "./Home";
import Summoners from "./Summoners";
import Champions from "./Champions";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/freerotation" exact component={FreeRotation} />
    <Route path="/summoners" exact component={Summoners} />
    <Route path="/champions" exact component={Champions} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;