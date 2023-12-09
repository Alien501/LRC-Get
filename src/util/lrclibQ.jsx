import axios from "axios"

export default async function lrclibGetQ(songName) {
    try{
        const try2 = await axios.get(`https://lrclib.net/api/search?q=${songName}`)
        if(try2.data.length != 0){
            return {
                synced: (try2.data[0].syncedLyrics != null)?try2.data[0].syncedLyrics.split('\n').map((lyrics, key) => <div id={key}>{lyrics}</div>): 'Synced Lyrics Not Found!',
                plain: (try2.data[0].plainLyrics != null)?try2.data[0].plainLyrics.split('\n').map((lyrics, key) => <div id={key}>{lyrics}</div>): 'Plain Lyrics Not Found!',
                foundSyncedLyrics: (try2.data[0].syncedLyrics != null)? true: false,
                foundPlainLyrics: (try2.data[0].plainLyrics != null)? true: false
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