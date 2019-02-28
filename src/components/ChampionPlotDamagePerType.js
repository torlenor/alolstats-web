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

            var layout = {
                barmode: 'stack',
                autosize: true,
                xaxis: {
                    title: {
                        text: 'Damage Type'
                    }
                },
                yaxis: {
                    title: {
                        text: 'Damage',
                    },
                },
            };

            var data = [damageData];

            page = <div className="ChampionPlotDamagePerType">
                <div className="ChampionPlotDamagePerType">
                    <Typography variant="h5" gutterBottom component="h3">
                        Damage Per Type Plot for Game Version {championstats.gameversion}
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