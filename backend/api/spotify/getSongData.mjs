import axios from "axios";
import { currentAccessToken, getAccessToken } from "./spotify.mjs"

const ENDPOINT = 'https://api.spotify.com/v1/tracks/'

const getSongData = async (url) => {
    try {
        const acktToken = currentAccessToken;
        if(acktToken === null) 
        {
            const res = await getAccessToken();
            if(res) {
                getSongData(url);
            }else {
                return {
                            message: 'Internal server error',
                            status: 500,
                            error: 'Token expired'
                        }
            }
        }
            
        const songUrl = url.slice(31, 53);
        const res = await axios.get(
            ENDPOINT + songUrl,
            {
                headers: {
                    'Authorization': `Bearer ${acktToken}`
                }
            }
        );
        const songName = res.data.name;
        const albumName = res.data.album.name;
        const songDuration= res.data.duration_ms;
        const artistName = res.data.album.artists.map(artist => artist.name + ' ');
        const imageUrl = res.data.album.images[0].url;
        return {
                message: 'Song found!',
                error: null,
                status: 200,
                data: {
                        imageUrl: imageUrl,
                        songName: songName,
                        albumName: albumName,
                        songDuration: songDuration,
                        artistName: artistName
                    }
                }
    } catch (error) {
        // console.log(error);
        return {
                    message: 'Internal sevrer error',
                    status: 500,
                    error: error.message || error
                }
    }
}

export {
    getSongData
}