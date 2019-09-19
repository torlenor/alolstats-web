// API
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const CHAMPIONS_API = `${API_URL}/v1/champions`;
const GAMEVERSIONPARAMETER = "gameversion=";
const LEAGUEPARAMETER = `tier=`;
const QUEUEPARAMETER = `queue=`;

export const fetchChampions = (gameVersion, league, queue, setState) => {
    fetch(CHAMPIONS_API + "?" + GAMEVERSIONPARAMETER + gameVersion + "&" + LEAGUEPARAMETER + league + "&" + QUEUEPARAMETER + queue).then(response => {
        if (response.status === 200) {
            let json = response.json();
            return json;
        } else {
            setState({fetchChampionsData: null, fetchChampionsError: true, fetchChampionsDone: true});
            console.log("Error fetching Champions, invalid response:", response);
            return null;
        }
    }).then(data => {
        if (data !== null) {
            let newHits = [];
            for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            newHits.push(data[key]);
                        }
                    }
                setState(
                    {
                        fetchChampionsData: newHits.sort(function (a, b) {
                            return ('' + a.name).localeCompare(b.name);
                        }),
                        fetchChampionsDone: true,
                        fetchChampionsError: false
                    });
        } else {
            setState({fetchChampionsData: null, fetchChampionsError: true, fetchChampionsDone: true});
            console.log("Error fetching Champions, did not get any data");
        }
    }).catch(error => {
        setState({fetchChampionsData: null, fetchChampionsError: true, fetchChampionsDone: true});
        console.log("Error fetching Champions:", error);
    });
}

export const fetchChampionNames = (gameVersion, league, queue, setData, setError, setDone) => {
    fetch(CHAMPIONS_API + "?" + GAMEVERSIONPARAMETER + gameVersion + "&" + LEAGUEPARAMETER + league + "&" + QUEUEPARAMETER + queue).then(response => {
        if (response.status === 200) {
            let json = response.json();
            return json;
        } else {
            setData(null);
            setError(true);
            setDone(true);
            console.log("Error fetching Champions, invalid response:", response);
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
                setError(false);
                setDone(true);
        } else {
            setData(null);
            setError(true);
            setDone(true);
            console.log("Error fetching Champions, did not get any data");
        }
    }).catch(error => {
        setData(null);
        setError(true);
        setDone(true);
        console.log("Error fetching Champions:", error);
    });
}
