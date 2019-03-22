import PropTypes from 'prop-types';

import React from 'react';

import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Plot from 'react-plotly.js';

import { getPlotlyThemeDefault, getPlotlyConfigDefault } from '../../theme/PlotlyTheme';

const MAX_VERSIONS = 5;
const PLOTLY_CONFIG = getPlotlyConfigDefault();

function ChampionHistoryKDA(props) {
    
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

    const kills = 
        {
            x: championHistoryData.versions.slice(0, MAX_VERSIONS),
            y: championHistoryData.averagekillsHistory.slice(0, MAX_VERSIONS),
            error_y: {
                type: 'data',
                array: championHistoryData.stddevkillsHistory.slice(0, MAX_VERSIONS),
                visible: true
              },
            type: 'scatter',
            mode: 'lines+markers',
            'line': {
                'color': 'rgb(15, 35, 168)'
            },
            'marker': {
                'color': 'rgb(15, 35, 168)'
            },
            name: 'Kills'
        };

    const deaths = 
    {
        x: championHistoryData.versions.slice(0, MAX_VERSIONS),
        y: championHistoryData.averagedeathsHistory.slice(0, MAX_VERSIONS),
        error_y: {
            type: 'data',
            array: championHistoryData.stddevdeathsHistory.slice(0, MAX_VERSIONS),
            visible: true
          },
        type: 'scatter',
        mode: 'lines+markers',
        'line': {
            'color': 'rgb(168, 15, 15)'
        },
        'marker': {
            'color': 'rgb(168, 15, 15)'
        },
        name: 'Deaths'
    };

    const assists = 
    {
        x: championHistoryData.versions.slice(0, MAX_VERSIONS),
        y: championHistoryData.averageassistsHistory.slice(0, MAX_VERSIONS),
        error_y: {
            type: 'data',
            array: championHistoryData.stddevassistsHistory.slice(0, MAX_VERSIONS),
            visible: true
          },
        type: 'scatter',
        mode: 'lines+markers',
        'line': {
            'color': 'rgb(30, 104, 11)'
        },
        'marker': {
            'color': 'rgb(30, 104, 11)'
        },
        name: 'Assists'
    };

    const defaultTheme = getPlotlyThemeDefault(theme);

    const layout = 
        {
            ...defaultTheme,
            showlegend: true,
            xaxis: {
                ...defaultTheme.xaxis,
                type: 'category',
                title: {
                    text: 'Game Version'
                },
                fixedrange: true,
                categoryorder: 'array',
                categoryarray: kills.x,
            },
            yaxis: {
                ...defaultTheme.yaxis,
                title: {
                    text: 'KDA',
                },
                fixedrange: true,
                range: [0, Math.ceil((Math.max(...kills.y, ...deaths.y, ...assists.y) + Math.max(...kills.error_y.array, ...deaths.error_y.array, ...assists.error_y.array) + +1) / 10.0) * 10.0]
            },
        };

        const plotData = [kills, deaths, assists];

        return <div>
            <Typography variant="h6">
                {displayRole} KDA
            </Typography>
            <Plot useResizeHandler style={{ width: '100%', height: props.height }} data={plotData} layout={layout} config={PLOTLY_CONFIG}/>
        </div>;
}

ChampionHistoryKDA.propTypes = {
    theme: PropTypes.object.isRequired,
  };

export default withTheme()(ChampionHistoryKDA);
