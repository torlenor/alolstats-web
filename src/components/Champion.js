import React, {Component} from 'react';

import ChampionStats from "./ChampionPlotRoleDistribution"
import ChampionTextStatistics from './ChampionTextStatistics';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const API = `${API_URL}/v1/stats/champion/byid?id=`;
const GAMEVERSION = "9.2"
const VERSION = `&gameversion=${GAMEVERSION}`;

class Champion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            championstats: null,
            error: false
        };
    }

    componentWillReceiveProps(props) {
        let champion = props.match.params.champion;
        console.log(champion)
        
        fetch(API + champion + VERSION).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {
            if (data !== null) {
                this.setState({championstats: data, error: false, didMount: true});
            } else {
                this.setState({error: true, didMount: true});
            }
        }).catch(error => {
            this.setState({error: true, didMount: true})
        });
      }

    componentDidMount() {
        let champion = this.props.match.params.champion;
        console.log(champion)

        fetch(API + champion + VERSION).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {
            if (data !== null) {
                this.setState({championstats: data, error: false, didMount: true});
            } else {
                this.setState({error: true, didMount: true});
            }
        }).catch(error => {
            this.setState({error: true, didMount: true})
        });
    }

    render() {
        const {championstats} = this.state;

        let page;

        if (this.state.didMount === false) {
            page = <div className="content">
                <Typography variant="h4" gutterBottom component="h2">
                    {this.props.match.params.champion}
                </Typography>
                <Typography variant="h5" gutterBottom component="h3">
                Loading Champion informations...<br></br>
                    Please wait...
                </Typography>
            </div>;
        } else if (this.state.error || championstats === null) {
            page = <div className="content">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Champion Stats, please try again later!
                    </Typography>
            </div>;
        } else {
            page = <div className="Champion">
            <Typography variant="h4" gutterBottom component="h2">
                {this.props.match.params.champion}
            </Typography>
            <Grid container spacing={24} justify="center"style={{
margin: 0,
width: '100%',
}}>
                <Grid item xs>
                    <Paper>
                        <ChampionTextStatistics championStats={championstats}/>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper>
                        <ChampionStats championStats={championstats}/>
                    </Paper>
                </Grid>
            </Grid>

        </div>;
        }


        return (
            <div>
                {page}
            </div>
        )
    }
}

export default Champion;

