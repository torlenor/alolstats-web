// API
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const CHAMPION_API = `${API_URL}/v1/champion/byid?id=`;
const GAMEVERSIONPARAMETER = "gameversion=";
const LEAGUEPARAMETER = `tier=`;
const QUEUEPARAMETER = `queue=`;

export const fetchChampionInfo = (champion, gameVersion, league, queue, setState) => {
    fetch(CHAMPION_API + champion + "&" + GAMEVERSIONPARAMETER + gameVersion + "&" + LEAGUEPARAMETER + league + "&" + QUEUEPARAMETER + queue).then(response => {
        if (response.status === 200) {
            let json = response.json();
            return json;
        } else {
            setState({fetchChampionInfoData: null, fetchChampionInfoError: true, fetchChampionInfoDone: true});
            console.log("Error fetching Champion Info, invalid response:", response);
            return null;
        }
    }).then(data => {
        if (data !== null) {
            setState({fetchChampionInfoData: data, fetchChampionInfoError: false, fetchChampionInfoDone: true});
        } else {
            setState({fetchChampionInfoData: null, fetchChampionInfoError: true, fetchChampionInfoDone: true});
            console.log("Error fetching Champion Info, did not get any data");
        }
    }).catch(error => {
        setState({fetchChampionInfoData: null, fetchChampionInfoError: true, fetchChampionInfoDone: true});
        console.log("Error fetching Champion Info:", error);
    });
}
