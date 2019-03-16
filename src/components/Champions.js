import React, {Component} from 'react';

// CSS
import './Champions.css';

// Material-UI Components
import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

// ALoLStats Components
import ChampionCard from './ChampionCard.js'
import Progress from './Progress'

// API
import { fetchChampions } from "../api/FetchChampions"

export default class Champions extends Component {
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
                            style={{ margin: 8 }}
                            label="Filter"
                            autoComplete='off'
                            placeholder="Enter name or role"
                            fullWidth
                            autoFocus
                            onChange={this.handleChangeFilter}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <Grid container className="ChampionCards" justify="center" spacing={16}>
                            {filteredHits.map(value => (
                                <Grid key={value.key} item>
                                    <ChampionCard champion={value}/>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
        } else {
            document.title = "Champions - fuu.la";
            page = <div className="Champions">
            <TextField
                id="outlined-full-width"
                style={{ margin: 8 }}
                label="Filter"
                autoComplete='off'
                placeholder="Enter name or role"
                fullWidth
                autoFocus
                onChange={this.handleChangeFilter}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Grid container className="ChampionCards" justify="center" spacing={16}>
                {fetchChampionsData.map(value => (
                    <Grid key={value.key} item>
                        <ChampionCard champion={value}/>
                    </Grid>
                ))}
            </Grid>
        </div>
        }

        return ( page );
    }
}
