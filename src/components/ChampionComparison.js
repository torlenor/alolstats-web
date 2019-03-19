import React, {Component} from 'react';

import ChampionComparisonTextStatistics from './ChampionComparisonTextStatistics';
import ChampionComparisonTextStatisticsBaseStats from './ChampionComparisonTextStatisticsBaseStats';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/stats/champion/byid?id=`;
const VERSIONPARAMETER = `&gameversion=`;
const LEAGUEPARAMETER = `&tier=`;

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class ChampionComparison extends Component {

    constructor(props) {
        super(props);

        this.state = {
            didMount1: false,
            championstats1: null,
            didMount2: false,
            championstats2: null,

            didMountInfo1: false,
            championstatsInfo1: null,
            didMountInfo2: false,
            championstatsInfo2: null,

            error: false,
            errorInfo1: false,
            errorInfo2: false,
        };
    }

    fetchChampion(champNumber, props) {
        let champion = "";
        let version = "";
        if (props.parentProps.selectedVersion !== undefined) {
            version = props.parentProps.selectedVersion;
        } else {
            return;
        }

        let league = "";
        if (props.parentProps.selectedLeague !== undefined) {
            league = props.parentProps.selectedLeague.toUpperCase();
        }

        if (champNumber === 1) {
            champion = props.match.params.champion1;
        } else {
            champion = props.match.params.champion2;
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

    fetchChampionInfo(champNumber, props) {
        const CHAMPION_API = `${API_URL}/v1/champion/byid?id=`;
        const GAMEVERSIONPARAMETER = "gameversion=";
        const LEAGUEPARAMETER = `tier=`;

        let champion = "";
        let version = "";
        if (props.parentProps.selectedVersion !== undefined) {
            version = props.parentProps.selectedVersion;
        } else {
            return;
        }

        let league = "";
        if (props.parentProps.selectedLeague !== undefined) {
            league = props.parentProps.selectedLeague.toUpperCase();
        }

        if (champNumber === 1) {
            champion = props.match.params.champion1;
        } else {
            champion = props.match.params.champion2;
        }

        fetch(CHAMPION_API + champion + "&" + GAMEVERSIONPARAMETER + version + "&" + LEAGUEPARAMETER + league).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                if (champNumber === 1) {
                    this.setState({championstatsInfo1: null, errorInfo1: true, didMountInfo1: true});
                } else {
                    this.setState({championstatsInfo2: null, errorInfo2: true, didMountInfo2: true});
                }
                console.log("Error fetching Champion Info, invalid response:", response);
                return null;
            }
        }).then(data => {
            if (data !== null) {
                if (champNumber === 1) {
                    this.setState({championstatsInfo1: data, errorInfo1: false, didMountInfo1: true});
                } else {
                    this.setState({championstatsInfo2: data, errorInfo2: false, didMountInfo2: true});
                }
            } else {
                if (champNumber === 1) {
                    this.setState({championstatsInfo1: null, errorInfo1: true, didMountInfo1: true});
                } else {
                    this.setState({championstatsInfo2: null, errorInfo2: true, didMountInfo2: true});
                }
                console.log("Error fetching Champion Info, did not get any data");
            }
        }).catch(error => {
            if (champNumber === 1) {
                this.setState({championstatsInfo1: null, errorInfo1: true, didMountInfo1: true});
            } else {
                this.setState({championstatsInfo2: null, errorInfo2: true, didMountInfo2: true});
            }
            console.log("Error fetching Champion Info:", error);
        });
    }

    componentWillReceiveProps(props) {
        this.fetchChampion(1, props);
        this.fetchChampion(2, props);
        this.fetchChampionInfo(1, props);
        this.fetchChampionInfo(2, props);
      }

    componentDidMount() {
        this.fetchChampion(1, this.props);
        this.fetchChampion(2, this.props);
        this.fetchChampionInfo(1, this.props);
        this.fetchChampionInfo(2, this.props);
    }

    render() {
        const {championstats1, championstats2, championstatsInfo1, championstatsInfo2} = this.state;

        let page;

        console.log(this.state);

        if (this.state.didMount1 === false || this.state.didMount2 === false || this.state.didMountInfo1 === false || this.state.didMountInfo2 === false) {
            page = <div className="content">
                <Typography variant="h5" gutterBottom>
                Loading Champion informations for comparison...<br></br>
                    Please wait...
                </Typography>
            </div>;
        } else if (this.state.error || this.state.errorInfo1 || this.state.errorInfo2 || championstats1 === null || championstats2 === null || championstatsInfo1 === null || championstatsInfo2 === null) {
            page = <div className="content">
                <Typography variant="h5" gutterBottom>
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champion Stats, please try again later!
                    </Typography>
            </div>;
        } else {
            document.title = `${championstats1.championname} vs. ${championstats2.championname} - fuu.la`;
            page = <div className="Champion">
            <Typography variant="h4">
                {championstats1.championname} vs. {championstats2.championname}
            </Typography>
            <Typography>
                Overall and matching roles comparison (if any)
            </Typography>
            <div style={{ padding: 12 }}>
            <Grid container spacing={24} justify="center">
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Paper>
                        <ChampionComparisonTextStatistics champName1={championstats1.championname} champName2={championstats2.championname} championStats1={championstats1} championStats2={championstats2}/>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                    <Paper>
                        <ChampionComparisonTextStatisticsBaseStats champName1={championstats1.championname} champName2={championstats2.championname} championBaseStats1={championstatsInfo1} championBaseStats2={championstatsInfo2}/>
                    </Paper>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> */}
                {championstats1.roles !== null && championstats2.roles !== null ? ["Top", "Mid", "Jungle", "Carry", "Support"].map(value => (
                    championstats1.roles.includes(value) && championstats2.roles.includes(value) ? 
                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6} key={value+'stats'}>
                        <Paper>
                            <ChampionComparisonTextStatistics champName1={championstats1.championname} champName2={championstats2.championname} championStats1={championstats1.statsperrole[value]} championStats2={championstats2.statsperrole[value]} role={value}/>
                        </Paper>
                    </Grid>
                    : <div key={value+'stats'}></div>
                )) : <div></div>}
                </Grid>
            {/* </Grid> */}
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

