import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

import { withStyles, withTheme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuDrawer from './MenuDrawer'
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { Link } from 'react-router-dom'

import ChampionSearch from './ChampionSearch'

import { constants as themeConstants } from "../theme/ConstantsTheme";

const styles = theme => ({
    root: {
        // flexGrow: 1,
        paddingBottom: 64 + themeConstants.padding,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -16,
        marginRight: -8,
    },

    // Style for Patch and League select Text Field
    textField: {
        marginLeft: theme.spacing.unit*1,
        minWidth: 80,
    },
    textFieldOutlinedInput: {
        '&$textFieldFocused': {
            borderWidth: '1px',
            borderColor: `${theme.palette.primary.main} !important`,
        }
    },
    textFieldInput: {
        paddingTop: 11,
        paddingBottom: 11,
    },
    textFieldLabel: {
        '&$textFieldFocused': {
            color: 'white',
        },
        color : 'white',
        },
    textFieldFocused: { },
    textFieldNotchedOutline: {
        borderWidth: '1px',
        borderColor: `white !important`,
    },
    icon: {
        fill: 'white',
    },
});

const LinkHome = props => <Link to="/" {...props} />

class NavBar extends Component {
    
    constructor(props) {
        super(props);
        
        if (props.versions !== undefined && props.versions.length > 0
            && props.leagues !== undefined && props.leagues.length > 0
            && props.queues !== undefined && props.queues.length > 0 ) {
                this.state = {
                    selectedPatch: props.versions[0], 
                    selectedLeague: props.leagues[0],
                    selectedQueue: props.queues[0],
                    versions: props.versions,
                    leagues: props.leagues,
                    queues: props.queues,
                    showDrawer: false,
                };
            } else {
                this.state = {
                    selectedPatch: "", 
                    selectedLeague: "",
                    selectedQueues: "",
                    versions: [],
                    leagues: [],
                    queues: [],
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
                if (this.state.queues !== props.queues && props.queues.length > 0) {
                    this.setState({
                        selectedLeague: props.queues[0],
                        queues: props.queues,
                    });
                }
            }
        }
            
    componentDidMount() {
        if (this.props.versions !== undefined && this.props.versions.length > 0
            && this.props.leagues !== undefined && this.props.leagues.length > 0 
            && this.props.queues !== undefined && this.props.queues.length > 0 ) {
                this.setState({
                    versions: this.props.versions,
                    leagues: this.props.leagues,
                    queues: this.props.queues,
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

    handleChangeQueue = (event) => {
        this.setState({selectedQueue: event.target.value});
        this.props.handlerQueue(event.target.value);
    };

    handleMenuButtonClose = (event) => {
        this.setState({showDrawer: false})
    }

    handleMenuButton = () => {
        this.setState({showDrawer: true})
    }
                
        render() {
            const { classes, theme } = this.props;

            return (
                <div className={classes.root}>
                    <MenuDrawer
                        open={this.state.showDrawer} onClose={this.handleMenuButtonClose}
                        versions={this.props.versions} leagues={this.props.leagues}
                        selectedVersion={this.state.selectedPatch} selectedLeague={this.state.selectedLeague}
                        handlerPatch={this.props.handlerPatch} handlerLeague={this.props.handlerLeague}
                    />
                    <AppBar position="fixed" color="primary" style={{ background: theme.palette.background.paper }}>
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => { this.setState({showDrawer: true}); }}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" style={{ textDecoration: 'none', marginRight: 10 }} component={LinkHome}>
                                fuu.la
                            </Typography>

                            <div className={classes.grow}></div>

                            <ChampionSearch selectedVersion={this.state.selectedPatch} selectedLeague={this.state.selectedLeague} routerHistory={this.props.history}/>

                            <TextField
                                label="Patch"
                                select variant="outlined"
                                value={this.state.selectedPatch}
                                className={classes.textField}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.textFieldLabel,
                                        focused: classes.textFieldFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.textFieldOutlinedInput,
                                        focused: classes.textFieldFocused,
                                        notchedOutline: classes.textFieldNotchedOutline,
                                        input: classes.textFieldInput,
                                    },
                                }}
                                SelectProps={{
                                    inputProps: {
                                        classes: {
                                            icon: classes.icon,
                                        },
                                    }
                                }}
                                onChange={this.handleChangePatch}>
                                {
                                    this.state.versions.map(option => (
                                    <MenuItem key={option} value={option}>
                                    {option}
                                    </MenuItem>
                                    ))
                                }
                            </TextField>
                            {/* <TextField
                                label="League"
                                select variant="outlined"
                                value={this.state.selectedLeague}
                                className={classes.textField}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.textFieldLabel,
                                        focused: classes.textFieldFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.textFieldOutlinedInput,
                                        focused: classes.textFieldFocused,
                                        notchedOutline: classes.textFieldNotchedOutline,
                                        input: classes.textFieldInput,
                                    },
                                }}
                                SelectProps={{
                                    inputProps: {
                                        classes: {
                                            icon: classes.icon,
                                        },
                                    }
                                }}
                                onChange={this.handleChangeLeague}>
                                {
                                    this.state.leagues.map(option => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))
                                }
                            </TextField> */}
                            <TextField
                                label="Queue"
                                select variant="outlined"
                                value={this.state.selectedQueue}
                                className={classes.textField}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.textFieldLabel,
                                        focused: classes.textFieldFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        root: classes.textFieldOutlinedInput,
                                        focused: classes.textFieldFocused,
                                        notchedOutline: classes.textFieldNotchedOutline,
                                        input: classes.textFieldInput,
                                    },
                                }}
                                SelectProps={{
                                    inputProps: {
                                        classes: {
                                            icon: classes.icon,
                                        },
                                    }
                                }}
                                onChange={this.handleChangeQueue}>
                                {
                                    this.state.queues.map(option => (
                                    <MenuItem key={option} value={option}>{option}</MenuItem>
                                    ))
                                }
                            </TextField>
                        </Toolbar>
                    </AppBar>
                </div>
        );
    }
}
        
NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};
        
export default withTheme()(withStyles(styles)(withRouter(NavBar)));
