import React, { Component } from 'react';
import './App.css';

import NavBar from './components/NavBar'
import Routes from "./components/Routes";
import Footer from "./components/Footer";

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
            error: false
        };
    
        this.handlerPatch = this.handlerPatch.bind(this);
        this.handlerLeague = this.handlerLeague.bind(this);
    }
    
    handlerPatch(someValue) {
        this.setState({
            patch: someValue
        });
    }

    handlerLeague(someValue) {
        this.setState({
            league: someValue
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
            if (data.versions !== undefined && data.versions.length > 0) {
                this.setState({versions: data.versions, selectedVersion: data.versions[0]});
            } else {
                this.setState({versions: data.versions});
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
            this.setState({leagues: data.leagues});
        }).catch(error => {
            this.setState({error: true, didMount: true});
            console.log(error);
        });
    }

  render() {
    return (
      <div className="App">
        <NavBar versions={this.state.versions} leagues={this.state.leagues} handlerPatch={this.handlerPatch} handlerLeague={this.handlerLeague} />
        <Routes versions={this.state.versions} leagues={this.state.leagues} selectedVersion={this.state.patch}/>
        <Footer />
      </div>
    );
  }
}

export default App;
