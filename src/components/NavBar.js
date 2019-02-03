import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom'

const styles = theme => ({
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
  input: {
    marginLeft: 8,
    // flex: 1,
  },
  cssLabel: {
    '&$cssFocused': {
      color: "#FFFFFF",
    },
    color: "#FFFFFF",
  },
  cssFocused: {
    '&$cssFocused': {
        color: "#FFFFFF",
      },
      color: "#FFFFFF",
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
    },
});

const LinkHome = props => <Link to="/" {...props} />
const LinkFreeRotation = props => <Link to="/freerotation" {...props} />
const LinkChampions = props => <Link to="/champions" {...props} />

function ButtonAppBar(props) {
  const { classes } = props;

  const patches = [
    {
      value: '9.2',
      label: '9.2',
    },
    {
        value: '9.1',
        label: '9.1',
    },
    {
        value: '8.24',
        label: '8.24',
    },
  ];

  const leagues = [
    {
      value: '>=Master',
      label: '>=Master',
    },
    {
        value: 'Diamond',
        label: 'Diamond',
    },
    {
        value: 'Platinum',
        label: 'Platinum',
    },
    {
        value: 'Gold',
        label: 'Gold',
    },
    {
        value: 'Silver',
        label: 'Silver',
    },
    {
        value: '<=Bronze',
        label: '<=Bronze',
    },
  ];

  let patch = '9.2';
  let league = '>=Master';

  const handleChangePatch = prop => event => {
    patch = event.target.value;
    props.handler(patch);
  };

  const handleChangeLeague = prop => event => {
    league = event.target.value;
    props.handler(league);
  };

  const theme = createMuiTheme({
    palette: {
      type: 'dark',
    },
    typography: { useNextVariants: true },
  });

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" color="inherit" >
            ALoLStats
          </Typography> */}
          <div>
          <Button component={LinkHome} color="inherit">Home</Button>
          <Button component={LinkFreeRotation} color="inherit">Free Rotation</Button>
          <Button component={LinkChampions} color="inherit">Champions</Button>
          </div>
          <div className={classes.grow}></div>

          <MuiThemeProvider theme={theme}>
          <TextField
                select
                variant="outlined"
                label="Patch"
                value={patch}
                className={classes.input}

                onChange={handleChangePatch('patch')}>
                    {patches.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
            </TextField>

            <TextField
                select
                variant="outlined"
                label="League"
                value={league}
                className={classes.input}
                onChange={handleChangeLeague('league')}>
                    {leagues.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                    ))}
            </TextField>
            </MuiThemeProvider>

        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
