import React, {Component} from 'react';
import Plot from 'react-plotly.js';

import "./ChampionStats.css"

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/stats/champion/byname?name=`;
const VERSION = "&gameversion=8.24";

class ChampionStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            championstats: {},
            error: false
        };
    }

    componentDidMount() {
        const {champion} = this.props;
        fetch(API + champion + VERSION).then(response => {
            if (response.status === 200) {
                response.json();
            } else {
                this.setState({error: true});
                return {};
                }
            })
            .then(data => this.setState({championstats: data}))
            .catch(function (error) {
                console.log(error);
                this.setState({error: true});
            });
    }

    render() {
        const {championstats} = this.state;

        console.log(championstats)

        let page;

        if (this.state.error) {
            page = <div className="content">
                <div className="Summoner">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champion Stats, please try again later!
                </div>
            </div>;
        } else {
            var data = championstats.lanerolepercentageplotly;
            var layout = {
                barmode: 'stack',
                width: 800,
                height: 600,
                yaxis: {
                    range: [0, 100]
                },
                title: `<b>${championstats.championname}</b> Most Played Lanes/Roles`
            };

            page = <div className="ChampionStats">
                <Plot data={data} layout={layout}/>
            </div>
        }

        return (
            <div>
                {page}
            </div>
        )
    }
}

export default ChampionStats;