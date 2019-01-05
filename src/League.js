import React, { Component } from 'react';

import "./League.css"

class League extends Component {
    render() {
        const {league} = this.props;

      return (
        <div className="content">

        <div className="League">
  
            {/* <div className="leagueTierIcon">
                <img
                alt=''
                style={{width: 100, height: 100}}
    resizemode="strech"
                src={`http://ddragon.leagueoflegends.com/cdn/8.24.1/img/profileicon/${league.profileIconId}.png`} />
            </div> */}

            <div> 
            <span className="queueType">
            {league.queueType}
            </span>
            </div>

            <div> 
            <span className="tier">
            {league.tier} {league.rank}
            </span>
            </div>

            <div>
                <span className="leageuStats">
                <b>{league.leaguePoints}LP</b> / {league.wins}W {league.losses}L
                </span>
            </div>
            
            <div>
                <span className="leagueTimestamp">
                Last updated: {league.timestamp}
                </span>
            </div>
          </div>
        </div>
      )
    }
  }

  export default League;