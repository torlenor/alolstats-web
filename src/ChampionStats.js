import React, {Component} from 'react';
import Plot from 'react-plotly.js';

import "./ChampionStats.css"

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/stats/champion/byname?name=`;
const GAMEVERSION = "9.1"
const VERSION = `&gameversion=${GAMEVERSION}`;

class ChampionStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            championstats: null,
            error: false
        };
    }

    componentDidMount() {
        const {champion} = this.props;
        fetch(API + champion + VERSION).then(response => {
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

    render() {
        const {championstats} = this.state;

        console.log(championstats)

        let page;

        if (this.state.didMount === false) {
            page = <div className="content">
                <div className="ChampionStats">
                    Loading Champion informations...<br></br>
                    Please wait...
                </div>
            </div>;
        } else if (this.state.error || championstats === null) {
            page = <div className="content">
                <div className="ChampionStats">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champion Stats, please try again later!
                </div>
            </div>;
        } else {
            var data = championstats.lanerolepercentageplotly;

            // data[0].text = ['WP: Text A', 'WP: Text B', 'WP: Text C', 'WP: Text D', 'WP: Text E'];
            // data[0].textposition = 'auto';

            // data[1].text = ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'];
            // data[1].textposition = 'auto';

            // data[2].text = ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'];
            // data[2].textposition = 'auto';

            // data[3].text = ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'];
            // data[3].textposition = 'auto';

            console.log(data);

            var layout = {
                barmode: 'stack',
                width: 800,
                height: 600,
                xaxis: {
                    title: {
                        text: 'Lane'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Percentage [%]',
                    },
                    range: [0, 100]
                },
                title: `Champion Role Distribution for <b>${championstats.championname}</b>`
            };

            page = <div className="content">
                <div className="ChampionStats">
                    <div>
                        <span className="ChampionStatsInformations">
                            Only unranked and ranked PvP games on Summoners Rift with game version {GAMEVERSION} are
                            considered - {championstats.samplesize} total games analyzed
                        </span>
                    </div>
                    <Plot data={data} layout={layout}/>
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

export default ChampionStats;