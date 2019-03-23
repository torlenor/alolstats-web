import React, {Component} from 'react';
import PropTypes from 'prop-types';

// CSS
import './Champions.css';

// Material-UI Components
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles, withTheme } from '@material-ui/core/styles';

// ALoLStats Components
import ChampionCard from './ChampionCard.js'
import Progress from './Progress'

// API
import { fetchChampions } from "../api/FetchChampions"

import {constants as themeConstants } from '../theme/ConstantsTheme';

const section = {
    height: "100%",
};

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit*0,
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

class Champions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchChampionsDone: false,
            fetchChampionsData: null,
            fetchChampionsError: false,

            filteredHits: null,
            isFiltered: false,
            isChecked: new Map(),
        };
    }

    handleChange = name => event => {
        var isChecked = this.state.isChecked;
        isChecked[name] = true;
        this.setState({isChecked: isChecked});
      };

      checkChecked = key => {
          if (this.state.isChecked[key] !== true) {
              return false;
          } else {
              return true;
          }
      };

      unselectAll = event => {
          this.setState({isChecked: new Map()});
      };

    getChampions(props) {
        if (props.parentProps.selectedVersion !== undefined && props.parentProps.selectedLeague !== undefined) {
            const version = props.parentProps.selectedVersion;
            const league = props.parentProps.selectedLeague.toUpperCase();
            const setState = this.setState.bind(this);
            fetchChampions(version, league, setState);
        }
    }

    componentWillReceiveProps(props) {
        this.getChampions(props);
      }

    componentDidMount() {
        this.getChampions(this.props);
    }

    toLower(item) {
        return item.toLowerCase();
    }

    handleChangeFilter = (event) => {
        var filterText = event.target.value.toLowerCase()
        if (filterText.length === 0) {
            this.setState({isFiltered: false});
            return
        }
        const filtered = this.state.fetchChampionsData.filter(hit => {
            const roles = hit.roles.map(this.toLower)
            var i;
            for (i = 0; i < roles.length; i++) { 
              if (roles[i].includes(filterText)) {
                  return true;
              }
            }
            return hit.id.toLowerCase().includes(filterText) === true || hit.name.toLowerCase().includes(filterText) === true ;
        }
        );
        this.setState({filteredHits: filtered, isFiltered: true})
    };

    render() {
        const {fetchChampionsData, fetchChampionsError, fetchChampionsDone, isFiltered, filteredHits} = this.state;
        const { classes } = this.props;

        let page;

        if (fetchChampionsDone === false) {
            page =  <div>
                        <Progress text="Loading Champions..."/>
                    </div>
        } else if (fetchChampionsError || fetchChampionsData === null) {
            page = <div className="Champions">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champions, please try again later!
                    </Typography>
                </div>
        } else if (isFiltered === true && filteredHits !== null) {
            document.title = "Champions - fuu.la";
            page = <div className="Champions">
                        <TextField
                            id="outlined-full-width"
                            label="Filter"
                            autoComplete='off'
                            placeholder="Enter name or role"
                            fullWidth
                            autoFocus
                            onChange={this.handleChangeFilter}
                            margin="normal"
                            variant="outlined"
                            className={classes.textField}
                            InputLabelProps={{
                                classes: {
                                    root: classes.textFieldLabel,
                                    focused: classes.textFieldFocused,
                                },
                                shrink: true,
                            }}
                            InputProps={{
                                classes: {
                                    root: classes.textFieldOutlinedInput,
                                    focused: classes.textFieldFocused,
                                    notchedOutline: classes.textFieldNotchedOutline,
                                    input: classes.textFieldInput,
                                },
                            }}
                        />
                        <Grid container className="ChampionCards" justify="center" spacing={themeConstants.padding}>
                            {filteredHits.map(value => (
                                <Grid key={value.key} item>
                                    <div style={section}>
                                        <ChampionCard champion={value}/>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
        } else {
            document.title = "Champions - fuu.la";
            page = <div className="Champions">
            <TextField
                id="outlined-full-width"
                label="Filter"
                autoComplete='off'
                placeholder="Enter name or role"
                fullWidth
                autoFocus
                onChange={this.handleChangeFilter}
                margin="normal"
                variant="outlined"
                className={classes.textField}
                InputLabelProps={{
                    classes: {
                        root: classes.textFieldLabel,
                        focused: classes.textFieldFocused,
                    },
                    shrink: true,
                }}
                InputProps={{
                    classes: {
                        root: classes.textFieldOutlinedInput,
                        focused: classes.textFieldFocused,
                        notchedOutline: classes.textFieldNotchedOutline,
                        input: classes.textFieldInput,
                    },
                }}
            />
            <Grid container className="ChampionCards" justify="center" spacing={themeConstants.padding}>
                {fetchChampionsData.map(value => (
                    <Grid key={value.key} item>
                        <div style={section}>
                            <ChampionCard champion={value}/>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
        }

        return ( page );
    }
}

Champions.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withTheme()(withStyles(styles)(Champions));
