// API
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const CHAMPIONS_API = `${API_URL}/v1/champions`;
const GAMEVERSIONPARAMETER = "gameversion=";
const LEAGUEPARAMETER = `tier=`;

export const fetchChampions = (gameVersion, league, setState) => {
    fetch(CHAMPIONS_API + "?" + GAMEVERSIONPARAMETER + gameVersion + "&" + LEAGUEPARAMETER + league).then(response => {
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
