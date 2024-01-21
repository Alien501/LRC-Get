import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import LyricsCard from './components/LyricsCard'
import defaultImg from '../public/android-chrome-512x512.png'
import HeaderTop from './components/Header'
import lrclibGetSign from './util/lrclib'
import lrclibGetQ from './util/lrclibQ'
import soptifyGetLyrics from './util/spotify'
import { Analytics } from '@vercel/analytics/react'

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
      const response = await lrclibGetSign(artistName, songName, albumName, songDur)
      if(response.foundPlainLyrics || response.foundSyncedLyrics){
        return response
      }else{
        const response2 = await lrclibGetQ(songName)
        if(response2.foundPlainLyrics || response2.foundSyncedLyrics){
          return response2
        }else{
              const response3 = await soptifyGetLyrics(songUrl)
              if(response3.foundPlainLyrics || response3.foundSyncedLyrics){
                  return response3
              }
        }
      }
      return {
        synced: 'Synced Lyrics Not Found!',
        plain: 'Plain Lyrics Not Found'
      }

    }catch(error){
      return {
        synced: 'Synced Lyrics Not Found!',
        plain: 'Plain Lyrics Not Found'
      }
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
            <button className="submit-link">
              <span className="material-symbols-outlined">lyrics</span>
              Get Lyrics
            </button>
        </div>
        <button className="submit-link btn-clear" onClick={clearBtn}>
        <span className="material-symbols-outlined">delete_forever</span>  
          Clear
        </button>
      </form>


      <div className="song-details-container" style={
        {
          backgroundImage: songData.imageUrl
        }
      }>
        <div className="song-data-fake-container">
          <img src={songData.imageUrl} className='song-detail-bg'/>
        </div>
        {(!songData.isDataFetched && songData.isError) && <h6>Couldn't fetch data check with url</h6>}
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

      <div className="footer">
        <p>
          Created By Alien 501 👽
        </p>
        <div className="footer-item-cont">
          <div className="footer-item">
            <a href="https://www.linkedin.com/in/vignesh-chellapandi-2207b5257/" target='_new' className="footer-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4"/>
              </svg>
            </a>

            <a href="https://github.com/Alien501" target='_new' className="footer-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
              </svg>
            </a>

            <a href="mailto:cvignesh404@gmail.com" target='_new' className="footer-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
              </svg>
            </a>

            <a href="https://t.me/Alien_501" className="footer-icon" target='_new'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telegram" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <Analytics />
    </div>
  )
}

export default App
