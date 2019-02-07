import React, {Component} from 'react';

import "./ChampionPlotRoleDistribution.css"

import Plot from 'react-plotly.js';

import Typography from '@material-ui/core/Typography';

class ChampionStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            championstats: null,
            error: false
        };
    }

    componentWillReceiveProps(props) {
        this.setState({championstats: props.championStats, error: false, didMount: true});
    }

    componentDidMount() {
        this.setState({championstats: this.props.championStats, error: false, didMount: true});
    }

    render() {
        const {championstats} = this.state;

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

            var layout = {
                barmode: 'stack',
                autosize: true,
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
            };

            page = <div className="ChampionStats">
                <div className="ChampionStats">
                    <Typography variant="h5" gutterBottom component="h3">
                        Role Distribution Plot
                    </Typography>
                    <Typography>
                            Only unranked and ranked PvP games on Summoners Rift with game version {championstats.gameversion} are
                            considered - {championstats.samplesize} total games analyzed
                    </Typography>
                    </div>
                    <Plot useResizeHandler style={{ width: '100%', height: '100%' }} data={data} layout={layout}/>
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