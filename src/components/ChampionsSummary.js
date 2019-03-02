import React, { useState, useEffect } from 'react';
import ChampionsSummaryTable from './ChampionsSummaryTable'

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
    const [fetchedGameVersion, setFetchedGameVersion] = useState("");
    const [fetchedLeague, setFetchedLeague] = useState("");

    let gameversionparameter = "";
    let gameversion = "9.4";
    if (props.parentProps.selectedVersion !== undefined) {
        gameversion = props.parentProps.selectedVersion;
    }
    gameversionparameter = "?gameversion=" + gameversion;

    let leagueParameter = "";
    let league = "ALL";
    console.log(props.parentProps);
    if (props.parentProps.selectedLeague !== undefined) {
        league = props.parentProps.selectedLeague;
        league = league.toUpperCase();
    }
    leagueParameter = "&tier=" + league;

    useEffect(() => {
        fetch(ChampionsStatsAPI + gameversionparameter + leagueParameter).then(response => {
            if (response.status === 200) {
                let json = response.json();
                return json;
            } else {
                setDidLoad(false);
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
                setFetchedGameVersion(gameversion);
                setFetchedLeague(league);
            } else {
                setDidLoad(false);
            }
        }).catch(error => {
            setDidLoad(false);
        });
    }, [gameversionparameter, leagueParameter]);

    if (didLoad) {
        return <div style={{margin: 5,}}><ChampionsSummaryTable data={data} gameVersion={fetchedGameVersion} league={fetchedLeague} /></div>;
    } else {
        return null;
    }
}

export default ChampionsSummary;
