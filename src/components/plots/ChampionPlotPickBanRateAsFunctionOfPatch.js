import React from 'react';
import Plot from 'react-plotly.js';

import Typography from '@material-ui/core/Typography';

const MAX_VERSIONS = 5;

function ChampionHistoryPickBan(props) {
    var displayRole = "";
    if (props.role !== undefined) {
        displayRole = props.role;
    } else {
        displayRole = "Overall";
    }

    const pickRate = {
            x: props.championHistoryData.versions.slice(0, MAX_VERSIONS),
            y: props.championHistoryData.pickRateHistory.slice(0, MAX_VERSIONS).map(value => value*100),
            type: 'scatter',
            mode: 'lines+markers',
            'line': {
                'color': 'rgb(0, 51, 204)'
            },
            'marker': {
                'color': 'rgb(0, 51, 204)'
            },
            name: 'Pick Rate'
            };

    const banRate = 
        {
            x: props.championHistoryData.versions.slice(0, MAX_VERSIONS),
            y: props.championHistoryData.banRateHistory.slice(0, MAX_VERSIONS).map(value => value*100),
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

    const layout = 
        {
            autosize: true,
            showlegend: false,
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
                categoryarray: pickRate.x,
            },
            yaxis: {
                title: {
                    text: 'Pick/Ban Rate [%]',
                },  
                fixedrange: true,
                range: [0, Math.ceil((Math.max(...banRate.y, ...pickRate.y)+1) / 10.0) * 10.0]
            },
            dragmode: false,
        };

        const plotData = [pickRate, banRate];

        const config={'displayModeBar': false};

        return <div className="ChampionPlotWinRateAsFunctionOfPatch">
            <div className="ChampionPlotWinRateAsFunctionOfPatch">
            <Typography variant="h6" gutterBottom component="h4">
                    {displayRole} Pick / Ban Rate
                </Typography>
                </div>
                <Plot useResizeHandler style={{ minWidth: '300px', width: '100%', height: '300px' }} data={plotData} layout={layout} config={config}/>
        </div>;
}

export default ChampionHistoryPickBan;
