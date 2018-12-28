import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";
import NavigationBar from './Navbar.js'

class App extends Component {
  render() {
    return (
        <div className="App">
            <NavigationBar />
            <Routes />
        </div>
    );
  }

}

export default App;
