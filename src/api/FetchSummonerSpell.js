// API
const API_URL = `${process.env.REACT_APP_API_BASE_URL}`;

const SUMMONERSPELLS_API_BASE = `${API_URL}/v1/summonerspells`;
const GAMEVERSIONPARAMETER = "gameversion=";
const LANGUAGEPARAMETER = `language=`;

export const fetchSummonerSpells = (gameVersion, language, setData, setError, setDone) => {
    fetch(SUMMONERSPELLS_API_BASE + "?" + GAMEVERSIONPARAMETER + gameVersion + ".1&" + LANGUAGEPARAMETER + language).then(response => {
        if (response.status === 200) {
            let json = response.json();
            return json;
        } else {
            setData(null);
            setError(true);
            setDone(true);
            console.log("Error fetching Summoner Spells Stats, invalid response:", response);
            return null;
        }
    }).then(data => {
        if (data !== null) {
            setData(data);
            setError(true);
            setDone(true);
            console.log(data)
        } else {
            setData(null);
            setError(true);
            setDone(true);
            console.log("Error fetching Summoner Spells Stats, did not get any data");
        }
    }).catch(error => {
        setData(null);
        setError(true);
        setDone(true);
        console.log("Error fetching Summoner Spells Stats:", error);
    });
}
