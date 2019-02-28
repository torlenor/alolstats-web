import React, {Component} from 'react';

import './Champions.css';

import ChampionCard from './ChampionCard.js'

import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';

import Typography from '@material-ui/core/Typography';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const ChampionsAPI = `${API_URL}/v1/champions`;

export default class Champions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            hits: null,
            filteredHits: null,
            isFiltered: false,
            error: false
        };
    }

    fetchChampions(props) {
        var self = this;

        let gameversionparameter = "";
        if (props.parentProps.selectedVersion !== undefined) {
            gameversionparameter = "?gameversion=" + props.parentProps.selectedVersion;
        } else {
            gameversionparameter = "";
        }

        fetch(ChampionsAPI + gameversionparameter).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {
            let newHits = [];
            for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            newHits.push(data[key]);
                        }
                    }
                self.setState({hits: newHits.sort(function (a, b) {
                    return ('' + a.name).localeCompare(b.name);
                  })});
                self.setState({didMount: true});
        }).catch(error => {
            this.setState({error: true, didMount: true});
            console.log(error);
        });
    }

    componentWillReceiveProps(props) {
        this.fetchChampions(props);
      }

    componentDidMount() {
        this.fetchChampions(this.props);
    }

    toLower(item) {
        return item.toLowerCase();
    }

    handleChangeFilter = (event) => {
        var filterText = event.target.value.toLowerCase()
        if (filterText.length === 0) {
            this.setState({isFiltered: false});
            return
        } else if (filterText.length < 1) {
            return
        }
        const filtered = this.state.hits.filter(hit => {
            const roles = hit.roles.map(this.toLower)
            var i;
            for (i = 0; i < roles.length; i++) { 
              if (roles[i].includes(filterText)) {
                  return true;
              }
            }
            return hit.id.toLowerCase().includes(filterText) === true;
        }
        );
        this.setState({filteredHits: filtered, isFiltered: true})
    };

    render() {
        const {hits} = this.state;
        const {filteredHits} = this.state;

        let page;

        if (this.state.didMount === false) {
            page = <div className="Champions">
                <Typography variant="h5" gutterBottom component="h3">
                Loading Champions...<br></br>
                    Please wait...
                </Typography>
            </div>;
        } else if (this.state.error || hits === null) {
            page = <div className="Champions">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champions, please try again later!
                    </Typography>
                </div>
        } else if (this.state.isFiltered === true && filteredHits !== null) {
            page = <div className="Champions">
                        <TextField
                            id="outlined-full-width"
                            style={{ margin: 8 }}
                            label="Filter"
                            placeholder="Enter name or role (minimum 2 chars)"
                            fullWidth
                            onChange={this.handleChangeFilter}
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                        <Grid container className="demo" justify="center" spacing={16}>
                            {filteredHits.map(value => (
                                <Grid key={value.key} item>
                                    <ChampionCard champion={value}/>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
        } else {
            page = <div className="Champions">
            <TextField
                id="outlined-full-width"
                style={{ margin: 8 }}
                label="Filter"
                placeholder="Enter name or role (minimum 2 chars)"
                fullWidth
                onChange={this.handleChangeFilter}
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Grid container className="demo" justify="center" spacing={16}>
                {hits.map(value => (
                    <Grid key={value.key} item>
                        <ChampionCard champion={value}/>
                    </Grid>
                ))}
            </Grid>
        </div>
        }

        return (
            <div>
                <h2>{page}</h2>
            </div>
        );
    }
}
