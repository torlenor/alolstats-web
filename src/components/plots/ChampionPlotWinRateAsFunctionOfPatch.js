import React from 'react';
import Plot from 'react-plotly.js';

import PropTypes from 'prop-types';
import { withTheme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

import { getPlotlyThemeDefault, getPlotlyConfigDefault, getPlotlyColors } from '../../theme/PlotlyTheme';

const MAX_VERSIONS = 5;
const PLOTLY_CONFIG = getPlotlyConfigDefault();

function ChampionHistoryWin(props) {
    
    if (props.championHistoryData === undefined) {
        return <div></div>;
    }
    
    const { championHistoryData, theme } = props;

    var displayRole = "";
    if (props.role !== undefined) {
        displayRole = props.role;
    } else {
        displayRole = "Overall";
    }

    const winRate = 
        {
            x: championHistoryData.versions !== null ? championHistoryData.versions.slice(0, MAX_VERSIONS).reverse() : [],
            y: championHistoryData.winRateHistory !== null ? championHistoryData.winRateHistory.slice(0, MAX_VERSIONS).map(value => value*100).reverse() : [],
            type: 'scatter',
            mode: 'lines+markers',
            'line': {
                'color': getPlotlyColors.green,
                shape: 'spline',
            },
            'marker': {
                'color': getPlotlyColors.green,
            },
            name: 'Win Rate'
            };

    const defaultTheme = getPlotlyThemeDefault(theme);

    const layout = 
        {
            ...defaultTheme,
            xaxis: {
                ...defaultTheme.xaxis,
                type: 'category',
                title: {
                    text: 'Game Version'
                },
                fixedrange: true,
                categoryorder: 'array',
                categoryarray: winRate.x,
            },
            yaxis: {
                ...defaultTheme.yaxis,
                title: {
                    text: 'Win Rate [%]',
                },
                fixedrange: true,
                range: [30, 70]
            },
            'shapes': [
                {
                    'type': 'line',
                    'xref': 'paper',
                    'x0': 0,
                    'y0': 50,
                    'x1': 1,
                    'y1': 50,
                    'line': {
                        'color': theme.palette.common.white,
                        'width': 1,
                    },
                },
            ]
        };

        const plotData = [winRate];

        return <div>
            <Typography variant="h6">
                    {displayRole} Win Rate
            </Typography>
            <Plot useResizeHandler style={{ width: '100%', height: props.height }} data={plotData} layout={layout} config={PLOTLY_CONFIG}/>
        </div>;
}

ChampionHistoryWin.propTypes = {
    theme: PropTypes.object.isRequired,
  };

export default withTheme()(ChampionHistoryWin);
