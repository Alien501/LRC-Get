import axios from "axios"

export default async function lrclibGetSign(artistName, songName, albumName, songDur) {
    try{
        const url = `https://lrclib.net/api/search?artist_name=${artistName}&track_name=${songName}&album_name=${albumName}&duration=${songDur}`
        const lyricResponse = await axios.get(url)
        if(lyricResponse.data.length !== 0){
            return {
                synced: (lyricResponse.data[0].syncedLyrics != null)?lyricResponse.data[0].syncedLyrics.split('\n').map((lyrics, key) => <div id={key}>{lyrics}</div>): 'Synced Lyrics Not Found',
                plain: (lyricResponse.data[0].plainLyrics != null)?lyricResponse.data[0].plainLyrics.split('\n').map((lyrics, key) => <div id={key}>{lyrics}</div>): 'Plain Lyrics Not Found',
                foundSyncedLyrics: (lyricResponse.data[0].syncedLyrics != null)? true: false,
                foundPlainLyrics: (lyricResponse.data[0].plainLyrics != null)? true: false
            }
        }else{
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