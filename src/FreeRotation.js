import React, {Component} from 'react';

import './FreeRotation.css';

import Champion from './Champion.js'

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const FreeRotationAPI = `${API_URL}/v1/champion-rotations`;
const API = `${API_URL}/v1/champion/bykey?key=`;

export default class FreeRotation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hits: [],
            error: false
        };
    }

    componentDidMount() {
        var self = this;

        fetch(FreeRotationAPI)
            .then(response => response.json())
            .then(data => {

                if (data.freeChampionIds === null) {
                    self.setState({error: true})
                    return
                }

                data
                    .freeChampionIds
                    .forEach(function (champKey) {
                        fetch(API + champKey).then((response) => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                throw new Error('Server response wasn\'t OK');
                            }
                        }).then((json) => {
                            var newHits = self
                                .state
                                .hits
                                .slice();
                            newHits.push(json);

                            self.setState({hits: newHits});
                        })
                    });

            })
    }

    render() {
        const {hits} = this.state;

        let page;

        if (this.state.error) {
            page = <div className="FreeRotation">Ooops, something bad happened!<br></br><br></br>Error receiving Free Rotation, please try again later!</div>
        } else {
            page = <div className="FreeRotation">
                <Grid container className="demo" justify="center" spacing={16}>
                    {hits.map(value => (
                        <Grid key={value.key} item>
                            <Paper className="paper">
                                <Champion champion={value}/>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
        }

        return (
            <div>
                <h2>{page}</h2>
            </div>
        );
    }
}
