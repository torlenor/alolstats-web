import React, { Component } from 'react';

import "./Summoner.css"

class Summoner extends Component {
    render() {
        const {summoner} = this.props;

      return (
        <div className="content">

          <div className="Summoner">
  
            <div className="profileIcon">
                <img
                alt=''
                style={{width: 100, height: 100}}
    resizeMode="strech"
                src={`http://ddragon.leagueoflegends.com/cdn/8.24.1/img/profileicon/${summoner.profileIconId}.png`} />
            </div>

            <div> 
            <span className="summonerName">
            {summoner.name}
            </span>
            </div>

            <div>
                <span className="summonerLevel">
                {summoner.summonerLevel}
                </span>
            </div>
            
            <div>
                <span className="summonerTimestamp">
                Last updated: {summoner.timestamp}
                </span>
            </div>
          </div>
        </div>
      )
    }
  }

  export default Summoner;