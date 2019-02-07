import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

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

// const LinkHome = props => <Link to="/" {...props} />
const LinkFreeRotation = props => <Link to="/freerotation" {...props} />
const LinkChampions = props => <Link to="/champions" {...props} />

// function ButtonAppBar(props) {
class NavBar extends Component {
    
    constructor(props) {
        super(props);
        
        if (props.versions !== undefined && props.versions.length > 0
            && props.leagues !== undefined && props.leagues.length > 0 ) {
                this.state = {
                    selectedPatch: props.versions[0], 
                    selectedLeague: props.leagues[0],
                    versions: props.versions,
                    leagues: props.leagues,
                };
            } else {
                this.state = {
                    selectedPatch: "", 
                    selectedLeague: "",
                    versions: [],
                    leagues: [],
                };
            }
        }
        
        componentWillReceiveProps(props) {
            if (props.versions !== undefined && props.versions.length > 0
                && props.leagues !== undefined && props.leagues.length > 0 ) {
                if (this.state.versions !== props.versions) {
                    this.setState({
                        selectedPatch: props.versions[0],
                        versions: props.versions,
                    });
                }
                if (this.state.leagues !== props.leagues && props.leagues.length > 0) {
                    this.setState({
                        selectedLeague: props.leagues[0],
                        leagues: props.leagues,
                    });
                }
            }
        }
            
            componentDidMount() {
                if (this.props.versions !== undefined && this.props.versions.length > 0
                    && this.props.leagues !== undefined && this.props.leagues.length > 0 ) {
                        this.setState({
                            // selectedPatch: this.props.versions[0], 
                            // selectedLeague: this.props.leagues[0],
                            versions: this.props.versions,
                            leagues: this.props.leagues,
                        });
                    }
                }

                handleChangePatch = (event) => {
                    this.setState({selectedPatch: event.target.value});
                    this.props.handlerPatch(event.target.value);
                };

                handleChangeLeague = (event) => {
                    this.setState({selectedLeague: event.target.value});
                    this.props.handlerLeague(event.target.value);
                };
                
                render() {
                    const { classes } = this.props;
                    
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
                        {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton> */}
                    {/* <Typography variant="h6" color="inherit" >
                    ALoLStats
                </Typography> */}
                <div>
                {/* <Button component={LinkHome} color="inherit">Home</Button> */}
                <Button component={LinkFreeRotation} color="inherit">Free Rotation</Button>
                <Button component={LinkChampions} color="inherit">Champions</Button>
                </div>
                <div className={classes.grow}></div>
                
                <MuiThemeProvider theme={theme}>
                <TextField
                select
                variant="outlined"
                label="Patch"
                value={this.state.selectedPatch}
                className={classes.input}
                
                onChange={this.handleChangePatch}>
                {this.state.versions.map(option => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                    ))
                }
                </TextField>
                
                <TextField
                select
                variant="outlined"
                label="League"
                value={this.state.selectedLeague}
                className={classes.input}
                onChange={this.handleChangeLeague}>
                {this.state.leagues.map(option => (
                    <MenuItem key={option} value={option}>
                    {option}
                    </MenuItem>
                    ))
                }
                </TextField>
                </MuiThemeProvider>
                
                </Toolbar>
                </AppBar>
                </div>
                );
            }
        }
        
        NavBar.propTypes = {
            classes: PropTypes.object.isRequired,
        };
        
        export default withStyles(styles)(NavBar);
        