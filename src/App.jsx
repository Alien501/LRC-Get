import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [songData, setSongData] = useState({
    id: 0,
    songName: 'Song Name',
    artistName: 'Artist Name',
    albumName: 'Album Name',
    isDataFetched: true,
    songLyrics: 'Song Lyrics',
    songDur: '',
    isError: false
  })
  
  const [songUrl, setSongUrl] = useState('')
  const [actk, setactk] = useState('BQAaQnftlCmXUSK2wP45ynDX2omMGdej4z6a4Jiqw3GT562UiXllsjNRqqW8k1VTfm7mXKGqcBrQDROSu9OfnU8Zfw95TqaloOcPrUFyd_VMkzNIlXo')

  const getToken = async () => {
    const tokenEndpoint = 'https://accounts.spotify.com/api/token'
    const clientId = '8cabd9e01f8c47c59192eba8fdc63838'
    const clientSecret = '960295fb723a4c0090b2624b74aed66c'
  
    try {
      const response = await axios.post(
        tokenEndpoint,
        `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      setactk(response.data.access_token)
    } catch (error) {
      console.error('Error fetching access token:', error.message);
    }
  }

  useEffect(() => {
    getToken();

    const intervalId = setInterval(() => {
      getToken();
    }, 3600000); // 3600000 milliseconds = 1 hour
    return () => clearInterval(intervalId);
  }, []);

  function onUrlChange(event) {
    setSongUrl(event.target.value)
  }

  async function getLyrics(artistName, songName, albumName, songDur) {
    try{
      const url = `https://lrclib.net/api/search?artist_name=${artistName}&track_name=${songName}&album_name=${albumName}&duration=${songDur}`
      const lyricResponse = await axios.get(
        url
      )
      if(lyricResponse.status === 200){
            if(lyricResponse.data.length !== 0){
              return lyricResponse.data[0].syncedLyrics.split('\n').map((lyrics, key) => <div id={key}>{lyrics}</div>)
            }
            else{
              return 'Song Lyrics not found!'
            }
      }
    }catch(error){
      return 'Something went Wrong!' + error
    }
  }


  async function onLinkSubmit(event) {
      event.preventDefault()
      const extractedId = songUrl.slice(31, 53)

    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks/${extractedId}`,
        {
          headers: {
            'Authorization': `Bearer ${actk}`
          }
        }
      )
      
      const newArtistName = response.data.album.artists.map(
        artist => artist.name + ' - ',
      )

      const newSongName = response.data.name
      const newAlbumName = response.data.album.name
      const newDur = response.data.duration_ms
      const [newSongLyrics] = await Promise.all([getLyrics(newArtistName, response.data.name, response.data.album.name, response.data.duration_ms)])
      setSongData(
        prevData => {
    
          const newSongData = {
            ...prevData,
            songName: newSongName,
            albumName: newAlbumName,
            artistName: newArtistName,
            isError: false,
            songDur: newDur,
            songLyrics: newSongLyrics,
            isDataFetched: true
          }
          return newSongData;
        }    
      )
    }
    catch (error) {
      // console.log("Change 2" + error);
      setSongData(prevData => {
        return {
          ...prevData,
          isError: true,
          isDataFetched: false
        }
      })
    }
  }

  return (
    <div className="app-container">
      <form onSubmit={onLinkSubmit} >
        <div className="form-container">
          <input type="text" className="form-link-input" name="songUrl" placeholder='Enter Spotify URL' value={songUrl} onChange={onUrlChange}/>
          <button className="submit-link">Fetch Lyrics</button>
        </div>
      </form>

      <div className="song-details-container">
        {(!songData.isDataFetched && songData.isError) && <h3>Couldn't fetch data check with url</h3>}
       <div className="song-detail">
          {songData.songName}
        </div>
        <div className="song-detail">
          {songData.albumName}
        </div>
        <div className="song-detail">
          {songData.artistName}
        </div>
      </div>

      <div className="fetched-lyric-container">
        {songData.songLyrics && songData.songLyrics}
      </div>
    </div>
  )
}

export default App
