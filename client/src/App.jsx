import { useState } from 'react'

import './App.css'

import NavbarTop from './components/NavbarTop/NavbarTop'
import SongCard from './components/SongCard/SongCard'
import InputBox from './components/InputBox/InputBox'
import PrimaryButton from './components/PrimaryButton/PrimaryButton'
import LyricsCard from './components/LyricsCard/LyricsCard'
import Footer from './components/Footer/Footer'

import { useLyrics } from './hooks/useLyrics'
import { copyLyrics } from './util/copyLyrics'
import { downloadLyrics } from './util/downloadLyrics'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [songLink, setSongLink] = useState('')
  const [shouldFetch, setShouldFetch] = useState(false)

  const { 
    data: songData, 
    isLoading, 
    error, 
    refetch 
  } = useLyrics(songLink, shouldFetch)

  // Transform the data to match the original component expectations
  const transformedSongData = {
    songName: songData?.data?.songName || '',
    albumName: songData?.data?.albumName || '',
    artistName: songData?.data?.artistName || '',
    albumImage: songData?.data?.imageUrl || '',
    syncedLyrics: songData?.lyrics?.syncedLyrics?.map((lyric, key) => <p key={key} className='text-small font-medium'>{lyric}</p>) || '',
    plainLyrics: songData?.lyrics?.plainLyrics?.map((lyric, key) => <p key={key} className='text-small font-medium'>{lyric}</p>) || ''
  }

  async function onGetLyricsClicked() {
    if (!songLink.trim()) {
      return
    }
    setShouldFetch(true)
  }

  function onClear() {
    setSongLink('')
    setShouldFetch(false)
  }

  function handleCopy(event, tabName) {
    const lyrics = tabName === 'Synced' ? transformedSongData.syncedLyrics : transformedSongData.plainLyrics
    copyLyrics(lyrics)
  }

  function handleDownload(event, tabName) {
    const lyrics = tabName === 'Synced' ? transformedSongData.syncedLyrics : transformedSongData.plainLyrics
    downloadLyrics(lyrics, transformedSongData.songName, tabName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 flex flex-col">
      <NavbarTop />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
            Get Your Lyrics
          </h1>
        </div>

        {/* Song Card - Always show */}
        <div className="mb-8">
          <SongCard 
            songName={transformedSongData.songName}
            artistName={transformedSongData.artistName}
            albumName={transformedSongData.albumName}
            albumImage={transformedSongData.albumImage}
            key={'Song Card'}
          />
        </div>

        {/* Input Section */}
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="w-full max-w-md">
            <InputBox
              inputValue={songLink}
              setInputValue={setSongLink}
              onClear={onClear}
            />
          </div>
          
          <div className="flex gap-4">
            <PrimaryButton
              buttonTitle={'Get Lyrics'}
              buttonOnClick={onGetLyricsClicked}
              isLoading={isLoading}
            />
            
            {songData && (
              <PrimaryButton
                buttonTitle={'Refresh'}
                buttonOnClick={() => refetch()}
                isLoading={false}
                variant="bordered"
              />
            )}
          </div>
        </div>
        
        {/* Error Display */}
        {error && (
          <div className="flex justify-center mb-6">
            <div className="bg-danger-50 border border-danger-200 text-danger-700 px-6 py-4 rounded-lg max-w-md shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-danger-200 flex items-center justify-center">
                  <span className="text-danger-600 text-xs font-bold">!</span>
                </div>
                <p className="text-sm font-medium">Error: {error.message}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Lyrics Section - Always show */}
        <div className="mb-8">
          <LyricsCard 
            syncedLyrics={transformedSongData.plainLyrics}
            plainLyrics={transformedSongData.syncedLyrics}
            handleCopy={handleCopy}
            handleDownload={handleDownload}
          />
        </div>
      </main>
      
      <Footer />
      <Analytics />
    </div>
  )
}

export default App
