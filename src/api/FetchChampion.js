// API
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const CHAMPION_API = `${API_URL}/v1/stats/champion/byid?id=`;
const GAMEVERSIONPARAMETER = "gameversion=";
const LEAGUEPARAMETER = `tier=`;
const QUEUEPARAMETER = `queue=`;

export const fetchChampion = (champion, gameVersion, league, queue, setState) => {
    fetch(CHAMPION_API + champion + "&" + GAMEVERSIONPARAMETER + gameVersion + "&" + LEAGUEPARAMETER + league + "&" + QUEUEPARAMETER + queue).then(response => {
        if (response.status === 200) {
            let json = response.json();
            return json;
        } else {
            setState({fetchChampionData: null, fetchChampionError: true, fetchChampionDone: true});
            console.log("Error fetching Champion, invalid response:", response);
            return null;
        }
    }).then(data => {
        if (data !== null) {
            setState({fetchChampionData: data, fetchChampionsError: false, fetchChampionDone: true});
        } else {
            setState({fetchChampionData: null, fetchChampionError: true, fetchChampionDone: true});
            console.log("Error fetching Champion, did not get any data");
        }
    }).catch(error => {
        setState({fetchChampionData: null, fetchChampionError: true, fetchChampionDone: true});
        console.log("Error fetching Champion:", error);
    });
}
