import React, {Component} from 'react';

import './FreeRotation.css';

import ChampionCard from './ChampionCard.js'

import Grid from "@material-ui/core/Grid";
// import Paper from "@material-ui/core/Paper";

import Typography from '@material-ui/core/Typography';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const FreeRotationAPI = `${API_URL}/v1/champion-rotations`;
const API = `${API_URL}/v1/champion/bykey?key=`;

export default class FreeRotation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            didMount: false,
            hits: null,
            error: false
        };
    }

    componentDidMount() {
        var self = this;

        // const champ1 = {
        //     version: '9.2.1',
        //     id: 'XinZhao',
        //     key: '5',
        //     name: 'Xin Zhao',
        //     title: 'the Seneschal of Demacia',
        //     blurb: 'Xin Zhao is a resolute warrior loyal to the ruling Lightshield dynasty. Once condemned to the fighting pits of Noxus, he survived countless gladiatorial bouts, but after being freed by Demacian forces, he swore his life and allegiance to these brave...',
        //     info: {
        //       attack: 8,
        //       defense: 6,
        //       magic: 3,
        //       difficulty: 2
        //     },
        //     image: {
        //       full: 'XinZhao.png',
        //       sprite: 'champion4.png',
        //       group: 'champion',
        //       x: 192,
        //       y: 48,
        //       w: 48,
        //       h: 48
        //     },
        //     tags: [
        //       'Fighter',
        //       'Assassin'
        //     ],
        //     partype: 'Mana',
        //     stats: {
        //       hp: 570,
        //       hpperlevel: 92,
        //       mp: 273.8,
        //       mpperlevel: 35,
        //       movespeed: 345,
        //       armor: 35,
        //       armorperlevel: 3.5,
        //       spellblock: 32.1,
        //       spellblockperlevel: 1.25,
        //       attackrange: 175,
        //       hpregen: 8,
        //       hpregenperlevel: 0.7,
        //       mpregen: 7.256,
        //       mpregenperlevel: 0.45,
        //       crit: 0,
        //       critperlevel: 0,
        //       attackdamage: 66,
        //       attackdamageperlevel: 3,
        //       attackspeedoffset: 0,
        //       attackspeedperlevel: 3.5,
        //       attackspeed: 0.645
        //     },
        //     timestamp: '2019-02-02T08:07:58.974Z'
        //   };

        // const champ2 = {
        //     version: '9.2.1',
        //     id: 'Lucian',
        //     key: '236',
        //     name: 'Lucian',
        //     title: 'the Purifier',
        //     blurb: 'Once a Sentinel of Light, Lucian is a grim hunter of undying spirits, pursuing them relentlessly and annihilating them with his twin relic pistols. Consumed by the need to avenge his dead wife, he will not rest until Thresh, the specter who holds her...',
        //     info: {
        //       attack: 8,
        //       defense: 5,
        //       magic: 3,
        //       difficulty: 6
        //     },
        //     image: {
        //       full: 'Lucian.png',
        //       sprite: 'champion2.png',
        //       group: 'champion',
        //       x: 192,
        //       y: 0,
        //       w: 48,
        //       h: 48
        //     },
        //     tags: [
        //       'Marksman'
        //     ],
        //     partype: 'Mana',
        //     stats: {
        //       hp: 571,
        //       hpperlevel: 86,
        //       mp: 348.88,
        //       mpperlevel: 38,
        //       movespeed: 335,
        //       armor: 28,
        //       armorperlevel: 3,
        //       spellblock: 30,
        //       spellblockperlevel: 0.5,
        //       attackrange: 500,
        //       hpregen: 3.75,
        //       hpregenperlevel: 0.65,
        //       mpregen: 8.176,
        //       mpregenperlevel: 0.7,
        //       crit: 0,
        //       critperlevel: 0,
        //       attackdamage: 61,
        //       attackdamageperlevel: 2.75,
        //       attackspeedoffset: 0,
        //       attackspeedperlevel: 3.3,
        //       attackspeed: 0.638
        //     },
        //     timestamp: '2019-02-02T08:07:58.974Z'
        //   };

        // let newHits = [];
        // newHits.push(champ1);
        // newHits.push(champ2);

        // this.setState({didMount: true, hits: newHits})

        fetch(FreeRotationAPI).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                this.setState({error: true});
                return null;
            }
        }).then(data => {

            if (data.freeChampionIds === null) {
                this.setState({error: true, didMount: true})
                return
            }

            data
                .freeChampionIds
                .forEach(function (champKey) {
                    fetch(API + champKey).then((response) => {
                        if (response.ok) {
                            return response.json();
                        } else {
                            throw new Error('Server response wasn\'t OK');
                        }
                    }).then((json) => {
                        let newHits;
                        if (self.state.hits === null) {
                            newHits = [];
                            newHits.push(json);
                        } else {
                            newHits = self
                                .state
                                .hits
                                .slice();
                            newHits.push(json);
                        }
                        self.setState({hits: newHits.sort(function (a, b) {
                            return ('' + a.name).localeCompare(b.name);
                          })});
                        self.setState({didMount: true});
                    })
                });
        }).catch(error => {
            this.setState({error: true, didMount: true});
            console.log(error);
        });
    }

    render() {
        const {hits} = this.state;

        let page;

        if (this.state.didMount === false) {
            page = <div className="FreeRotation">
                <Typography variant="h5" gutterBottom component="h3">
                Loading Free Rotation...<br></br>
                    Please wait...
                </Typography>
            </div>;
        } else if (this.state.error || hits === null) {
            page = <div className="FreeRotation">
                <Typography variant="h5" gutterBottom component="h3">
                    Ooops, something bad happened!<br></br>
                    <br></br>Error receiving Free Rotation, please try again later!
                    </Typography>
                </div>
        } else {
            page = <div className="FreeRotation">
                <Grid container className="demo" justify="center" spacing={16}>
                    {hits.map(value => (
                        <Grid key={value.key} item>
                            {/* <Paper className="paper"> */}
                                <ChampionCard champion={value}/>
                            {/* </Paper> */}
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
