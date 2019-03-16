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

import ChampionInfo from './ChampionInfo';

// API
import { fetchChampion } from "../api/FetchChampion";
import { fetchChampionHistory } from "../api/FetchChampionHistory";
import { fetchChampionInfo } from "../api/FetchChampionInfo";

const PADDING = 12;

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

            fetchChampionInfoDone: false,
            fetchChampionInfoData: null,
            fetchChampionInfoError: false,

            parentProps: props,
        };
    }

    getChampionInfo(props) {
        let champion = props.match.params.champion;
        const setState = this.setState.bind(this);
        fetchChampionInfo(champion, setState);
    }

    getChampion(props) {
        let champion = props.match.params.champion;
        if (props.parentProps.selectedVersion !== undefined && props.parentProps.selectedLeague !== undefined) {
            const version = props.parentProps.selectedVersion;
            const league = props.parentProps.selectedLeague.toUpperCase();
            const setState = this.setState.bind(this);
            fetchChampion(champion, version, league, setState);
        }
    }

    getChampionHistory(props) {
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
        this.getChampionInfo(props);
        this.getChampion(props);
        this.getChampionHistory(props);
      }

    componentDidMount() {
        this.setState( {parentProps: this.props});
        this.getChampionInfo(this.props);
        this.getChampion(this.props);
        this.getChampionHistory(this.props);
    }

    render() {
        const {fetchChampionData, fetchChampionError, fetchChampionDone,
               fetchChampionHistoryData, fetchChampionHistoryError, fetchChampionHistoryDone,
               fetchChampionInfoData, fetchChampionInfoError, fetchChampionInfoDone } = this.state;

        let page;

        if ( fetchChampionDone === false || fetchChampionHistoryDone === false || fetchChampionInfoDone === false ) {
            page = <div className="content">
                <div>
                    <Progress text="Loading Champion Statistics..."/>
                </div>
            </div>;
        } else if ( fetchChampionError || fetchChampionHistoryError || fetchChampionInfoError ) {
            page = <div className="content">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champion Stats, please try again later!
                    </Typography>
            </div>;
        } else {
            document.title = fetchChampionData.championname + " - fuu.la";
            page = <div className="Champion">
            <div style={{ padding: PADDING }}>
                <ChampionInfo champion={fetchChampionInfoData}/>
            </div>
            <div style={{ padding: PADDING }}>
            <Grid container layout={"row"} spacing={24} justify="center">
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper>
                        <ChampionTextStatistics championStats={fetchChampionData}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper style={{ height: 356, padding: PADDING }}>
                        <ChampionStats championStats={fetchChampionData}/>
                    </Paper>
                    <Paper style={{ height: 356, padding: PADDING }}>
                        <ChampionPlotDamagePerType championStats={fetchChampionData}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper style={{ height: 356, padding: PADDING }}>
                        <ChampionHistoryWin championHistoryData={fetchChampionHistoryData} height={300}/>
                    </Paper>
                    <Paper style={{ height: 356, padding: PADDING }}>
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
                        <Paper style={{ height: 310, padding: PADDING }}>
                            <ChampionHistoryWin championHistoryData={fetchChampionHistoryData.historyperrole[value]} role={value} height={280}/>
                        </Paper>
                        <Paper style={{ height: 310, padding: PADDING }}>
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

