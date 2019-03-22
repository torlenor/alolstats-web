import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const DEFAULTSIZE = 40;

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  root: {
    "text-align": "center"
  }
});

function CircularIndeterminate(props) {
  const { classes, text, size } = props;
  var useSize = DEFAULTSIZE;
  if (size > 0) {
      useSize = size;
  }

  return (
    <div className={classes.root} style={{display: 'inline-block'}}>
        <div>
            <CircularProgress className={classes.progress} size={useSize}/>
        </div>
        <Typography>
        {text}
        </Typography>
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
