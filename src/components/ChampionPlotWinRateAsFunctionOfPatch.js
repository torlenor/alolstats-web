import React, {Component} from 'react';

import "./ChampionPlotWinRateAsFunctionOfPatch.css"

import Plot from 'react-plotly.js';

import Typography from '@material-ui/core/Typography';

class ChampionPlotWinRateAsFunctionOfPatch extends Component {
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
            // var data = championstats.lanerolepercentageplotly;

            var winRate = {
                x: ["9.4", "9.3", "9.2", "9.1", "8.24"],
                y: [45, 51, 52, 51.3],
                type: 'scatter',
                mode: 'lines+markers',
                'line': {
                    'color': 'rgb(0, 51, 204)'
                },
                'marker': {
                    'color': 'rgb(0, 51, 204)'
                },
                name: 'Win Rate'
              };

              var banRate = {
                x: ["9.4", "9.3", "9.2", "9.1", "8.24"],
                y: [10, 15, 13, 17],
                type: 'scatter',
                mode: 'lines+markers',
                'line': {
                    'color': 'rgb(204, 0, 0)'
                },
                'marker': {
                    'color': 'rgb(204, 0, 0)'
                },
                name: 'Ban Rate'
              };

            var layout = {
                autosize: true,
                xaxis: {
                    type: 'category',
                    title: {
                        text: 'Game Version'
                    },
                    categoryorder: 'array',
                    categoryarray: winRate.x,
                },
                yaxis: {
                    title: {
                        text: 'Win/Ban Rate [%]',
                    },
                    range: [0, 100]
                },
            };

            var data = [winRate, banRate];

            page = <div className="ChampionPlotWinRateAsFunctionOfPatch">
                <div className="ChampionPlotWinRateAsFunctionOfPatch">
                    <Typography variant="h5" gutterBottom component="h3">
                        Win Rate / Ban Rate per Game Version
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

export default ChampionPlotWinRateAsFunctionOfPatch;