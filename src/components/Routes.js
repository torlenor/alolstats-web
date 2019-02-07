import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import FreeRotation from "./FreeRotation.js";
import Champions from "./Champions";
import Champion from "./Champion";
import NotFound from "./NotFound";

class MainPage extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/freerotation" exact component={FreeRotation} />
                {/* <Route path="/champions" exact component={Champions} /> */}

                <Route path="/champions" exact render={()=><Champions parentProps={this.props}/>}/>

                {/* <Route path='/champions/:champion' component={Champion} /> */}

                <Route
                    path='/champions/:champion'
                    render={(props) => <Champion {...props} parentProps={this.props} />}
                />

                { /* Finally, catch all unmatched routes */ }
                <Route component={NotFound} />
            </Switch>
        );
    }
}

export default MainPage;