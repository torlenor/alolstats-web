import PropTypes from 'prop-types';

import React, {Component} from 'react';

import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Plot from 'react-plotly.js';

import { getPlotlyThemeDefault, getPlotlyConfigDefault, getPlotlyColors } from '../../theme/PlotlyTheme';

const PLOTLY_CONFIG = getPlotlyConfigDefault();

class ChampionStats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            championstats: null,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({championstats: props.championStats, didMount: true});
    }

    componentDidMount() {
        this.setState({championstats: this.props.championStats, didMount: true});
    }

    preparePlotData() {
        const { theme } = this.props;
        const { championstats } = this.state;

        var trueColor = theme.palette.primary.main;
        var magicColor = theme.palette.primary.main;
        var physicalColor = theme.palette.primary.main;
        const mainColor = getPlotlyColors.red;
        if (championstats.average_truedamagedealt > championstats.average_magicdamagedealt && championstats.average_truedamagedealt > championstats.average_physicaldamagedealt) {
            trueColor = mainColor;
        } else if (championstats.average_magicdamagedealt > championstats.average_physicaldamagedealt) {
            magicColor = mainColor;
        } else {
            physicalColor = mainColor;
        }
        return {
            x: ["True", "Magic", "Physical"],
            y: [championstats.average_truedamagedealt, championstats.average_magicdamagedealt, championstats.average_physicaldamagedealt],
            type: "bar",
            marker:{
                color: [trueColor, magicColor, physicalColor]
              },
          };
    }

    render() {
        const { theme } = this.props;

        var height = 320;
        if ( this.props.height !== undefined ) {
            height = this.props.height;
        }

        if (this.state.didMount === false) {
            return <div>
                    <Typography>
                        Preparing Plot...
                    </Typography>
                </div>;
        } else {
            const defaultTheme = getPlotlyThemeDefault(theme);

            const layout = {
                ...defaultTheme,
                barmode: 'stack',
                displayModeBar: false,
                xaxis: {
                    ...defaultTheme.xaxis,
                    title: {
                        text: 'Damage Type',
                    },
                    fixedrange: true,
                },
                yaxis: {
                    ...defaultTheme.yaxis,
                    title: {
                        text: 'Damage',
                    },
                    fixedrange: true,
                },
            };

            const data = [this.preparePlotData()];

            return <div>
                    <Typography variant="h6" gutterBottom>
                        Damage Per Type
                    </Typography>
                    <Plot useResizeHandler style={{ width: '100%', height: height }} data={data} layout={layout} config={PLOTLY_CONFIG}/>
            </div>;
        }
    }
}

ChampionStats.propTypes = {
    theme: PropTypes.object.isRequired,
};

export default withTheme()(ChampionStats);
