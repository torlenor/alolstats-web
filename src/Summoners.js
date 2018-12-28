import React, { Component } from "react";

import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import Summoner from "./Summoner"

import "./Summoners.css";

var summoner1 = {"name":"scuq","profileIconId":3790,"summonerLevel":43,"revisionDate":1545862413000,"timestamp":"2018-12-27T13:27:46.752+01:00","leagues":[{"queueType":"RANKED_SOLO_5x5","summonerName":"scuq","wins":2,"losses":4,"rank":"III","leagueName":"Nasus's Swarm","leagueId":"58d62820-fd6e-11e8-b904-c81f66dd2a8f","tier":"IRON","summonerId":"XdrZK9gb4t3bdjbt8l0jnkAyOL4wlbuZZHD7zvOOTYrbOXU","leaguePoints":15},{"queueType":"RANKED_FLEX_SR","summonerName":"scuq","wins":0,"losses":1,"rank":"IV","leagueName":"Tristana's Hunters","leagueId":"3ca81080-049b-11e9-bbb1-c81f66dd0e0d","tier":"IRON","summonerId":"XdrZK9gb4t3bdjbt8l0jnkAyOL4wlbuZZHD7zvOOTYrbOXU","leaguePoints":0}]}


export default class Login extends Component {
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
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
      this.setState({summonerSearched: true});
    }
  
    render() {
        const summonerSearched = this.state.summonerSearched;

        let page;
        let summoner;
    
        page = <div className="Summoners">
        <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="summonerName" bsSize="large">
            <ControlLabel>Summoner Name</ControlLabel>
            <FormControl
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
        }
        </div>;

        if (summonerSearched) {
          summoner = <div className="Summoners">
            <Summoner summoner={summoner1} />
            </div>;
        }

      return (
          <div>
       {page}
       {summoner}
       </div>
      );
    }
  }
