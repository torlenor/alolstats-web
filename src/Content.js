import React, { Component } from 'react';

import Summoner from './Summoner.js'

class Content extends Component {
    render() {
        const {summoner} = this.props;

      return (
        <div className="content">
          <div className="line"></div>
  
            {/* Summoner item */}

          <Summoner
            summoner={summoner} />
  
        </div>
      )
    }
  }

  export default Content;
