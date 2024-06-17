import axios from "axios";

const getLyricsBySignature = async (artistName, songName, albumName, songDuration) => {
    try {
        const url = `https://lrclib.net/api/search?artist_name=${artistName}&track_name=${songName}&album_name=${albumName}&duration=${songDuration}`;
        const res = await axios.get(url);
        if(res.data.length !== 0) {
            return {
                syncedLyrics: (res.data[0].syncedLyrics !== null)? res.data[0].syncedLyrics.split('\n') : ['Synced Lyrics Not Found!'],
                plainLyrics: (res.data[0].plainLyrics !== null)? res.data[0].plainLyrics.split('\n') : ['Plain Lyrics not found!'],
                foundSyncedLyrics: (res.data[0].syncedLyrics != null)? true: false,
                foundPlainLyrics: (res.data[0].plainLyrics != null)? true: false
            }
        }
        return null;
    } catch (error) {
        console.log(error);
        return null
    }
}

export {
    getLyricsBySignature
}