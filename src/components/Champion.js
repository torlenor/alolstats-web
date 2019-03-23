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

import { constants as themeConstants } from "../theme/ConstantsTheme";

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
        if (props.parentProps.selectedVersion !== undefined && props.parentProps.selectedLeague !== undefined) {
            const version = props.parentProps.selectedVersion;
            const league = props.parentProps.selectedLeague.toUpperCase();
            const setState = this.setState.bind(this);
            fetchChampionInfo(champion, version, league, setState);
        }
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
                <Typography variant="h5" gutterBottom>
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champion Stats, please try again later!
                    </Typography>
            </div>;
        } else {
            document.title = fetchChampionData.championname + " - fuu.la";
            page = <div className="Champion" style={{marginLeft: themeConstants.padding/2, marginRight: themeConstants.padding/2 + themeConstants.padding/4}}>
            <div style={{ padding: themeConstants.padding }}>
                <ChampionInfo champion={fetchChampionInfoData}/>
            </div>
            <div style={{ padding: themeConstants.padding }}>
            <Grid container layout={"row"} spacing={themeConstants.padding*2} justify="center">
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper style={{ padding: themeConstants.padding }}>
                        <ChampionTextStatistics championStats={fetchChampionData}/>
                    </Paper>
                </Grid>
                {/* COLUMN */}
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper style={{ height: 770/2 - themeConstants.padding, padding: themeConstants.padding }}>
                        <ChampionStats championStats={fetchChampionData} height={320}/>
                    </Paper>
                    <div style={ {padding: themeConstants.padding }} />
                    <Paper style={{ height: 770/2 - themeConstants.padding, padding: themeConstants.padding }}>
                        <ChampionPlotDamagePerType championStats={fetchChampionData} height={320}/>
                    </Paper>
                </Grid>
                {/* COLUMN */}
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                    <Paper style={{ height: 770/2 - themeConstants.padding, padding: themeConstants.padding }}>
                        <ChampionHistoryWin championHistoryData={fetchChampionHistoryData} height={320}/>
                    </Paper>
                    <div style={ {padding: themeConstants.padding }} />
                    <Paper style={{ height: 770/2 - themeConstants.padding, padding: themeConstants.padding }}>
                        <ChampionHistoryPickBan championHistoryData={fetchChampionHistoryData} height={320}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                {fetchChampionData.roles !== null ? fetchChampionData.roles.map(value => (
                    <Grid container spacing={themeConstants.padding*2} justify="center" key={value+'container'}>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={value+'stats'}>
                        <Paper style={{ padding: themeConstants.padding }}>
                            <ChampionTextStatistics championStats={fetchChampionData.statsperrole[value]} role={value}/>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={value+'plot'}>
                        <Paper style={{ height: 674/2 - themeConstants.padding, padding: themeConstants.padding }}>
                            <ChampionHistoryWin championHistoryData={fetchChampionHistoryData.historyperrole[value]} role={value} height={280}/>
                        </Paper>
                        <div style={ {padding: themeConstants.padding }} key={value+'div'} />
                        <Paper style={{ height: 674/2 - themeConstants.padding, padding: themeConstants.padding }}>
                            <ChampionHistoryKDA championHistoryData={fetchChampionHistoryData.historyperrole[value]} role={value} height={280}/>
                        </Paper>
                    </Grid>
                    </Grid>
                )) : <div></div>}
                </Grid>
                <Grid item xs>
                    <Paper style={{ padding: themeConstants.padding }}>
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

