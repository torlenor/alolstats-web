import React, { Component } from 'react';

class Champion extends Component {
    render() {
        const {champion} = this.props;

      return (
        <div className="content">

          <div className="Champion">
  
          <div className="championPicture">
                <img
                alt=''
                src={`http://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.id}.png`} />
            </div>

            <span className="championName">
            {champion.name}
            </span>
            
          </div>
  
        </div>
      )
    }
  }

  export default Champion;