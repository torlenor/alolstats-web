import React, { Component } from 'react';
import './App.css';

import Typography from '@material-ui/core/Typography';

// Cookie stuff
import CookieConsent from "react-cookie-consent";

// THEME
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import muiTheme from './theme/MuiTheme';

import NavBar from './components/NavBar';
import Routes from "./components/Routes";
import Footer from "./components/Footer";

const VERSION = `${process.env.REACT_APP_VERSION}`;
const BUILD_DATE = `${process.env.REACT_APP_BUILD_DATE}`;

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const VERSIONS_API = `${API_URL}/v1/stats/versions`;
const LEAGUES_API = `${API_URL}/v1/stats/leagues`;
const QUEUES_API = `${API_URL}/v1/stats/queues`;

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            didMountVersions: false,
            didMountLeagues: false,
            didMountQueues: false,

            versions: [],
            leagues: [],
            queues: [],
            
            errorVersions: true,
            errorLeagues: true,
            errorQueues: true,

            patch: "",
            league: "",
            queue: "",
        };
    
        this.handlerPatch = this.handlerPatch.bind(this);
        this.handlerLeague = this.handlerLeague.bind(this);
        this.handlerQueue = this.handlerQueue.bind(this);
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

    handlerQueue(newSelectedQueue) {
        this.setState({
            queue: newSelectedQueue
        });
    }

    componentDidMount() {
        fetch(VERSIONS_API).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({errorVersions: true, didMountVersions: true});
                return null;
            }
        }).then(data => {
            if (data.versions.length > 0) {
                this.setState({versions: data.versions, errorVersions: false, didMountVersions: true, patch: data.versions[0]});
            } else {
                console.log("Received empty versions response");
                this.setState({errorVersions: true, didMountVersions: true});
            }
        }).catch(error => {
            this.setState({errorVersions: true, didMountVersions: true});
            console.log(error);
        });

        fetch(LEAGUES_API).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({errorLeagues: true, didMountLeagues: true});
                return null;
            }
        }).then(data => {
            if (data.leagues.length > 0) {
                this.setState({leagues: data.leagues, errorLeagues: false, didMountLeagues: true, league: data.leagues[0]});
            } else {
                console.log("Received empty leagues response");
                this.setState({errorLeagues: true, didMountLeagues: true});
            }
        }).catch(error => {
            this.setState({errorLeagues: true, didMountLeagues: true});
            console.log(error);
        });

        fetch(QUEUES_API).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({errorQueues: true, didMountQueues: true});
                return null;
            }
        }).then(data => {
            if (data.queues.length > 0) {
                this.setState({queues: data.queues, errorQueues: false, didMountQueues: true, queue: data.queues[0]});
            } else {
                console.log("Received empty queues response");
                this.setState({errorQueues: true, didMountQueues: true});
            }
        }).catch(error => {
            this.setState({errorQueues: true, didMountQueues: true});
            console.log(error);
        });
    }


    render() {
        var page;
        if (this.state.didMountVersions === false || this.state.didMountLeagues === false || this.state.didMountQueues === false) {
            page = <MuiThemeProvider theme={muiTheme}>
                <div className="App"/>
                </MuiThemeProvider>;
        } else if (this.state.errorVersions || this.state.errorLeagues || this.state.errorQueues) {
            page = <MuiThemeProvider theme={muiTheme}>
                <div className="App">
                    <Typography variant="h5" gutterBottom component="h3" color={'error'}>
                        <br/>
                        Sorry for the inconvenience!
                        <br/>
                        <br/>
                        fuu.la is currently in maintenance.
                        <br/><br/>
                        Please try again later.
                    </Typography>
                </div>
            </MuiThemeProvider>;
        } else {
            page =<MuiThemeProvider theme={muiTheme}>
                    <div className="App">
                        <CssBaseline />
                        <NavBar versions={this.state.versions} leagues={this.state.leagues} queues={this.state.queues} handlerPatch={this.handlerPatch} handlerLeague={this.handlerLeague} handlerQueue={this.handlerQueue} />
                        <Routes versions={this.state.versions} leagues={this.state.leagues} queues={this.state.queues} selectedVersion={this.state.patch} selectedLeague={this.state.league} selectedQueue={this.state.queue}/>
                        <Footer appVersion={VERSION} buildDate={BUILD_DATE}/>
                        <CookieConsent>
                            This website uses cookies to enhance the user experience and Google Analytics.
                        </CookieConsent>
                    </div>
                </MuiThemeProvider>;
        }
        return(page);
  }
}

export default App;
