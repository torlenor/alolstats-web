import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    lightTooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
      },
  });

function SummonerSpells(props) {
    
    if (props.summonerSpells === undefined) {
        return <div></div>;
    }
    
    const { summonerSpells, classes } = props;

    var displayRole = "";
    if (props.role !== undefined) {
        displayRole = props.role;
    } else {
        displayRole = "Overall";
    }

    return <div>
        <Typography variant="h6">
                {displayRole} Recommended Summoner Spells
        </Typography>
        <Tooltip title={summonerSpells.summonerspells[0].name} classes={{ tooltip: classes.lightTooltip }}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/${summonerSpells.summonerspells[0].image.full}`} height={102} width={102} justify="center" style={{justify: "center", marginRight: 10}} alt="Logo" />
        </Tooltip>
        <Tooltip title={summonerSpells.summonerspells[1].name} classes={{ tooltip: classes.lightTooltip }}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/9.7.1/img/spell/${summonerSpells.summonerspells[1].image.full}`} height={102} width={102} justify="center" style={{justify: "center", marginLeft: 10}} alt="Logo" />
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
