import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import LyricsCard from './components/LyricsCard'
import defaultImg from '../public/android-chrome-192x192.png'
import HeaderTop from './components/Header'

function App() {
  const [songData, setSongData] = useState({
    id: 0,
    songName: 'Song Name',
    artistName: 'Artist Name',
    albumName: 'Album Name',
    isDataFetched: true,
    songLyrics: 'Song Lyrics',
    songLyricsSynced: 'Synced Lyrics',
    songLyricsPlain: 'Plain Lyrics',
    songDur: '',
    isError: false,
    imageUrl: defaultImg
  })

  const [isFetchPressed, setIsFetchPressed] = useState(false)
  
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
              return {synced: (lyricResponse.data[0].syncedLyrics != null)?lyricResponse.data[0].syncedLyrics.split('\n').map((lyrics, key) => <div id={key}>{lyrics}</div>): 'Synced Lyrics Not Found',
              plain: (lyricResponse.data[0].plainLyrics != null)?lyricResponse.data[0].plainLyrics.split('\n').map((lyrics, key) => <div id={key}>{lyrics}</div>): 'Plain Lyrics Not Found'}
            }
            else{
              const try2 = await axios.get(
                `https://lrclib.net/api/search?q=${songName}`
              )
              if(try2.status === 200 && try2.data.length != 0){
                return {synced: (try2.data[0].syncedLyrics != null)?try2.data[0].syncedLyrics.split('\n').map((lyrics, key) => <div id={key}>{lyrics}</div>): 'Synced Lyrics Not Found',
              plain: (try2.data[0].plainLyrics != null)?try2.data[0].plainLyrics.split('\n').map((lyrics, key) => <div id={key}>{lyrics}</div>): 'Plain Lyrics Not Found'}
              }
              else
              {
                try{
                  const try3 = await axios.get(`https://spotify-lyric-api-984e7b4face0.herokuapp.com/?url=${songUrl}&format=lrc`)
                  if(try3.status == 200){
                    if(try3.data.error === false && try3.data.syncType === "LINE_SYNCED"){
                      return{
                        synced: try3.data.lines.map(
                          (lyricObj, key) => <div id={key}>{`[${lyricObj.timeTag}] ${lyricObj.words}`}</div>
                        ),
                        plain: try3.data.lines.map(
                          (lyricObj, key) => <div id={key}>{`${lyricObj.words}`}</div>
                        )
                      }
                    }else if(try3.data.error === false && try3.data.syncType === "UNSYNCED"){
                      return{
                        synced: 'Synced Lyrics Not Found!',
                        plain: try3.data.lines.map(
                          (lyricObj, key) => <div id={key}>{`${lyricObj.words}`}</div>
                        )
                      }
                    }else{
                        return {synced: 'Synced Lyrics not found!',
                      plain: 'Plain Lyrics not found!'}
                    }
                  }
                  else if(try3.status === 404){
                    return {synced: 'Synced Lyrics not found!',
                  plain: 'Plain Lyrics not found!'}
                  }
                }catch(error){
                  return {synced: 'Synced Lyrics not found!',
        plain: 'Plain Lyrics not found!'}
                }
              }
            }
      } else{
        return {synced: 'Synced Lyrics not found!',
        plain: 'Plain Lyrics not found!'}
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
        artist => artist.name + ' ',
        )
        
        const newImageUrl = response.data.album.images[0].url
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
            songLyricsSynced: newSongLyrics.synced,
            songLyricsPlain: newSongLyrics.plain,
            imageUrl: newImageUrl,
            isDataFetched: true
          }
          return newSongData;
        }    
      )
    }
    catch (error) {
      setSongData(prevData => {
        return {
          ...prevData,
          isError: true,
          isDataFetched: false
        }
      })
    }

    setIsFetchPressed(true)
  }

  function copyClicked(event) {
    const lyricText = (event.target.name === 'synced')? songData.songLyricsSynced.map(
      (lyrics, key) => lyrics.props.children + '\n'
    ).join(''): songData.songLyricsPlain.map(
      (lyrics, key) => lyrics.props.children + '\n'
    ).join('')
    navigator.clipboard.writeText(lyricText)
  }

  function downloadClicked(event) {
    const lyricText = (event.target.name === 'synced')? songData.songLyricsSynced.map(
      (lyrics, key) => lyrics.props.children + '\n'
    ).join(''): songData.songLyricsPlain.map(
      (lyrics, key) => lyrics.props.children + '\n'
    ).join('')

    const blob = new Blob([lyricText], {type: 'text/plain'})
    const url = URL.createObjectURL(blob)

    const file = document.createElement('a')
    file.href = url
    file.download = `${songData.songName}.${event.target.name === 'synced'?'lrc':'txt'}`
    file.click()
    URL.revokeObjectURL(url)
  }

  function clearBtn(event) {
    event.preventDefault();
    setSongUrl('')
    setSongData(prevData => {
      return {
        id: 0,
        songName: 'Song Name',
        artistName: 'Artist Name',
        albumName: 'Album Name',
        isDataFetched: true,
        songLyrics: 'Song Lyrics',
        songLyricsSynced: 'Synced Lyrics',
        songLyricsPlain: 'Plain Lyrics',
        songDur: '',
        isError: false,
        imageUrl: defaultImg
      }
    })
  }

  return (
    <div className="app-container">
      <HeaderTop />

      <form onSubmit={onLinkSubmit} >
        <div className="form-container">
          <input type="text" className="form-link-input" name="songUrl" placeholder='Enter Spotify URL' value={songUrl} onChange={onUrlChange}/>
          <button className="submit-link">Fetch Lyrics</button>
        </div>
        <button className="submit-link btn-clear" onClick={clearBtn}>Clear</button>
      </form>


      <div className="song-details-container" style={
        {
          backgroundImage: songData.imageUrl
        }
      }>
        <div className="song-data-fake-container">
          <img src={songData.imageUrl} className='song-detail-bg'/>
        </div>
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
      <LyricsCard
        songLyrics={songData.songLyricsSynced}
        isFetchPressed={isFetchPressed}
        lyricType='synced'
        copyClicked={copyClicked}
        downloadClicked={downloadClicked}
      />
      <LyricsCard
        songLyrics={songData.songLyricsPlain}
        isFetchPressed={isFetchPressed}
        lyricType='plain'
        copyClicked={copyClicked}
        downloadClicked={downloadClicked}
      />

      <a href="https://github.com/Alien501" target='_new' className="footer">Created By Alien 501 👽</a>
    </div>
  )
}

export default App
