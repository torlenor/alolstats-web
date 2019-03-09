import React, {Component} from 'react';

import ChampionStats from "./ChampionPlotRoleDistribution"
import ChampionHistoryWin from "./ChampionPlotWinRateAsFunctionOfPatch"
import ChampionHistoryKDA from "./ChampionPlotKDAAsFunctionOfPatch"
import ChampionHistoryPickBan from "./ChampionPlotPickBanRateAsFunctionOfPatch"
import ChampionPlotDamagePerType from "./ChampionPlotDamagePerType"
import ChampionTextStatistics from './ChampionTextStatistics';
import ChampionTextStatisticsAdditional from './ChampionTextStatisticsAdditional';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';

import Typography from '@material-ui/core/Typography';

import Progress from './Progress'

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/stats/champion/byid?id=`;
const VERSIONPARAMETER = `&gameversion=`;
const LEAGUEPARAMETER = `&tier=`;

const CHAMPION_HISTORY_API = `${API_URL}/v1/stats/championhistory/byid?id=`;

class Champion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            didMountChampion: false,
            errorChampion: false,
            championstats: null,

            didMountChampionHistory: false,
            errorChampionHistory: false,
            championHistoryData: null,

            parentProps: props,
        };
    }

    fetchChampion(props) {
        this.setState( {parentProps: props});
        let champion = props.match.params.champion;
        let version = "";
        if (props.parentProps.selectedVersion !== undefined) {
            version = props.parentProps.selectedVersion;
        }

        let league = "";
        if (props.parentProps.selectedLeague !== undefined) {
            league = props.parentProps.selectedLeague.toUpperCase();
        }
        
        fetch(API + champion + VERSIONPARAMETER + version + LEAGUEPARAMETER + league).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({errorChampion: true});
                return null;
            }
        }).then(data => {
            if (data !== null) {
                this.setState({championstats: data, errorChampion: false, didMountChampion: true});
            } else {
                this.setState({errorChampion: true, didMountChampion: true});
            }
        }).catch(error => {
            this.setState({errorChampion: true, didMountChampion: true})
        });
    }

    fetchChampionHistory(props) {
        let champion = props.match.params.champion;
        let version = "";
        if (props.parentProps.selectedVersion !== undefined) {
            version = props.parentProps.selectedVersion;
        }

        let league = "";
        if (props.parentProps.selectedLeague !== undefined) {
            league = props.parentProps.selectedLeague.toUpperCase();
        }
        
        fetch(CHAMPION_HISTORY_API + champion + VERSIONPARAMETER + version + LEAGUEPARAMETER + league).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({errorChampionHistory: true});
                return null;
            }
        }).then(data => {
            if (data !== null) {
                this.setState({championHistoryData: data, errorChampionHistory: false, didMountChampionHistory: true});
            } else {
                this.setState({errorChampionHistory: true, didMountChampionHistory: true});
            }
        }).catch(error => {
            this.setState({errorChampionHistory: true, didMountChampionHistory: true})
        });
    }

    componentWillReceiveProps(props) {
        this.fetchChampion(props);
        this.fetchChampionHistory(props);
      }

    componentDidMount() {
        this.fetchChampion(this.props);
        this.fetchChampionHistory(this.props);
    }

    render() {
        const {championstats, championHistoryData} = this.state;

        let page;

        if (this.state.didMountChampion === false || this.state.didMountHistory === false) {
            page = <div className="content">
                <Typography variant="h4" gutterBottom component="h2">
                    {this.props.match.params.champion}
                </Typography>
                <div>
                    <Progress text="Loading Champion Statistics..."/>
                </div>
            </div>;
        } else if (this.state.errorChampion || this.state.errorChampionHistory || championstats === null || championHistoryData === null || championstats === undefined || championHistoryData === undefined) {
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
            <Grid container layout={"row"} spacing={24} justify="center">
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper>
                        <ChampionTextStatistics championStats={championstats}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper style={{ height: 356, padding: 12 }}>
                        <ChampionStats championStats={championstats}/>
                    </Paper>
                    <Paper style={{ height: 356, padding: 12 }}>
                        <ChampionPlotDamagePerType championStats={championstats}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper style={{ height: 356, padding: 12 }}>
                        <ChampionHistoryWin championHistoryData={championHistoryData}/>
                    </Paper>
                    <Paper style={{ height: 356, padding: 12 }}>
                        <ChampionHistoryPickBan championHistoryData={championHistoryData}/>
                    </Paper>
                </Grid>
                {championstats.roles !== null ? championstats.roles.map(value => (
                    <Grid container spacing={24} justify="center" key={value+'container'}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={value+'stats'}>
                        <Paper>
                            <ChampionTextStatistics championStats={championstats.statsperrole[value]} role={value}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={value+'plot'}>
                        <Paper style={{ height: 310, padding: 12 }}>
                            <ChampionHistoryWin championHistoryData={championHistoryData.historyperrole[value]} role={value} height={280}/>
                        </Paper>
                        {/* <Paper style={{ height: 310, padding: 12 }}>
                            <ChampionHistoryKDA championHistoryData={championHistoryData.historyperrole[value]} role={value} height={280}/>
                        </Paper> */}
                    </Grid>
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

