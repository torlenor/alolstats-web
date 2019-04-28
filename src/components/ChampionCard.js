import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom'

const STATIC_DATA_BASE_URL = `${process.env.REACT_APP_STATIC_DATA_BASE_URL}`;

const styles = {
  card: {
    minWidth: 120,
    maxWidth: 120,
    height: "100%",
  },
  title: {
    // fontSize: 12,
  },
  pos: {
    marginTop: 6,
  },
  media: {
    height: 75,
  },
};

function ChampionCard(props) {
    const { champion, classes } = props;

    if (champion.roles === null) {
        champion.roles = []
    }

  return (
    <Card className={classes.card}>
    <CardActionArea className={classes.card} component={props => <Link to={`/champions/${champion.id}`} {...props}/>}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {`${champion.name}`}
        </Typography>
        <CardMedia
          className={classes.media}
          image={`${STATIC_DATA_BASE_URL}/${champion.version}/${champion.version}/img/champion/${champion.id}.png`}
          title={`${champion.name}`}
        />
        <Typography component={'span'} className={classes.pos} color="textSecondary">
            {champion.roles.map(value => (
                <div key={value}>
                {`${value}`}
                </div>
            ))
            }
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}

ChampionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChampionCard);
