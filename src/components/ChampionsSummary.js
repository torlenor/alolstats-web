import React, { useState, useEffect } from 'react';
import ChampionsSummaryTable from './ChampionsSummaryTable'

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const ChampionsStatsAPI = `${API_URL}/v1/stats/champions`;

let counter = 0;
function createData(name, key, sampleSize, winRate, pickRate, banRate, averageKills, averageDeaths, averageAssists) {
  counter += 1;
  return { id: counter, key, name, sampleSize, winRate, pickRate, banRate, averageKills, averageDeaths, averageAssists };
}

function ChampionsSummary(props) {
    const [data, setData] = useState([]);
    const [didLoad, setDidLoad] = useState(false);

    let gameversionparameter = "";
    if (props.parentProps.selectedVersion !== undefined) {
        gameversionparameter = "?gameversion=" + props.parentProps.selectedVersion;
    } else {
        gameversionparameter = "?gameversion=9.4";
    }

    useEffect(() => {
        fetch(ChampionsStatsAPI + gameversionparameter).then(response => {
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
                                                                                                +(value.averageassists).toFixed(2));
                });
                setData(rows);
                setDidLoad(true);
            } else {
                setDidLoad(false);
            }
        }).catch(error => {
            setDidLoad(false);
        });
    }, [gameversionparameter]); // Only re-run the effect if count changes

    if (didLoad) {
        return <ChampionsSummaryTable data={data} />;
    } else {
        return null;
    }
}

export default ChampionsSummary;
