import { useState } from 'react'

import './App.css'

import NavbarTop from './components/NavbarTop/NavbarTop'
import SongCard from './components/SongCard/SongCard'
import InputBox from './components/InputBox/InputBox'
import PrimaryButton from './components/PrimaryButton/PrimaryButton'
import LyricsCard from './components/LyricsCard/LyricsCard'
import Footer from './components/Footer/Footer'

import { copyLyrics } from './util/copyLyrics'
import { downloadLyrics } from './util/downloadLyrics'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [songLink, setSongLink] = useState('');
  const [songData, setSongData] = useState(
    {
      songName: '',
      albumName: '',
      artistName: '',
      albumImage: '',
      syncedLyrics: '',
      plainLyrics: ''
    }
  )

  async function onGetLyricsClicked() {
    setIsLoading(true);
    const res = await fetch(`${import.meta.env.VITE_MY_BACKEND_LINK}getSongData?url=${songLink}`);
    const datao = await res.json();
    if(res.ok && res.status === 200) {
      setIsLoading(false);
      setSongData(prev => {
        return {
          songName: datao.data.songName,
          albumName: datao.data.albumName,
          artistName: datao.data.artistName,
          albumImage: datao.data.imageUrl,
          syncedLyrics: datao?.lyrics?.syncedLyrics?.map((lyric, key) => <p key={key} className='text-small font-medium'>{lyric}</p>),
          plainLyrics: datao?.lyrics?.plainLyrics?.map((lyric, key) => <p key={key} className='text-small font-medium'>{lyric}</p>)
        }
      });
    }else {
      setSongData(prev => {
        return {
          songName: datao?.data?.songName || 'Something went wrong!',
          albumName: datao?.data?.albumName || '🙂',
          artistName: datao?.data?.artistName|| 'Try again',
          albumImage: datao?.data?.imageUrl || '',
          syncedLyrics: datao?.lyrics?.syncedLyrics?.map(lyric => <p key={'lyrics'} className='text-small font-medium'>{lyric}</p>) || 'Not Found',
          plainLyrics: datao?.lyrics?.plainLyrics?.map(lyric => <p key={'Something'} className='text-small font-medium'>{lyric}</p>) || 'Not Found'
        }
      });
    }
    setIsLoading(false);
  }

  function onClear() {
    setSongData(prev => {
      return {
        songName: '',
        albumName: '',
        artistName: '',
        albumImage: '',
        syncedLyrics: '',
        plainLyrics: ''
      }
    })
  }

  function handleCopy(event, tabName) {
    const lyrics = tabName === 'Synced'? songData.syncedLyrics: songData.plainLyrics;
    copyLyrics(lyrics);
  }

  function handleDownload(event, tabName) {
    const lyrics = tabName === 'Synced'? songData.syncedLyrics: songData.plainLyrics;
    downloadLyrics(lyrics, songData.songName, tabName);
  }

  return (
    <>
      <NavbarTop />
      <SongCard 
        songName={songData.songName}
        artistName={songData.artistName}
        albumName={songData.albumName}
        albumImage={songData.albumImage}
        key={'Song Card'}
      />
      <InputBox
        inputValue={songLink}
        setInputValue={setSongLink}
        onClear={onClear}
      />
      <div className='flex justify-center'>
        <PrimaryButton
          buttonTitle={'Get Lyrics'}
          buttonOnClick={onGetLyricsClicked}
          isLoading={isLoading}
        />
      </div>
      <LyricsCard 
        syncedLyrics={songData.plainLyrics}
        plainLyrics={songData.syncedLyrics}
        handleCopy={handleCopy}
        handleDownload={handleDownload}
      />
      <Footer />
      <Analytics />
    </>
  )
}

export default App
