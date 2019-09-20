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

function SummonerSpells(props) {
    const [data, setData] = useState([]);
    const [didLoad, setDidLoad] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (props.version !== undefined) {
            API.get("v1/summonerspells?gameversion=" + props.version + ".1&language=en_US")
            .then(res => {
              setData(res.data); setDidLoad(true); setError(false);
            }, (error) => {
                console.error(error);
                setDidLoad(true); setError(true);
            });
        }
    }, [props.version]);

    if (props.summonerSpells === undefined) {
        return <div></div>;
    }
    const { summonerSpells, version, classes } = props;

    var displayRole = "";
    if (props.role !== undefined) {
        displayRole = props.role;
    } else {
        displayRole = "Overall";
    }

    // console.log(summonerSpells);
    if (didLoad !== true || error !== false || summonerSpells === null || summonerSpells === undefined || summonerSpells.summonerspellids === undefined || summonerSpells.summonerspellids.length === 0) {
        return <div></div>;
    }

    var spell1, spell2;
    // iterate over each element in the array
    for (var id in data) {
        if (parseInt(data[id].key) === summonerSpells.summonerspellids[0]) {
            spell1 = data[id];
        }
        if (parseInt(data[id].key) === summonerSpells.summonerspellids[1]) {
            spell2 = data[id];
        }
    }

    if (spell1 === undefined || spell2 === undefined) {
        console.error("BUG: Could not determine summoner spells");
        return <div></div>;
    }

    return <div>
        <Typography variant="h6">
                {displayRole} Recommended Summoner Spells
        </Typography>
        <Tooltip title={spell1.name} classes={{ tooltip: classes.lightTooltip }}>
            <img src={`${STATIC_DATA_BASE_URL}/${version}.1/${version}.1/img/spell/${spell1.image.full}`} height={102} width={102} justify="center" style={{justify: "center", marginRight: 10}} alt="Logo" />
        </Tooltip>
        <Tooltip title={spell2.name} classes={{ tooltip: classes.lightTooltip }}>
            <img src={`${STATIC_DATA_BASE_URL}/${version}.1/${version}.1/img/spell/${spell2.image.full}`} height={102} width={102} justify="center" style={{justify: "center", marginLeft: 10}} alt="Logo" />
        </Tooltip>
        <Typography variant="subtitle2">
                Win Rate {(summonerSpells.winrate*100).toFixed(2)} % (Sample Size {summonerSpells.samplesize} Games)
        </Typography>
    </div>;
}

SummonerSpells.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(SummonerSpells);
