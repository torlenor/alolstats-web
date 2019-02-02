import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import FreeRotation from "./FreeRotation.js";
// import Summoners from "./Summoners";
import Champions from "./Champions";
import Champion from "./Champion";
import NotFound from "./NotFound";

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/freerotation" exact component={FreeRotation} />
    {/* <Route path="/summoners" exact component={Summoners} /> */}
    <Route path="/champions" exact component={Champions} />
    { /* Finally, catch all unmatched routes */ }
    <Route path='/champions/:champion' component={Champion} />
    <Route component={NotFound} />
  </Switch>;