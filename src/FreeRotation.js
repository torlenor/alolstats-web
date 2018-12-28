import React, { Component } from 'react';

import './App.css';

import Champion from './Champion.js'
import Summoner from './Summoner.js'

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

var freeRotation1 = {"freeChampionIds":[13,34,35,44,51,60,68,80,84,99,126,150,161,202],"freeChampionIdsForNewPlayers":[18,81,92,141,37,238,19,45,25,64],"maxNewPlayerLevel":10,"timestamp":"2018-12-16T08:47:42.219343512Z"}

const FreeRotationAPI = 'http://localhost:8000/v1/champion/bykey?key=';
const API = 'http://localhost:8000/v1/champion/bykey?key=';

export default class FreeRotation extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          hits: [],
        };
      }

    componentDidMount() {
        var self = this;
        freeRotation1.freeChampionIds.forEach(function(champKey)
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
    
  render() {
    const { hits } = this.state;

    return (
        <div className="FreeRotation">
            <Grid container className="grid" spacing={25}>
                <Grid item xs={12}>
                    <Grid
                        container
                        className="demo"
                        justify="center"
                        spacing={10}
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
