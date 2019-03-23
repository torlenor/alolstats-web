import PropTypes from 'prop-types';

import React, {Component} from 'react';

import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Plot from 'react-plotly.js';

import { getPlotlyThemeDefault, getPlotlyConfigDefault } from '../../theme/PlotlyTheme';

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

    render() {
        const { theme } = this.props;
        const { championstats } = this.state;

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
            const data = championstats.lanerolepercentageplotly;

            const defaultTheme = getPlotlyThemeDefault(theme);

            var layout = {
                ...defaultTheme,
                barmode: 'stack',
                xaxis: {
                    ...defaultTheme.xaxis,
                    title: {
                        text: 'Lane',
                    },
                    fixedrange: true,
                },
                yaxis: {
                    ...defaultTheme.yaxis,
                    title: {
                        text: 'Percentage [%]',
                    },
                    fixedrange: true,
                    range: [0, 100]
                },
            };

            return <div>
                    <Typography variant="h6">
                        Role Distribution
                    </Typography>
                    <Plot useResizeHandler style={{ minWidth: 300, width: '100%', height: height }} data={data} layout={layout} config={PLOTLY_CONFIG} />
            </div>;
        }
    }
}

ChampionStats.propTypes = {
    theme: PropTypes.object.isRequired,
  };

export default withTheme()(ChampionStats);