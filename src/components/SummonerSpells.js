import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

// API
import { fetchSummonerSpells } from "../api/FetchSummonerSpell"

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

    if (props.summonerSpells === undefined) {
        return <div></div>;
    }

    if (props.version === undefined) {
        return <div></div>;
    }

    useEffect(() => {
        if (props.version !== undefined) {
            fetchSummonerSpells(props.version, "en_US", setData, setError, setDidLoad);
        }
    }, [props.version]);
    
    const { summonerSpells, version, classes } = props;

    if (data != null) {
        console.log(data.toString())
    }

    var displayRole = "";
    if (props.role !== undefined) {
        displayRole = props.role;
    } else {
        displayRole = "Overall";
    }

    console.log(summonerSpells);
    if (didLoad !== true || error !== false || summonerSpells === null || summonerSpells === undefined || summonerSpells.summonerspells.length === 0) {
        return <div></div>;
    }

    return <div>
        <Typography variant="h6">
                {displayRole} Recommended Summoner Spells
        </Typography>
        <Tooltip title={summonerSpells.summonerspells[0].name} classes={{ tooltip: classes.lightTooltip }}>
            <img src={`${STATIC_DATA_BASE_URL}/${version}.1/${version}.1/img/spell/${summonerSpells.summonerspells[0].image.full}`} height={102} width={102} justify="center" style={{justify: "center", marginRight: 10}} alt="Logo" />
        </Tooltip>
        <Tooltip title={summonerSpells.summonerspells[1].name} classes={{ tooltip: classes.lightTooltip }}>
            <img src={`${STATIC_DATA_BASE_URL}/${version}.1/${version}.1/img/spell/${summonerSpells.summonerspells[1].image.full}`} height={102} width={102} justify="center" style={{justify: "center", marginLeft: 10}} alt="Logo" />
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
