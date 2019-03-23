import React, { useState, useEffect } from 'react';
import ChampionsSummaryTable from './ChampionsSummaryTable'

import Typography from '@material-ui/core/Typography';
import Progress from './Progress'

import { constants as themeConstants } from "../theme/ConstantsTheme";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const ChampionsStatsAPI = `${API_URL}/v1/stats/champions`;

let counter = 0;
function createData(name, key, sampleSize, winRate, pickRate, banRate, averageKills, averageDeaths, averageAssists, roles) {
  counter += 1;
  return { id: counter, key, name, sampleSize, winRate, pickRate, banRate, averageKills, averageDeaths, averageAssists, roles };
}

function ChampionsSummary(props) {
    const [data, setData] = useState([]);
    const [didLoad, setDidLoad] = useState(false);
    const [error, setError] = useState(false);
    const [fetchedGameVersion, setFetchedGameVersion] = useState("");
    const [fetchedLeague, setFetchedLeague] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    let gameversionparameter = "";
    let gameversion = "";
    if (props.parentProps.selectedVersion !== undefined) {
        gameversion = props.parentProps.selectedVersion;
    }
    gameversionparameter = "?gameversion=" + gameversion;

    let leagueParameter = "";
    let league = "ALL";
    if (props.parentProps.selectedLeague !== undefined) {
        league = props.parentProps.selectedLeague;
        league = league.toUpperCase();
    }
    leagueParameter = "&tier=" + league;

    useEffect(() => {
        setIsUpdating(true);
        fetch(ChampionsStatsAPI + gameversionparameter + leagueParameter).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                setDidLoad(true);
                setError(true);
                return null;
            }
        }).then(jsonData => {
            if (jsonData !== null) {
                let rows = jsonData.map( value => {
                    return createData(value.championname, value.championrealid, value.samplesize, +(value.winrate*100).toFixed(2), 
                                                                                                +(value.pickrate*100).toFixed(2), 
                                                                                                +(value.banrate*100).toFixed(2), 
                                                                                                +(value.averagekills).toFixed(2), 
                                                                                                +(value.averagedeaths).toFixed(2), 
                                                                                                +(value.averageassists).toFixed(2),
                                                                                                value.roles
                                        );
                });
                setData(rows);
                setDidLoad(true);
                setError(false);
                setFetchedGameVersion(gameversion);
                setFetchedLeague(league);
                setIsUpdating(false);
            } else {
                setDidLoad(true);
                setError(true);
            }
        }).catch(error => {
            setDidLoad(true);
            setError(true);
        });
    }, [gameversionparameter, leagueParameter]);

    if (didLoad && !error) {
        document.title = "Champions Summary - fuu.la";
        return <div style={{marginLeft: themeConstants.padding, marginRight: themeConstants.padding}}>
                <ChampionsSummaryTable data={data} gameVersion={fetchedGameVersion} league={fetchedLeague} isUpdating={isUpdating} routerHistory={props.routerHistory} cookies={props.cookies}/>
            </div>;
    } else if ( didLoad && error) {
        return <div>
                <Typography variant="h5" gutterBottom component="h3">Ooops, something bad happened!<br></br><br></br>Error receiving Champions Summary, please try again later!</Typography>
            </div>;
    } else {
        return <Progress text="Loading Champions Summary..."/>;
    }
}

export default ChampionsSummary;
