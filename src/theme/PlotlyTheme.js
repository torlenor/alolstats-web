

/**
 * Returns the default ALoLStats Plotly layout
 * 
 * @param {array} theme The mui theme to get the colors from
 * @returns {array} The default Plotly layout
 */
export const getPlotlyThemeDefault = (theme) =>  {
    return {
        autosize: true,
        margin: {
        l: 60, r: 20, t: 20, b: 60,
        autoexpand: false,
        },
        xaxis: {
            titlefont: {
                size: theme.typography.fontSize+1,
                color: theme.palette.common.white,
            },
            tickfont: {
                size: theme.typography.fontSize,
                color: theme.palette.common.white,
            },
            gridwidth: 2,
            gridcolor: theme.palette.background.background,
            zerolinecolor: theme.palette.common.white,
            linecolor: theme.palette.common.white,
        },
        yaxis: {
            titlefont: {
                size: theme.typography.fontSize+1,
                color: theme.palette.common.white,
            },
            tickfont: {
                size: theme.typography.fontSize,
                color: theme.palette.common.white,
            },
            gridwidth: 2,
            fixedrange: true,
            gridcolor: theme.palette.background.background,
            zerolinecolor: theme.palette.common.white,
            linecolor: theme.palette.common.white,
        },
        dragmode: false,
        plot_bgcolor: theme.palette.background.paper,
        paper_bgcolor: theme.palette.background.paper,
        legend: {
            font: {
                size: theme.typography.fontSize,
                color: theme.palette.common.white
            },
            bgcolor: theme.palette.background.paper,
        }
    }
}

/**
 * Returns the default ALoLStats Plotly configuration
 * 
 * @returns {array} The default Plotly configuration
 */
export const getPlotlyConfigDefault = () => {
    return {'displayModeBar': false};
}
