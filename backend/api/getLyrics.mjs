import { getLyricsByQuery } from "./lrclib/getLyricsByQuery.mjs";
import { getLyricsBySignature } from "./lrclib/getLyricsBySignature.mjs";
import { getLyricsFromSpotify } from "./spotify/getLyricsFromSpotify.mjs";
import { getSongData } from "./spotify/getSongData.mjs";

const getLyrics = async (req, res, next) => {
    let songData;
    try {
        const songUrl = req.query.url;
        if (songUrl === undefined)
            return res.status(401).send(
                {
                    message: 'Missing required parameter: url',
                    status: 401,
                    error: null
                }
            );
        songData = await getSongData(songUrl);
        if (songData.status == 500) return res.status(500).send(songData);
        // trying to get lyrics from LRCLib
        // 1. By Signature
        const tryOneLrcLib = await getLyricsBySignature(songData.data.artistName, songData.data.songName, songData.data.albumName, songData.data.songDuration);
        if (tryOneLrcLib) {
            return res.status(200).send(
                {
                    ...songData,
                    lyrics: tryOneLrcLib
                }
            )
        }
        // By Query
        const tryTwoLrcLib = await getLyricsByQuery(songData.data.songName, songData.data.albumName);
        if (tryTwoLrcLib) {
            return res.status(200).send(
                {
                    ...songData,
                    lyrics: tryTwoLrcLib
                }
            )
        }

        // From Spotify API
        const finalTry = await getLyricsFromSpotify(songUrl);
        if (finalTry) {
            return res.status(200).send(
                {
                    ...songData,
                    lyrics: finalTry
                }
            )
        }
    } catch (error) {
        console.error(error);
    }
    return res.status(404).send(
        {
            ...songData || null,
            status: 404,
            message: 'Lyrics not found'
        }
    )
}

export {
    getLyrics
}