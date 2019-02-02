import React, {Component} from 'react';

import './Champions.css';

import ChampionCard from './ChampionCard.js'

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Typography from '@material-ui/core/Typography';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const ChampionsAPI = `${API_URL}/v1/champions`;

export default class Champions extends Component {
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

        fetch(ChampionsAPI).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {
            console.log(data);
            let newHits = [];
            for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            newHits.push(data[key]);
                        }
                    }
                self.setState({hits: newHits.sort(function (a, b) {
                    return ('' + a.name).localeCompare(b.name);
                  })});
                self.setState({didMount: true});
        }).catch(error => {
            this.setState({error: true, didMount: true});
            console.log(error);
        });
    }

    render() {
        const {hits} = this.state;

        let page;

        if (this.state.didMount === false) {
            page = <div className="Champions">
                <Typography variant="h5" gutterBottom component="h3">
                Loading Champions...<br></br>
                    Please wait...
                </Typography>
            </div>;
        } else if (this.state.error || hits === null) {
            page = <div className="Champions">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champions, please try again later!
                    </Typography>
                </div>
        } else {
            page = <div className="Champions">
                <Grid container className="demo" justify="center" spacing={16}>
                    {hits.map(value => (
                        <Grid key={value.key} item>
                            <Paper className="paper">
                                <ChampionCard champion={value}/>
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
