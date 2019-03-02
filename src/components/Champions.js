import React, {Component} from 'react';

import './Champions.css';

import ChampionCard from './ChampionCard.js'

import Grid from "@material-ui/core/Grid";
import TextField from '@material-ui/core/TextField';

// import Checkbox from '@material-ui/core/Checkbox';

import Typography from '@material-ui/core/Typography';

// import Fab from '@material-ui/core/Fab';

// import green from '@material-ui/core/colors/green';
// import grey from '@material-ui/core/colors/grey';

// import Icon from '@material-ui/core/Icon';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const ChampionsAPI = `${API_URL}/v1/champions`;

//   const style = {
//     margin: 0,
//     top: 'auto',
//     right: 20,
//     bottom: 20,
//     left: 'auto',
//     position: 'fixed',
//     color: "white",
//     backgroundColor: green[500],
// };

// const style2 = {
//     margin: 0,
//     top: 'auto',
//     right: 150,
//     bottom: 20,
//     left: 'auto',
//     position: 'fixed',
//     color: "white",
//     backgroundColor: grey[500],
// };

export default class Champions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            hits: null,
            filteredHits: null,
            isFiltered: false,
            error: false,
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
        }
        const filtered = this.state.hits.filter(hit => {
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
                        <Grid container className="demo" justify="center" spacing={16}>
                            {filteredHits.map(value => (
                                <Grid key={value.key} item>
                                    <ChampionCard champion={value}/>
                                    {/* <Checkbox checked={this.checkChecked(value.key)} onChange={this.handleChange(value.key)} value={value.key} /> */}
                                </Grid>
                            ))}
                        </Grid>
                        {/* <Fab variant="extended" aria-label="Delete" onClick={this.unselectAll} style={style2}>
                            Unselect All
                        </Fab>
                        <Fab variant="extended" aria-label="Delete" style={style}>
                            <Icon>compare</Icon>
                            Compare
                        </Fab> */}
                    </div>
        } else {
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
            <Grid container className="demo" justify="center" spacing={16}>
                {hits.map(value => (
                    <Grid key={value.key} item>
                        <ChampionCard champion={value}/>
                        {/* <Checkbox checked={this.checkChecked(value.key)} onChange={this.handleChange(value.key)} value={value.key} /> */}
                    </Grid>
                ))}
            </Grid>
            {/* <Fab variant="extended" aria-label="Delete" onClick={this.unselectAll} style={style2}>
                Unselect All
            </Fab>
            <Fab variant="extended" aria-label="Delete" style={style}>
                <Icon>compare</Icon>
                Compare
            </Fab> */}
        </div>
        }

        return (
            <div>
                <h2>{page}</h2>
            </div>
        );
    }
}
