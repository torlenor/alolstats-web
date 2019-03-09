import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import { fade } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuDrawer from './MenuDrawer'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom'

import ChampionSearch from './ChampionSearch'

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: 70,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    inputPatch: {
        marginTop: 10,
        marginLeft: 8,
        minWidth: 80,
        // flex: 1,
    },
    inputLeague: {
        marginTop: 10,
        marginLeft: 8,
        minWidth: 118,
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing.unit,
        width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
                    showDrawer: false,
                };
            } else {
                this.state = {
                    selectedPatch: "", 
                    selectedLeague: "",
                    versions: [],
                    leagues: [],
                    showDrawer: false,
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

                handleMenuButtonClose = (event) => {
                    this.setState({showDrawer: false})
                }

                handleMenuButton = () => {
                    this.setState({showDrawer: true})
                }
                
                render() {
                    const { classes } = this.props;
                    
                    // const theme = createMuiTheme({
                    //     palette: {
                    //         type: 'dark',
                    //     },
                    //     typography: { useNextVariants: true },
                    // });

                    const theme = createMuiTheme({
                    ...theme,
                    palette: {
                                    type: 'dark',
                                },
                                typography: { useNextVariants: true },
                    });
                    
                    return (
                        <div className={classes.root}>
                            <MenuDrawer open={this.state.showDrawer} onClose={this.handleMenuButtonClose} 
                                        versions={this.props.versions} leagues={this.props.leagues} 
                                        selectedVersion={this.state.selectedPatch} selectedLeague={this.state.selectedLeague}
                                        handlerPatch={this.props.handlerPatch} handlerLeague={this.props.handlerLeague}
                                        />
                            <AppBar position="fixed">
                                <Toolbar>
                                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => { this.setState({showDrawer: true}); }}>
                                    <MenuIcon />
                                    </IconButton>
                                    <Typography variant="h6" color="inherit" style={{ textDecoration: 'none' }} component={LinkHome}>
                                    fuu.la
                                    </Typography>
                                    {/* <div>
                                        <Button component={LinkFreeRotation} color="inherit">Free Rotation</Button>
                                        <Button component={LinkChampions} color="inherit">Champions</Button>
                                        <Button component={LinkChampionsSummary} color="inherit">Summary</Button>
                                    </div> */}

                                    <div className={classes.grow}></div>

                                    {/* <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                            }}
                                        />
                                    </div> */}

                                    <ChampionSearch selectedVersion={this.state.selectedPatch} selectedLeague={this.state.selectedLeague} routerHistory={this.props.history}/>
                                    
                                    <MuiThemeProvider theme={theme}>
                                        <TextField
                                        select
                                        variant="outlined"
                                        label="Patch"
                                        value={this.state.selectedPatch}
                                        className={classes.inputPatch}
                                        onChange={this.handleChangePatch}>
                                            {
                                                this.state.versions.map(option => (
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
                                        className={classes.inputLeague}
                                        onChange={this.handleChangeLeague}>
                                            {
                                                this.state.leagues.map(option => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
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
        
        export default withStyles(styles)(withRouter(NavBar));
        