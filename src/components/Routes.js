import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import FreeRotation from "./FreeRotation";
import Champions from "./Champions";
import Champion from "./Champion";
import ChampionComparison from "./ChampionComparison";
import ChampionsSummary from "./ChampionsSummary";
import NotFound from "./NotFound";

class MainPage extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact render={()=><Champions parentProps={this.props}/>}/>

                <Route path="/freerotation" exact render={()=><FreeRotation parentProps={this.props}/>}/>

                <Route path="/champions" exact render={()=><Champions parentProps={this.props}/>}/>

                <Route path="/championcomparison" exact render={()=><ChampionComparison parentProps={this.props}/>}/>

                <Route path="/championssummary" exact render={()=><ChampionsSummary parentProps={this.props}/>}/>

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