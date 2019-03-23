import React, {Component} from 'react';

// CSS
import './FreeRotation.css';

// Material-UI Components
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

// ALoLStats Components
import ChampionCard from './ChampionCard.js'
import Progress from './Progress'

import {constants as themeConstants } from '../theme/ConstantsTheme';

// API
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const FreeRotationAPI = `${API_URL}/v1/champion-rotations`;
const API = `${API_URL}/v1/champion/bykey?key=`;

const section = {
    height: "100%",
};

export default class FreeRotation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            hits: null,
            error: false
        };
    }

    componentDidMount() {
        var self = this;

        fetch(FreeRotationAPI).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {

            if (data.freeChampionIds === null) {
                this.setState({error: true, didMount: true})
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
                        let newHits;
                        if (self.state.hits === null) {
                            newHits = [];
                            newHits.push(json);
                        } else {
                            newHits = self
                                .state
                                .hits
                                .slice();
                            newHits.push(json);
                        }
                        self.setState({hits: newHits.sort(function (a, b) {
                            return ('' + a.name).localeCompare(b.name);
                          })});
                        self.setState({didMount: true});
                    })
                });
        }).catch(error => {
            this.setState({error: true, didMount: true});
            console.log(error);
        });
    }

    render() {
        const {hits} = this.state;

        let page;

        if (this.state.didMount === false) {
            page =  <div>
                        <Progress text="Loading Free Rotation..."/>
                    </div>
        } else if (this.state.error || hits === null) {
            page = <div className="FreeRotation">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Free Rotation, please try again later!
                    </Typography>
                </div>
        } else {
            document.title = "Free Rotation - fuu.la";
            page = <div className="FreeRotation">
                <Grid container className="FreeRotationCards" justify="center" spacing={themeConstants.padding}>
                    {hits.map(value => (
                        <Grid key={value.key} item>
                            <div style={section}>
                                <ChampionCard champion={value}/>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        }

        return ( page );
    }
}
