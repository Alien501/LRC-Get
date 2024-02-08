import axios from "axios";

export default async function soptifyGetLyrics(songUrl){
    try{
        const try3 = await axios.get(`https://sync-lyrics-api.vercel.app/?url=${songUrl}&format=lrc`);
        if(try3.status == 200){
          if(try3.data.error === false && try3.data.syncType === "LINE_SYNCED"){
            return{
              synced: try3.data.lines.map(
                (lyricObj, key) => <div id={key}>{`[${lyricObj.timeTag}] ${lyricObj.words}`}</div>
              ),
              plain: try3.data.lines.map(
                (lyricObj, key) => <div id={key}>{`${lyricObj.words}`}</div>
              ),
              foundSyncedLyrics: true,
              foundPlainLyrics: true
            }
          }else if(try3.data.error === false && try3.data.syncType === "UNSYNCED"){
            return{
              synced: 'Synced Lyrics Not Found!',
              plain: try3.data.lines.map(
                (lyricObj, key) => <div id={key}>{`${lyricObj.words}`}</div>
              ),
              foundSyncedLyrics: false,
              foundPlainLyrics: true
            }
          }else{
            return {
                foundSyncedLyrics: false,
                foundPlainLyrics: false,
                synced: 'Synced lyrics not found!',
                plain: 'Plain lyrics not found!',
            }
          }
        }
        else{
            return {
                foundSyncedLyrics: false,
                foundPlainLyrics: false,
                synced: 'Synced lyrics not found!',
                plain: 'Plain lyrics not found!',
            }
        }
    }catch(error){
        return {
            foundSyncedLyrics: false,
            foundPlainLyrics: false,
            synced: 'Synced lyrics not found!',
            plain: 'Plain lyrics not found!',
        }
    }
}
