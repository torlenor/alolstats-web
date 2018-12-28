import React, { Component } from 'react';

import './App.css';

import Routes from "./Routes";

import NavigationBar from './Navbar.js'

var freeRotation1 = {"freeChampionIds":[13,34,35,44,51,60,68,80,84,99,126,150,161,202],"freeChampionIdsForNewPlayers":[18,81,92,141,37,238,19,45,25,64],"maxNewPlayerLevel":10,"timestamp":"2018-12-16T08:47:42.219343512Z"}

var summoner1 = {"name":"scuq","profileIconId":3790,"summonerLevel":43,"revisionDate":1545862413000,"timestamp":"2018-12-27T13:27:46.752+01:00","leagues":[{"queueType":"RANKED_SOLO_5x5","summonerName":"scuq","wins":2,"losses":4,"rank":"III","leagueName":"Nasus's Swarm","leagueId":"58d62820-fd6e-11e8-b904-c81f66dd2a8f","tier":"IRON","summonerId":"XdrZK9gb4t3bdjbt8l0jnkAyOL4wlbuZZHD7zvOOTYrbOXU","leaguePoints":15},{"queueType":"RANKED_FLEX_SR","summonerName":"scuq","wins":0,"losses":1,"rank":"IV","leagueName":"Tristana's Hunters","leagueId":"3ca81080-049b-11e9-bbb1-c81f66dd0e0d","tier":"IRON","summonerId":"XdrZK9gb4t3bdjbt8l0jnkAyOL4wlbuZZHD7zvOOTYrbOXU","leaguePoints":0}]}

const API = 'http://localhost:8000/v1/champion/bykey?key=';

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
