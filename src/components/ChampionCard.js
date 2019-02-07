import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom'

const styles = {
  card: {
    minWidth: 120,
    maxWidth: 120,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 0,
  },
  media: {
    height: 75,
  },
};

function ChampionCard(props) {
  const { classes } = props;

  const {champion} = props;

//   champion.roles = [
//       "Top", "Jungler"
//   ];

    if (champion.roles === null) {
        champion.roles = []
    }

  return (
    <Card className={classes.card}>
    <CardActionArea component={props => <Link to={`/champions/${champion.id}`} {...props}/>}>
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          {`${champion.name}`}
        </Typography>
        <CardMedia
          className={classes.media}
          image={`https://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.id}.png`}
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
      {/* <CardActions>
      <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}

ChampionCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChampionCard);
