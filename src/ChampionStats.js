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
            championstats: {}
        };
    }

    componentDidMount() {
        const {champion} = this.props;
        fetch(API + champion + VERSION)
            .then(response => response.json())
            .then(data => this.setState({championstats: data}))
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const {championstats} = this.state;

        console.log(championstats)

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

        return (
            <div className="content">

                <div className="ChampionStats">

                    <Plot data={data} layout={layout}/>

                </div>
            </div>
        )
    }
}

export default ChampionStats;