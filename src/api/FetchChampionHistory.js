// API
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const CHAMPION_HISTORY_API = `${API_URL}/v1/stats/championhistory/byid?id=`;
const GAMEVERSIONPARAMETER = "gameversion=";
const LEAGUEPARAMETER = `tier=`;

export const fetchChampionHistory = (champion, gameVersion, league, setState) => {
    fetch(CHAMPION_HISTORY_API + champion + "&" + GAMEVERSIONPARAMETER + gameVersion + "&" + LEAGUEPARAMETER + league).then(response => {
        if (response.status === 200) {
            let json = response.json();
            return json;
        } else {
            setState({fetchChampionHistoryData: null, fetchChampionHistoryError: true, fetchChampionHistoryDone: true});
            console.log("Error fetching Champion History, invalid response:", response);
            return null;
        }
    }).then(data => {
        if (data !== null) {
            setState({fetchChampionHistoryData: data, fetchChampionHistoryError: false, fetchChampionHistoryDone: true});
        } else {
            setState({fetchChampionHistoryData: null, fetchChampionHistoryError: true, fetchChampionHistoryDone: true});
            console.log("Error fetching Champion History, did not get any data");
        }
    }).catch(error => {
        setState({fetchChampionHistoryData: null, fetchChampionHistoryError: true, fetchChampionHistoryDone: true});
        console.log("Error fetching Champion History:", error);
    });
}
