import React, { Component } from 'react';
import './App.css';

import Typography from '@material-ui/core/Typography';

import NavBar from './components/NavBar'
import Routes from "./components/Routes";
import Footer from "./components/Footer";

const VERSION = `${process.env.REACT_APP_VERSION}`;
const BUILD_DATE = `${process.env.REACT_APP_BUILD_DATE}`;

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const VERSIONS_API = `${API_URL}/v1/stats/versions`;
const LEAGUES_API = `${API_URL}/v1/stats/leagues`;

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            didMount: false,
            versions: [],
            leagues: [],
            error: false,

            patch: "",
            league: "",
        };
    
        this.handlerPatch = this.handlerPatch.bind(this);
        this.handlerLeague = this.handlerLeague.bind(this);
    }
    
    handlerPatch(newSelectedPatch) {
        this.setState({
            patch: newSelectedPatch
        });
    }

    handlerLeague(newSelectedLeague) {
        this.setState({
            league: newSelectedLeague
        });
    }

    componentDidMount() {
        fetch(VERSIONS_API).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {
            if (data.versions.length > 0) {
                this.setState({versions: data.versions, error: false, didMount: true});
                this.handlerPatch(data.versions[0]);
            }
        }).catch(error => {
            this.setState({error: true, didMount: true});
            console.log(error);
        });

        fetch(LEAGUES_API).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {
            if (data.leagues.length > 0) {
                this.setState({leagues: data.leagues, error: false, didMount: true});
                this.handlerLeague(data.leagues[0]);
            }
        }).catch(error => {
            this.setState({error: true, didMount: true});
            console.log(error);
        });
    }

    render() {
        var page;
        if (this.state.didMount === false) {
            page =<div className="App">
                </div>;
        } else if (this.state.error) {
            page = <div className="Champions">
            <Typography variant="h5" gutterBottom component="h3">
                    <br/>
                    Sorry for the inconvenience!
                    <br/>
                    <br/>
                    ALoLStats is currently in maintenance.
                    <br/><br/>
                    Please try again later.
                </Typography>
            </div>
        } else {
            page =<div className="App">
                    <NavBar versions={this.state.versions} leagues={this.state.leagues} handlerPatch={this.handlerPatch} handlerLeague={this.handlerLeague} />
                    <Routes versions={this.state.versions} leagues={this.state.leagues} selectedVersion={this.state.patch} selectedLeague={this.state.league}/>
                    <Footer appVersion={VERSION} buildDate={BUILD_DATE}/>
                </div>;
        }
        return(page);
  }
}

export default App;
