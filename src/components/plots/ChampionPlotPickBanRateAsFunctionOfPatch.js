import PropTypes from 'prop-types';

import React from 'react';

import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Plot from 'react-plotly.js';

import { getPlotlyThemeDefault, getPlotlyConfigDefault, getPlotlyColors } from '../../theme/PlotlyTheme';

const MAX_VERSIONS = 5;
const PLOTLY_CONFIG = getPlotlyConfigDefault();

function ChampionHistoryPickBan(props) {
    
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

    const versions = championHistoryData.versions.slice(0, MAX_VERSIONS).reverse()

    const pickRate = {
            x: versions,
            y: championHistoryData.pickRateHistory.slice(0, MAX_VERSIONS).map(value => value*100).reverse(),
            type: 'scatter',
            mode: 'lines+markers',
            'line': {
                'color': getPlotlyColors.blue,
                shape: 'spline',
            },
            'marker': {
                'color': getPlotlyColors.blue,
            },
            name: 'Pick Rate'
            };

    const banRate = 
        {
            x: versions,
            y: championHistoryData.banRateHistory.slice(0, MAX_VERSIONS).map(value => value*100).reverse(),
            type: 'scatter',
            mode: 'lines+markers',
            'line': {
                'color': getPlotlyColors.red,
                shape: 'spline',
            },
            'marker': {
                'color': getPlotlyColors.red,
            },
            name: 'Ban Rate'
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
                categoryarray: pickRate.x,
            },
            yaxis: {
                ...defaultTheme.yaxis,
                title: {
                    text: 'Pick/Ban Rate [%]',
                },  
                fixedrange: true,
                range: [0, Math.ceil((Math.max(...banRate.y, ...pickRate.y)+1) / 10.0) * 10.0]
            },
        };

        const plotData = [pickRate, banRate];

        return <div>
            <Typography variant="h6">
                {displayRole} Pick / Ban Rate
            </Typography>
            <Plot useResizeHandler style={{ minWidth: '300px', width: '100%', height: props.height }} data={plotData} layout={layout} config={PLOTLY_CONFIG}/>
        </div>;
}

ChampionHistoryPickBan.propTypes = {
    theme: PropTypes.object.isRequired,
  };

export default withTheme()(ChampionHistoryPickBan);
