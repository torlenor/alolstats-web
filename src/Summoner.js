import React, { Component } from 'react';

class Summoner extends Component {
    render() {
        const {summoner} = this.props;

      return (
        <div className="content">

          <div className="Summoner">
  
            <span className="summonerName">
            {summoner.name}
            </span>

            <span className="summonerLevel">
            {summoner.summonerLevel}
            </span>
            
            <span className="summonerTimestamp">
            Last updated: {summoner.timestamp}
            </span>
          </div>
  
        </div>
      )
    }
  }

  export default Summoner;