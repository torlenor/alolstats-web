import React, {Component} from 'react';

import "./ChampionPlotDamagePerType.css"

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
            var trueColor = 'rgba(204,204,204,1)'
            var magicColor = 'rgba(204,204,204,1)'
            var physicalColor = 'rgba(204,204,204,1)'
            if (championstats.average_truedamagedealt > championstats.average_magicdamagedealt && championstats.average_truedamagedealt > championstats.average_physicaldamagedealt) {
                trueColor = 'rgba(222,45,38,0.8)';
            } else if (championstats.average_magicdamagedealt > championstats.average_physicaldamagedealt) {
                magicColor = 'rgba(222,45,38,0.8)';
            } else {
                physicalColor = 'rgba(222,45,38,0.8)';
            }
            var damageData = {
                x: ["True", "Magic", "Physical"],
                y: [championstats.average_truedamagedealt, championstats.average_magicdamagedealt, championstats.average_physicaldamagedealt],
                type: "bar",
                marker:{
                    color: [trueColor, magicColor, physicalColor]
                  },
              };

            const layout = {
                barmode: 'stack',
                autosize: true,
                margin: {
                    l: 60,
                    r: 20,
                    t: 20,
                    b: 60,
                    autoexpand: false,
                },
                displayModeBar: false,
                xaxis: {
                    title: {
                        text: 'Damage Type'
                    },
                    fixedrange: true,
                },
                yaxis: {
                    title: {
                        text: 'Damage',
                    },
                    fixedrange: true,
                },
            };

            const config={'displayModeBar': false};

            const data = [damageData];

            page = <div className="ChampionPlotDamagePerType">
                <div className="ChampionPlotDamagePerType">
                    <Typography variant="h6" gutterBottom component="h4">
                        Damage Per Type
                    </Typography>
                    </div>
                    <Plot useResizeHandler style={{ width: '100%', height: '300px' }} data={data} layout={layout} config={config}/>
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