// API
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;
const ChampionsAPI = `${API_URL}/v1/champions`;
const GAMEVERSIONPARAMETER = "gameversion=";
const LEAGUEPARAMETER = `&tier=`;

export const fetchChampions = (gameVersion, league, setState) => {
    fetch(ChampionsAPI + "?" + GAMEVERSIONPARAMETER + gameVersion + LEAGUEPARAMETER + league).then(response => {
        if (response.status === 200) {
            let json = response.json();
            return json;
        } else {
            setState({fetchChampionsError: true, fetchChampionsData: [], fetchChampionsDone: true});
            return null;
        }
    }).then(data => {
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
    }).catch(error => {
        setState({fetchChampionsError: true, fetchChampionsData: [], fetchChampionsDone: true});
        console.log(error);
    });
}
