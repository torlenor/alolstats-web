import React, { useState, useEffect, Fragment } from 'react';
import Select from 'react-select';

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


const selectStyles = {
    control: (provided, state) => ({ ...provided, color: state.isSelected ? 'red' : 'blue', backgroundColor: '#3f51b5', width: 200, boxShadow: "none",
    borderColor: '#6b79c6',
    '&:hover': {
      borderColor: 'white',
      border: '1px solid white',
    } }),
    option: (provided, state) => ({...provided, color: state.isSelected ? 'white' : 'white', backgroundColor: '#3f51b5', height: '100%',
    '&:hover': {
        backgroundColor: '#344395',
    }}),
    container: (provided, state)  => ({...provided, color: state.isSelected ? 'red' : 'blue', backgroundColor: 'white',}),
    placeholder:  styles => ({...styles, color: 'white'}),
    singleValue: styles => ({...styles, color: 'white',
    '&:hover': {
      borderColor: 'white',
      border: '1px solid white',
    }}),
    input: base => ({
      ...base,
      minWidth: 200,
      textAlign: "left",
      color: 'white',
      '& input': {
        font: 'inherit',
        color: 'white',
      },
    }),
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
            styles={selectStyles}
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
            placeholder="Search Champion..."
            options={data}
            onChange={handleChange}
            value={selected}
            />
        );
    } else if ( didLoad && error) {
        return (
            <Select
            styles={selectStyles}
            isDisabled={true}
            isLoading={isLoading}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="Champion Search"
            placeholder="Search Champion..."
            />
        );
    } else {
        return (
            <Select
            styles={selectStyles}
            isDisabled={isDisabled}
            isLoading={false}
            isClearable={isClearable}
            isRtl={isRtl}
            isSearchable={isSearchable}
            name="Champion Search"
            placeholder="Search Champion..."
            />
        );
    }
}
        
export default ChampionSearch;

