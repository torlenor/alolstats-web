import React, { Component } from "react";

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import Summoner from "./Summoner"

import "./Summoners.css";

export default class Summoners extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        summonerName: "",
        summonerSearched: false
      };
    }
  
    validateForm() {
      return this.state.summonerName.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value,
        summonerSearched: false
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
      this.setState({summonerSearched: true, summonerName: this.state.summonerName});
    }
  
    render() {
        const summonerSearched = this.state.summonerSearched;

        let page;
    
        if (summonerSearched) {
        page = <div className="Summoners">
        <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="summonerName" bsSize="large">
            <ControlLabel>Summoner Name</ControlLabel>
            <FormControl
            autoComplete="off"
                autoFocus
                type="summonerName"
                value={this.state.summonerName}
                onChange={this.handleChange}
            />
            </FormGroup>
            <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            >
            Search Summoner
            </Button>
        </form>
            <Summoner summoner={this.state.summonerName} />
            </div>;
    } else {
        page = <div className="Summoners">
        <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="summonerName" bsSize="large">
            <ControlLabel>Summoner Name</ControlLabel>
            <FormControl
            autoComplete="off"
                autoFocus
                type="summonerName"
                value={this.state.summonerName}
                onChange={this.handleChange}
            />
            </FormGroup>
            <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            >
            Search Summoner
            </Button>
        </form>
        </div>;
    }

      return (
          <div>
       {page}
       </div>
      );
    }
  }
