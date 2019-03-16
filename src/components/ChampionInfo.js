import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { unstable_Box as Box } from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        marginBottom: 0,
        spacing: 0,
        padding: 0,
        width: "100%"
    },
    title: {
        fontSize: 22,
        padding: 0,
        marginLeft: 10,
        marginRight: 10,
    },
    pos: {
        fontSize: 12,
        marginBottom: 0,
    },
    baseStats: {
        marginTop: 0,
        fontSize: 12,
        "justify-content": "center",
    },
    base: {
        "justify-content": "center",
    },
};

function ChampionInfo(props) {
  const { classes } = props;

  const {champion} = props;

    if (champion.roles === null) {
        champion.roles = [];
    }

  return (
    <div className={classes.image}>
        <div className={classes.base}>
            <Box flexDirection="row" display="flex" justify="center" className={classes.base}>
                <img src={`https://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.id}.png`} height={102} width={102} justify="center" style={{justify: "center",}} alt="Logo" />
                <Box flexDirection="column" display="flex" p={2} bgcolor="background.paper">
                    <Typography className={classes.title} style={{float: "left",}}>
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
                </Box>
                <div className={classes.baseStats}>
                    <Box p={3}>
                        <Typography className={classes.baseStats}>
                            Armor: {champion.stats.armor} (+{champion.stats.armorperlevel}) 
                            Health: {champion.stats.hp} (+{champion.stats.hpperlevel}) Health Regen: {champion.stats.hpregen} (+{champion.stats.hpregenperlevel})<br/>
                            Attack Damage: {champion.stats.attackdamage} (+{champion.stats.attackdamageperlevel}) Attack Range: {champion.stats.attackrange} Attack Speed: {champion.stats.attackspeed} (+{champion.stats.attackspeedperlevel})<br/>
                            Mana: {champion.stats.mp} (+{champion.stats.mpperlevel}) Mana Regen: {champion.stats.mpregen} (+{champion.stats.mpregen})
                            Move Speed: {champion.stats.movespeed}
                        </Typography>
                    </Box>
                </div>
            </Box>
        </div>
    </div>
  );
}

ChampionInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChampionInfo);
