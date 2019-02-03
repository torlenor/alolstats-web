import React, { Component } from 'react';
import './App.css';

import NavBar from './components/NavBar'
import Routes from "./components/Routes";
import Footer from "./components/Footer";

class App extends Component {

    constructor(props) {
        super(props)
    
        this.handler = this.handler.bind(this);
      }
    
      handler(someValue) {
        console.log("updated: " + someValue);
        this.setState({
          patch: someValue
        });
      }

  render() {
    return (
      <div className="App">
        <NavBar handler= {this.handler} />
        <Routes />
        <Footer />
      </div>
    );
  }
}

export default App;
