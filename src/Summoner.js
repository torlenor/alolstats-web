import React, {Component} from 'react';

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import "./Summoner.css"

import League from "./League"

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/summoner/byname?name=`;

class Summoner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            summoner: null,
            leagues: null,
            error: false
        };
    }

    componentDidMount() {
        const {summoner} = this.props;
        fetch(API + summoner).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {
            if (data !== null) {
                this.setState({summoner: data, leagues: data.leagues, error: false, didMount: true});
            } else {
                this.setState({error: true, didMount: true});
            }
        }).catch(error => {
            this.setState({error: true, didMount: true})
        });
    }

    render() {
        const {summoner, leagues} = this.state;

        let page;

        if (this.state.didMount === false) {
            page = <div className="content">
                <div className="Summoner">
                    Loading Summoner informations...<br></br>
                    Please wait...
                </div>
            </div>;
        } else if (this.state.error || summoner === null || leagues === null) {
            page = <div className="content">
                <div className="Summoner">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Summoner, please try again later!
                </div>
            </div>;
        } else if (leagues.length !== 0){
            page = <div className="content">
                <div className="Summoner">

                    <div className="profileIcon">
                        <img
                            alt=''
                            style={{
                            width: 100,
                            height: 100
                        }}
                            resizemode="strech"
                            src={`http://ddragon.leagueoflegends.com/cdn/8.24.1/img/profileicon/${summoner.profileIconId}.png`}/>
                    </div>

                    <div>
                        <span className="summonerName">
                            <b>{summoner.name}</b> ({summoner.summonerLevel})
                        </span>
                    </div>

                    <div>
                        <Grid container className="demo" justify="center" spacing={16}>
                            {leagues.LeaguePosition.map(hit => (
                                <Grid key={hit.queueType} item>
                                    <Paper className="paper">
                                        <League key={hit.rank} league={hit}/>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </div>

                    <div>
                        <span className="summonerTimestamp">
                            Last updated: {summoner.timestamp}
                        </span>
                    </div>
                </div>
            </div>
        } else {
            page = <div className="content">
            <div className="Summoner">

                <div className="profileIcon">
                    <img
                        alt=''
                        style={{
                        width: 100,
                        height: 100
                    }}
                        resizemode="strech"
                        src={`http://ddragon.leagueoflegends.com/cdn/8.24.1/img/profileicon/${summoner.profileIconId}.png`}/>
                </div>

                <div>
                    <span className="summonerName">
                        <b>{summoner.name}</b> ({summoner.summonerLevel})
                    </span>
                </div>

                <div>
                    Unranked
                </div>

                <div>
                    <span className="summonerTimestamp">
                        Last updated: {summoner.timestamp}
                    </span>
                </div>
            </div>
        </div>
        }

        return (
            <div>
                {page}
            </div>
        )
    }
}

export default Summoner;