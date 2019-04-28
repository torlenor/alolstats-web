import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';

import Typography from '@material-ui/core/Typography';

import { constants as themeConstants } from "../theme/ConstantsTheme";

const STATIC_DATA_BASE_URL = `${process.env.REACT_APP_STATIC_DATA_BASE_URL}`;

const styles = {
    card: {
        paddingTop: themeConstants.padding,
        paddingBottom: themeConstants.padding,
        width: "100%",
        display: 'flex',
        "justify-content": "center",
        "align-items": "center",
        "text-align": "center",
    },
    title: {
        padding: 0,
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'column',
    },
    pos: {
        marginBottom: 0,
    },
    baseStats: {
        marginTop: 0,
        "justify-content": "center",
        "align-items": "center",
        "text-align": "center",
    },
};

function ChampionInfo(props) {
  const { classes } = props;

  const {champion} = props;

    if (champion.roles === null) {
        champion.roles = [];
    }

  return (
      <Card className={classes.card}>
      <img src={`${STATIC_DATA_BASE_URL}/${champion.version}/${champion.version}/img/champion/${champion.id}.png`} height={102} width={102} justify="center" style={{justify: "center",}} alt="Logo" />
      <div className={classes.title}>
            <Typography variant="h4" className={classes.title} style={{float: "left",}}>
                {champion.name}
            </Typography>
            <Typography component={'span'} className={classes.pos} color="textSecondary">
                {
                    champion.roles.map(value => (
                        <div key={value}>
                        {`${value}`}
                        </div>
                    ))
                }
            </Typography>
        </div>
        <div className={classes.baseStats}>
            <Typography className={classes.baseStats}>
                Armor: {champion.stats.armor} (+{champion.stats.armorperlevel}) 
                Health: {champion.stats.hp} (+{champion.stats.hpperlevel}) Health Regen: {champion.stats.hpregen} (+{champion.stats.hpregenperlevel})<br/>
                Attack Damage: {champion.stats.attackdamage} (+{champion.stats.attackdamageperlevel}) Attack Range: {champion.stats.attackrange} Attack Speed: {champion.stats.attackspeed} (+{champion.stats.attackspeedperlevel})<br/>
                Mana: {champion.stats.mp} (+{champion.stats.mpperlevel}) Mana Regen: {champion.stats.mpregen} (+{champion.stats.mpregenperlevel})
                Move Speed: {champion.stats.movespeed}
            </Typography>
        </div>
    </Card>
  );
}

ChampionInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChampionInfo);
