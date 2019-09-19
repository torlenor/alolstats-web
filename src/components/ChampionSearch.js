import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// API
import { fetchChampionNames } from "../api/FetchChampions"

// THEME
import reactSelectTheme from '../theme/ReactSelectTheme';

function ChampionSearch(props) {
    const [data, setData] = useState([]);
    const [didLoad, setDidLoad] = useState(false);
    const [error, setError] = useState(false);
    const [selected, setSelected] = useState("");

    useEffect(() => {
        if (props.selectedVersion !== undefined && props.selectedLeague !== undefined && props.selectedQueue !== undefined) {
            fetchChampionNames(props.selectedVersion, props.selectedLeague, props.selectedQueue, setData, setError, setDidLoad);
        }
    }, [props.selectedVersion, props.selectedLeague, props.selectedQueue]);


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

