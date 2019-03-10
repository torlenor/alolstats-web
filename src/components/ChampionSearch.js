import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// THEME
import reactSelectTheme from '../theme/ReactSelectTheme';

const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const ChampionsAPI = `${API_URL}/v1/champions`;
const LEAGUEPARAMETER = `&tier=`;

function ChampionSearch(props) {
    const [data, setData] = useState([]);
    const [didLoad, setDidLoad] = useState(false);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState("");

    let gameversionparameter = "";
    let version = "";
    if (props.selectedVersion !== undefined) {
        version = props.selectedVersion;
    }
    gameversionparameter = "?gameversion=" + version;

    let league = "";
    if (props.selectedLeague !== undefined) {
        league = props.selectedLeague.toUpperCase();
    }

    useEffect(() => {
        fetch(ChampionsAPI + gameversionparameter + LEAGUEPARAMETER + league).then(response => {
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
                let newHits = [];
                for (var key in jsonData) {
                    if (jsonData.hasOwnProperty(key)) {
                        newHits.push( { value: jsonData[key].id, label: jsonData[key].name } );
                    }
                }
                setData(newHits.sort(function (a, b) {
                    return ('' + a.name).localeCompare(b.name);
                    }));
                setDidLoad(true);
                setError(false);
            } else {
                setDidLoad(true);
                setError(true);
            }
        }).catch(error => {
            setDidLoad(true);
            setError(true);
        });
    }, [gameversionparameter, league]);


    const state = {
    isClearable: true,
    isDisabled: false,
    isLoading: false,
    isRtl: false,
    isSearchable: true,
  };

    const {
      isClearable,
      isSearchable,
      isDisabled,
      isLoading,
      isRtl,
    } = state;

    const handleChange = (selectedOption) => {
        if (selectedOption !== null) {
            props.routerHistory.push('/champions/'+selectedOption.value);
            setSelected(selectedOption.value);
        } else {
            setSelected("");
        }
    };

    if (didLoad && !error) {
        return (
            <Select
            styles={reactSelectTheme}
            theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
            ...theme.colors,
                primary25: 'hotpink',
                primary: 'black',
            },
            })}
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={false}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="Champion Search"
            placeholder="Search..."
            options={data}
            onChange={handleChange}
            value={selected}
            />
        );
    } else if ( didLoad && error) {
        return (
            <Select
            styles={reactSelectTheme}
            isDisabled={true}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="Champion Search"
            placeholder="Search..."
            />
        );
    } else {
        return (
            <Select
            styles={reactSelectTheme}
            isDisabled={isDisabled}
            isLoading={false}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="Champion Search"
            placeholder="Search..."
            />
        );
    }
}
        
export default ChampionSearch;

