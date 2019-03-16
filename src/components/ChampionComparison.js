import React, {Component} from 'react';

import ChampionComparisonTextStatistics from './ChampionComparisonTextStatistics';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const DEFAULTGAMEVERSION = "9.4"

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/stats/champion/byid?id=`;
const VERSIONPARAMETER = `&gameversion=`;

class ChampionComparison extends Component {

    constructor(props) {
        super(props);

        this.state = {
            didMount1: false,
            championstats1: null,
            didMount2: false,
            championstats2: null,
            error: false
        };
    }

    fetchChampion(champNumber, props) {
        console.log(props);
        let champion = "";
        let version = "";
        if (props.parentProps.selectedVersion !== undefined) {
            version = props.parentProps.selectedVersion;
        } else {
            version = DEFAULTGAMEVERSION;
        }

        if (champNumber === 1) {
            champion = props.match.params.champion1;
        } else {
            champion = props.match.params.champion2;
        }
        
        fetch(API + champion + VERSIONPARAMETER + version).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {
            if (data !== null) {
                if (champNumber === 1) {
                    this.setState({championstats1: data, error: false, didMount1: true});
                } else {
                    this.setState({championstats2: data, error: false, didMount2: true});
                }
            } else {
                if (champNumber === 1) {
                    this.setState({error: true, didMount1: true});
                } else {
                    this.setState({error: true, didMount2: true});
                }
            }
        }).catch(error => {
            if (champNumber === 1) {
                this.setState({error: true, didMount1: true});
            } else {
                this.setState({error: true, didMount2: true});
            }
        });
    }

    componentWillReceiveProps(props) {
        this.fetchChampion(1, props);
        this.fetchChampion(2, props);
      }

    componentDidMount() {
        this.fetchChampion(1, this.props);
        this.fetchChampion(2, this.props);
    }
      

    render() {
        const {championstats1, championstats2} = this.state;

        let page;

        if (this.state.didMount1 === false || this.state.didMount2 === false) {
            page = <div className="content">
                <Typography variant="h5" gutterBottom component="h3">
                Loading Champion informations for comparison...<br></br>
                    Please wait...
                </Typography>
            </div>;
        } else if (this.state.error || championstats1 === null || championstats2 === null) {
            page = <div className="content">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champion Stats, please try again later!
                    </Typography>
            </div>;
        } else {
            page = <div className="Champion">
            <Typography variant="h4" gutterBottom component="h2">
                {championstats1.championname} vs. {championstats2.championname}
            </Typography>
            <div style={{ padding: 12 }}>
            <Grid container spacing={24} justify="center">
                <Grid item xs>
                    <Paper>
                        <ChampionComparisonTextStatistics championStats1={championstats1} championStats2={championstats2}/>
                    </Paper>
                </Grid>
            </Grid>
            </div>

        </div>;
        }


        return (
            <div>
                {page}
            </div>
        )
    }
}

export default ChampionComparison;

