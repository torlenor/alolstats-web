import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { Link } from 'react-router-dom'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const LinkHome = props => <Link to="/" {...props} />
const LinkFreeRotation = props => <Link to="/freerotation" {...props} />
const LinkChampions = props => <Link to="/champions" {...props} />
// const LinkSummoners = props => <Link to="/summoners" {...props} />

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" >
            ALoLStats
          </Typography>
          <div>
          <Button component={LinkHome} color="inherit">Home</Button>
          <Button component={LinkFreeRotation} color="inherit">Free Rotation</Button>
          <Button component={LinkChampions} color="inherit">Champions</Button>
          {/* <Button component={LinkSummoners} color="inherit">Summoners</Button> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
