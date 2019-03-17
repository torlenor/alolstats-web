import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";

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

                <Route 
                    path="/championcomparison/:champion1/:champion2"
                    render={(props) => <ChampionComparison {...props} parentProps={this.props}/>}
                />

                <Route path="/championssummary" exact render={()=><ChampionsSummary parentProps={this.props} routerHistory={this.props.history}/>}/>

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

export default withRouter(MainPage);