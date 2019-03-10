import React from 'react';
import Plot from 'react-plotly.js';

import Typography from '@material-ui/core/Typography';

const MAX_VERSIONS = 5;

function ChampionHistoryKDA(props) {
    var displayRole = "";
    if (props.role !== undefined) {
        displayRole = props.role;
    } else {
        displayRole = "Overall";
    }

    if (props.championHistoryData === undefined) {
        return <div></div>;
    }

    const kills = 
        {
            x: props.championHistoryData.versions.slice(0, MAX_VERSIONS),
            y: props.championHistoryData.averagekillsHistory.slice(0, MAX_VERSIONS),
            error_y: {
                type: 'data',
                array: props.championHistoryData.stddevkillsHistory.slice(0, MAX_VERSIONS),
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
        x: props.championHistoryData.versions.slice(0, MAX_VERSIONS),
        y: props.championHistoryData.averagedeathsHistory.slice(0, MAX_VERSIONS),
        error_y: {
            type: 'data',
            array: props.championHistoryData.stddevdeathsHistory.slice(0, MAX_VERSIONS),
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
        x: props.championHistoryData.versions.slice(0, MAX_VERSIONS),
        y: props.championHistoryData.averageassistsHistory.slice(0, MAX_VERSIONS),
        error_y: {
            type: 'data',
            array: props.championHistoryData.stddevassistsHistory.slice(0, MAX_VERSIONS),
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

    const layout = 
        {
            autosize: true,
            showlegend: true,
            margin: {
                l: 60,
                r: 20,
                t: 20,
                b: 60,
                autoexpand: false,
            },
            xaxis: {
                type: 'category',
                title: {
                    text: 'Game Version'
                },
                fixedrange: true,
                categoryorder: 'array',
                categoryarray: kills.x,
            },
            yaxis: {
                title: {
                    text: 'KDA',
                },
                fixedrange: true,
                range: [0, Math.ceil((Math.max(...kills.y, ...deaths.y, ...assists.y) + Math.max(...kills.error_y.array, ...deaths.error_y.array, ...assists.error_y.array) + +1) / 10.0) * 10.0]
            },
            dragmode: false,
        };

        const config={'displayModeBar': false};

        const plotData = [kills, deaths, assists];

        return <div className="ChampionPlotWinRateAsFunctionOfPatch">
            <div className="ChampionPlotWinRateAsFunctionOfPatch">
            <Typography variant="h6" gutterBottom component="h4">
                    {displayRole} KDA
                </Typography>
                </div>
                <Plot useResizeHandler style={{ minWidth: '300px', width: '100%', height: props.height }} data={plotData} layout={layout} config={config}/>
        </div>;
}

export default ChampionHistoryKDA;
