import React, { Component } from 'react';

import './App.css';

import Champion from './Champion.js'
import NavigationBar from './Navbar.js'

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

var summoner1 = {"accountId":40722898,"id":38025803,"name":"Torlenor","profileIconId":987,"puuid":0,"summonerLevel":29,"revisionDate":1544908939000,"timestamp":"2018-12-16T06:48:18.992653761Z"}

var freeRotation1 = {"freeChampionIds":[13,34,35,44,51,60,68,80,84,99,126,150,161,202],"freeChampionIdsForNewPlayers":[18,81,92,141,37,238,19,45,25,64],"maxNewPlayerLevel":10,"timestamp":"2018-12-16T08:47:42.219343512Z"}

var champion1 = {"version":"8.24.1","id":"Aatrox","key":"266","name":"Aatrox","title":"the Darkin Blade","blurb":"Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...","info":{"attack":8,"defense":4,"magic":3,"difficulty":4},"image":{"full":"Aatrox.png","sprite":"champion0.png","group":"champion","x":0,"y":0,"w":48,"h":48}}

const API = 'http://localhost:8000/v1/champion/bykey?key=';

const styles = theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 140
    },
    control: {
      padding: theme.spacing.unit * 2
    }
  });

class App extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          hits: [],
        };
      }

    componentDidMount() {
        var self = this;
        freeRotation1.freeChampionIds.map((champKey) => 
        {

            fetch(API + champKey)
            .then((response) => {
                if(response.ok) {
                  return response.json();
                } else {
                  throw new Error('Server response wasn\'t OK');
                }
              })
            .then((json) => {
                var newHits = self.state.hits.slice();
                newHits.push(json);
    
                self.setState({
                    hits: newHits
                });
            })
        });
    }

    state = {
        spacing: "16"
      };

  render() {
    const { hits } = this.state;

    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <div className="App">
          {/* <Header title="Summoner" />
          <Content summoner={summoner1} /> */}
          {/* <Header title="Free Champions Rotation" /> */}
          <NavigationBar />

          {/* {hits.map((hit) => //{
            <li key={hit.id}>
                <Champion champion={hit} />
            </li>
          //}
          )} */}

          <Grid container className="grid" spacing={25}>
        <Grid item xs={12}>
          <Grid
            container
            className="demo"
            justify="center"
            spacing={Number(spacing)}
          >
            {hits.map(value => (
              <Grid key={value} item>
                <Paper className="paper">
                    <Champion champion={value} />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

          
      </div>
    );
  }

}

export default App;
