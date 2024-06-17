import axios from "axios";

const getLyricsFromSpotify = async (songUrl) => {
    try {
        const spotifyLyricsEndpoint = process.env.SPOTIFYLRC;
        const res = await axios.get(`${spotifyLyricsEndpoint}?url=${songUrl}&format=lrc`);
        if(res.status === 200) {
            if(res.data.error === false && res.data.syncType === "LINE_SYNCED"){
                return{
                  syncedLyrics: res.data.lines.map(
                    (lyricObj, key) => `[${lyricObj.timeTag}] ${lyricObj.words}`
                  ),
                  plainLyrics: res.data.lines.map(
                    (lyricObj, key) => `${lyricObj.words}`
                  ),
                  foundSyncedLyrics: true,
                  foundPlainLyrics: true
                }
              }else if(res.data.error === false && res.data.syncType === "UNSYNCED"){
                return{
                  syncedLyrics: ['Synced Lyrics Not Found!'],
                  plainLyrics: res.data.lines.map(
                    (lyricObj, key) => `${lyricObj.words}`
                  ),
                  foundSyncedLyrics: false,
                  foundPlainLyrics: true
                }
              }
            }
            return null;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export {
    getLyricsFromSpotify
}