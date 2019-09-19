// API
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const CHAMPION_API = `${API_URL}/v1/stats/summonerspells/byid?id=`;
const GAMEVERSIONPARAMETER = "gameversion=";
const LEAGUEPARAMETER = `tier=`;
const QUEUEPARAMETER = `queue=`;

export const fetchSummonerSpellsStats = (champion, gameVersion, league, queue, setState) => {
    fetch(CHAMPION_API + champion + "&" + GAMEVERSIONPARAMETER + gameVersion + "&" + LEAGUEPARAMETER + league + "&" + QUEUEPARAMETER + queue).then(response => {
        if (response.status === 200) {
            let json = response.json();
            console.log(json);
            return json;
        } else {
            setState({fetchSummonerSpellsStatsData: null, fetchSummonerSpellsStatsError: true, fetchSummonerSpellsStatsDone: true});
            console.log("Error fetching Summoner Spells Stats, invalid response:", response);
            return null;
        }
    }).then(data => {
        if (data !== null) {
            setState({fetchSummonerSpellsStatsData: data, fetchSummonerSpellsStatsError: false, fetchSummonerSpellsStatsDone: true});
            console.log("Got some summoner spells stats data:", data)
        } else {
            setState({fetchSummonerSpellsStatsData: null, fetchSummonerSpellsStatsError: true, fetchSummonerSpellsStatsDone: true});
            console.log("Error fetching Summoner Spells Stats, did not get any data");
        }
    }).catch(error => {
        setState({fetchSummonerSpellsStatsData: null, fetchSummonerSpellsStatsError: true, fetchSummonerSpellsStatsDone: true});
        console.log("Error fetching Summoner Spells Stats:", error);
    });
}
