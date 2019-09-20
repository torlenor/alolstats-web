import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

// API
import API from '../api/api';

const STATIC_DATA_BASE_URL = `${process.env.REACT_APP_STATIC_DATA_BASE_URL}`;

const styles = theme => ({
    lightTooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
      },
  });

const GAMEVERSIONPARAMETER = "gameversion=";
const LEAGUEPARAMETER = `tier=`;
const QUEUEPARAMETER = `queue=`;

function TranslateRole(displayRole) {
    switch(displayRole.toUpperCase()) {
    case "MID":
    case "MIDDLE":
        return "MIDDLE";
    case "BOT":
    case "BOTTOM":
        return "BOTTOM";
    case "JUNGLE":
        return "JUNGLE";
    case "TOP":
        return "TOP";
    case "CARRY":
        return "CARRY";
    case "SUP":
    case "SUPPORT":
        return "SUPPORT";
    default:
        return "UNKNOWN";
    }
}

function ItemStats(props) {
    const [data, setData] = useState([]);
    const [didLoad, setDidLoad] = useState(false);
    const [error, setError] = useState(false);
    const [itemStatsData, setItemStatsData] = useState([]);
    const [itemStatsDidLoad, setItemStatsDidLoad] = useState(false);
    const [itemStatsError, setItemStatsError] = useState(false);
    const [displayRole, setDisplayRole] = useState("Overall");

    useEffect(() => {
        if (props.role !== undefined) {
            setDisplayRole(props.role);
        }
    }, [props.role]);

    useEffect(() => {
        if (props.version !== undefined) {
            API.get("v1/items?gameversion=" + props.version + ".1&language=en_US")
            .then(res => {
              setData(res.data); setDidLoad(true); setError(false);
            }, (error) => {
                console.error(error);
                setDidLoad(true); setError(true);
            });
        }
    }, [props.version]);

    useEffect(() => {
        if (props.championID !== undefined && props.version !== undefined && props.league !== undefined && props.queue !== undefined) {
            API.get("v1/stats/items/byid?id=" + props.championID + "&" + GAMEVERSIONPARAMETER + props.version + "&" + LEAGUEPARAMETER + props.league.toUpperCase() + "&" + QUEUEPARAMETER + props.queue)
            .then(res => {
                setItemStatsData(res.data); setItemStatsDidLoad(true); setItemStatsError(false);
            }, (error) => {
                console.error(error);
                setItemStatsDidLoad(true); setItemStatsError(true);
            });
        }
    }, [props.championID, props.version, props.league, props.queue, props.role]);

    const dataRole = TranslateRole(displayRole);

    if (itemStatsData.statsperrole === undefined || itemStatsData.statsperrole[dataRole] === undefined) {
        return <div>
            <Typography variant="h6">
                {displayRole} Recommended Full Item Build
            </Typography>
            <Typography variant="subtitle2">
                Sorry, currently no Item Build available
            </Typography>
        </div>;
    }
    const { version, classes } = props;

    const highestPick = ( displayRole !== "Overall" ? itemStatsData.statsperrole[dataRole][0] : itemStatsData.ItemStatsValues[0]);

    if (didLoad !== true || error !== false || highestPick === null || highestPick === undefined || highestPick.items === undefined || highestPick.items.length === 0
        || itemStatsDidLoad !== true || itemStatsError !== false) {
        return <div>
            <Typography variant="h6">
                {displayRole} Recommended Full Item Build
            </Typography>
            <Typography variant="subtitle2">
                Sorry, currently no Item Build available
            </Typography>
        </div>;
    }

    var allItemDescriptions = new Map();
    var itemDescriptions = [];
    for (var id in data) {
        const idd = parseInt(id);
        allItemDescriptions.set(idd, data[id])
        if (highestPick.items.includes(idd)) {
            if (data[id].into === null || data[id].into.length === 0 ) {
                itemDescriptions.push(data[id]);
            }
        }
    }

    var index = 0;

    return <div>
        <Typography variant="h6">
                {displayRole} Recommended Full Item Build
        </Typography>

        {highestPick.items.map(id => (
            <Tooltip key={"item_"+index++} title={data[parseInt(id)].name} classes={{ tooltip: classes.lightTooltip }}>
                <img src={`${STATIC_DATA_BASE_URL}/${version}.1/${version}.1/img/item/${data[parseInt(id)].image.full}`} height={52} width={52} justify="center" style={{justify: "center", marginRight: 10}} alt="Logo" />
            </Tooltip>
        ))}
        <Typography variant="subtitle2">
                Win Rate {(highestPick.winrate*100).toFixed(2)} % (Sample Size {highestPick.samplesize} Games)
        </Typography>
    </div>;
}

ItemStats.propTypes = {
    classes: PropTypes.object.isRequired,
    championID: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    queue: PropTypes.string.isRequired,
    league: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  };
  
export default withStyles(styles)(ItemStats);
