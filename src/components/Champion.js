import React, {Component} from 'react';

import ChampionStats from "./ChampionPlotRoleDistribution"
// import ChampionPlotWinRateAsFunctionOfPatch from "./ChampionPlotWinRateAsFunctionOfPatch"
import ChampionPlotDamagePerType from "./ChampionPlotDamagePerType"
import ChampionTextStatistics from './ChampionTextStatistics';
import ChampionTextStatisticsAdditional from './ChampionTextStatisticsAdditional';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Progress from './Progress'

const DEFAULTGAMEVERSION = "9.4";
const DEFAULTLEAGUE = "ALL";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/stats/champion/byid?id=`;
const VERSIONPARAMETER = `&gameversion=`;
const LEAGUEPARAMETER = `&tier=`;

class Champion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            championstats: null,
            error: false
        };
    }

    fetchChampion(props) {
        let champion = props.match.params.champion;
        let version = DEFAULTGAMEVERSION;
        if (props.parentProps.selectedVersion !== undefined) {
            version = props.parentProps.selectedVersion;
        }

        let league = DEFAULTLEAGUE;
        if (props.parentProps.selectedLeague !== undefined) {
            league = props.parentProps.selectedLeague.toUpperCase();
        }
        
        fetch(API + champion + VERSIONPARAMETER + version + LEAGUEPARAMETER + league).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {
            if (data !== null) {
                this.setState({championstats: data, error: false, didMount: true});
            } else {
                this.setState({error: true, didMount: true});
            }
        }).catch(error => {
            this.setState({error: true, didMount: true})
        });
    }

    componentWillReceiveProps(props) {
        this.fetchChampion(props);
      }

    componentDidMount() {
        this.fetchChampion(this.props);
    }

    render() {
        const {championstats} = this.state;

        let page;

        if (this.state.didMount === false) {
            page = <div className="content">
                <Typography variant="h4" gutterBottom component="h2">
                    {this.props.match.params.champion}
                </Typography>
                <div>
                    <Progress text="Loading Champion Statistics..."/>
                </div>
            </div>;
        } else if (this.state.error || championstats === null) {
            page = <div className="content">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champion Stats, please try again later!
                    </Typography>
            </div>;
        } else {
            page = <div className="Champion">
            <Typography variant="h4" gutterBottom component="h2">
                {championstats.championname}
            </Typography>
            <div style={{ padding: 12 }}>
            <Grid container spacing={24} justify="center">
                <Grid item xs>
                    <Paper>
                        <ChampionTextStatistics championStats={championstats}/>
                    </Paper>
                </Grid>
                <Grid item xs>
                    <Paper>
                        <ChampionStats championStats={championstats}/>
                    </Paper>
                    <Paper>
                        <ChampionPlotDamagePerType championStats={championstats}/>
                    </Paper>
                </Grid>
                {championstats.roles !== null ? championstats.roles.map(value => (
                    <Grid item xs>
                        <Paper>
                            <ChampionTextStatistics championStats={championstats.statsperrole[value]} role={value}/>
                        </Paper>
                    </Grid>
                )) : <div></div>}
                <Grid item xs>
                    <Paper>
                        <ChampionTextStatisticsAdditional championStats={championstats}/>
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

export default Champion;

