import React, {Component} from 'react';

import "./Summoner.css"

import League from "./League"

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/summoner/byname?name=`;

class Summoner extends Component {
    constructor(props) {
        super(props);

        this.state = {
            summoner: {},
            leagues: [],
            error: false
        };
    }

    componentDidMount() {
        const {summoner} = this.props;
        fetch(API + summoner)
            .then(response => {
                if (response.status === 200) {
                    response.json();
                } else {
                    this.setState({error: true});
                    return {};
                    }
                }
            )
            .then(data => this.setState({summoner: data, leagues: data.leagues}))
            .catch(this.setState({error: true}));
    }

    render() {
        const {summoner, leagues} = this.state;

        if (typeof leagues !== 'undefined') {
            console.log(leagues[0])
        }

        let page;

        if (this.state.error) {
            page = <div className="content">
                <div className="Summoner">
                Ooops, something bad happened!<br></br><br></br>Error receiving Summoner, please try again later!
                </div>
            </div>;
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
                        {summoner.name}
                    </span>
                </div>

                <div>
                    <span className="summonerLevel">
                        {summoner.summonerLevel}
                    </span>
                </div>

                <div>
                    <span className="summonerTimestamp">
                        Last updated: {summoner.timestamp}
                    </span>
                </div>

                <ul>
                    {leagues.map(hit => <League league={hit}/>)}
                </ul>

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