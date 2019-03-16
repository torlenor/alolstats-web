import React, {Component} from 'react';

import ChampionStats from "./plots/ChampionPlotRoleDistribution";
import ChampionHistoryWin from "./plots/ChampionPlotWinRateAsFunctionOfPatch";
import ChampionHistoryKDA from "./plots/ChampionPlotKDAAsFunctionOfPatch";
import ChampionHistoryPickBan from "./plots/ChampionPlotPickBanRateAsFunctionOfPatch";
import ChampionPlotDamagePerType from "./plots/ChampionPlotDamagePerType";
import ChampionTextStatistics from './ChampionTextStatistics';
import ChampionTextStatisticsAdditional from './ChampionTextStatisticsAdditional';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Progress from './Progress';

// API
import { fetchChampion } from "../api/FetchChampion";
import { fetchChampionHistory } from "../api/FetchChampionHistory";

class Champion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fetchChampionDone: false,
            fetchChampionData: null,
            fetchChampionError: false,

            fetchChampionHistoryDone: false,
            fetchChampionHistoryData: null,
            fetchChampionHistoryError: false,

            parentProps: props,
        };
    }

    getChampionData(props) {
        let champion = props.match.params.champion;
        if (props.parentProps.selectedVersion !== undefined && props.parentProps.selectedLeague !== undefined) {
            const version = props.parentProps.selectedVersion;
            const league = props.parentProps.selectedLeague.toUpperCase();
            const setState = this.setState.bind(this);
            fetchChampion(champion, version, league, setState);
        }
    }

    getChampionHistoryData(props) {
        let champion = props.match.params.champion;
        if (props.parentProps.selectedVersion !== undefined && props.parentProps.selectedLeague !== undefined) {
            const version = props.parentProps.selectedVersion;
            const league = props.parentProps.selectedLeague.toUpperCase();
            const setState = this.setState.bind(this);
            fetchChampionHistory(champion, version, league, setState);
        } 
    }

    componentWillReceiveProps(props) {
        this.setState( {parentProps: props});
        this.getChampionData(props);
        this.getChampionHistoryData(props);
      }

    componentDidMount() {
        this.setState( {parentProps: this.props});
        this.getChampionData(this.props);
        this.getChampionHistoryData(this.props);
    }

    render() {
        const {fetchChampionData, fetchChampionError, fetchChampionDone,
               fetchChampionHistoryData, fetchChampionHistoryError, fetchChampionHistoryDone } = this.state;

        let page;

        if ( fetchChampionDone === false || fetchChampionHistoryDone === false ) {
            page = <div className="content">
                <Typography variant="h4" gutterBottom component="h2">
                    {this.props.match.params.champion}
                </Typography>
                <div>
                    <Progress text="Loading Champion Statistics..."/>
                </div>
            </div>;
        } else if ( fetchChampionError || fetchChampionHistoryError ) {
            page = <div className="content">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champion Stats, please try again later!
                    </Typography>
            </div>;
        } else {
            document.title = fetchChampionData.championname + " - fuu.la";
            page = <div className="Champion">
            <Typography variant="h4" gutterBottom component="h2">
                {fetchChampionData.championname}
            </Typography>
            <div style={{ padding: 12 }}>
            <Grid container layout={"row"} spacing={24} justify="center">
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper>
                        <ChampionTextStatistics championStats={fetchChampionData}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper style={{ height: 356, padding: 12 }}>
                        <ChampionStats championStats={fetchChampionData}/>
                    </Paper>
                    <Paper style={{ height: 356, padding: 12 }}>
                        <ChampionPlotDamagePerType championStats={fetchChampionData}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper style={{ height: 356, padding: 12 }}>
                        <ChampionHistoryWin championHistoryData={fetchChampionHistoryData} height={300}/>
                    </Paper>
                    <Paper style={{ height: 356, padding: 12 }}>
                        <ChampionHistoryPickBan championHistoryData={fetchChampionHistoryData}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {fetchChampionData.roles !== null ? fetchChampionData.roles.map(value => (
                    <Grid container spacing={24} justify="center" key={value+'container'}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={value+'stats'}>
                        <Paper>
                            <ChampionTextStatistics championStats={fetchChampionData.statsperrole[value]} role={value}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={value+'plot'}>
                        <Paper style={{ height: 310, padding: 12 }}>
                            <ChampionHistoryWin championHistoryData={fetchChampionHistoryData.historyperrole[value]} role={value} height={280}/>
                        </Paper>
                        <Paper style={{ height: 310, padding: 12 }}>
                            <ChampionHistoryKDA championHistoryData={fetchChampionHistoryData.historyperrole[value]} role={value} height={280}/>
                        </Paper>
                    </Grid>
                    </Grid>
                )) : <div></div>}
                </Grid>
                <Grid item xs>
                    <Paper>
                        <ChampionTextStatisticsAdditional championStats={fetchChampionData}/>
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

