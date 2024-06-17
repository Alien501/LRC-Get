import axios from "axios";

const getLyricsByQuery = async (songName, albumName) => {
    try {
        const reqUrl = `https://lrclib.net/api/search?q=${songName} ${albumName}`;
        const res = await axios.get(reqUrl);
        if(res.data.length === 0) return null;
        return {
            syncedLyrics: (res.data[0].syncedLyrics != null)?res.data[0].syncedLyrics.split('\n'): ['Synced Lyrics Not Found!'],
            plainLyrics: (res.data[0].plainLyrics != null)?res.data[0].plainLyrics.split('\n'): ['Plain Lyrics Not Found!'],
            foundSyncedLyrics: (res.data[0].syncedLyrics != null)? true: false,
            foundPlainLyrics: (res.data[0].plainLyrics != null)? true: false
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export {
    getLyricsByQuery
}