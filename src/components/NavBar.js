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

const styles = theme => ({
    root: {
        // flexGrow: 1,
        paddingBottom: 80,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -20,
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
        padding: 11,
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

            return (
                <div className={classes.root}>
                    <MenuDrawer
                        open={this.state.showDrawer} onClose={this.handleMenuButtonClose}
                        versions={this.props.versions} leagues={this.props.leagues}
                        selectedVersion={this.state.selectedPatch} selectedLeague={this.state.selectedLeague}
                        handlerPatch={this.props.handlerPatch} handlerLeague={this.props.handlerLeague}
                    />
                    <AppBar position="fixed">
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
                                onChange={this.handleChangeLeague}>
                                {
                                    this.state.leagues.map(option => (
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
