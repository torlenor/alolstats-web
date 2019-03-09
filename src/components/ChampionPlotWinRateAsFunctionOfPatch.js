import React from 'react';
import Plot from 'react-plotly.js';

import Typography from '@material-ui/core/Typography';

const MAX_VERSIONS = 5;

function ChampionHistoryWin(props) {
    var displayRole = "";
    if (props.role !== undefined) {
        displayRole = props.role;
    } else {
        displayRole = "Overall";
    }

    const winRate = 
        {
            x: props.championHistoryData.versions.slice(0, MAX_VERSIONS),
            y: props.championHistoryData.winRateHistory.slice(0, MAX_VERSIONS).map(value => value*100),
            type: 'scatter',
            mode: 'lines+markers',
            'line': {
                'color': 'rgb(19, 160, 49)'
            },
            'marker': {
                'color': 'rgb(19, 160, 49)'
            },
            name: 'Win Rate'
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
                categoryorder: 'array',
                categoryarray: winRate.x,
            },
            yaxis: {
                title: {
                    text: 'Win Rate [%]',
                },
                range: [0, 100]
            },
        };

        const config={'displayModeBar': false};

        const plotData = [winRate];

        return <div className="ChampionPlotWinRateAsFunctionOfPatch">
            <div className="ChampionPlotWinRateAsFunctionOfPatch">
                <Typography variant="h5" gutterBottom component="h3">
                    {displayRole} Win Rate
                </Typography>
                </div>
                <Plot useResizeHandler style={{ minWidth: '400px', width: '100%', height: '100%' }} data={plotData} layout={layout} config={config}/>
        </div>;
}

export default ChampionHistoryWin;
