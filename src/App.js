import React, { Component } from 'react';
import './App.css';

import Typography from '@material-ui/core/Typography';

// Cookie stuff
import CookieConsent from "react-cookie-consent";

// THEME
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

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            didMountVersions: false,
            didMountLeagues: false,

            versions: [],
            leagues: [],
            
            errorVersions: true,
            errorLeagues: true,

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
                this.setState({errorLeagues: true, didMountLeagues: false});
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
    }


    render() {
        var page;
        if (this.state.didMountVersions === false || this.state.didMountLeagues === false) {
            page = <MuiThemeProvider theme={muiTheme}>
                <div className="App"/>
                </MuiThemeProvider>;
        } else if (this.state.errorVersions || this.state.errorLeagues) {
            page = <MuiThemeProvider theme={muiTheme}><div className="App">
            <Typography variant="h5" gutterBottom component="h3">
                    <br/>
                    Sorry for the inconvenience!
                    <br/>
                    <br/>
                    ALoLStats is currently in maintenance.
                    <br/><br/>
                    Please try again later.
                </Typography>
            </div></MuiThemeProvider>;
        } else {
            page =<MuiThemeProvider theme={muiTheme}>
                    <div className="App">
                        <NavBar versions={this.state.versions} leagues={this.state.leagues} handlerPatch={this.handlerPatch} handlerLeague={this.handlerLeague} />
                        <Routes versions={this.state.versions} leagues={this.state.leagues} selectedVersion={this.state.patch} selectedLeague={this.state.league}/>
                        <Footer appVersion={VERSION} buildDate={BUILD_DATE}/>
                    </div>
                    <CookieConsent>
                        This website uses cookies to enhance the user experience.
                    </CookieConsent>
                </MuiThemeProvider>;
        }
        return(page);
  }
}

export default App;
