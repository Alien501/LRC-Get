import { useQuery } from '@tanstack/react-query'

const fetchSongData = async (songLink) => {
  if (!songLink) {
    throw new Error('Song link is required')
  }

  const response = await fetch(`${import.meta.env.VITE_MY_BACKEND_LINK}getSongData?url=${encodeURIComponent(songLink)}`)
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  
  if (!data.data) {
    throw new Error('Invalid response format')
  }

  return data
}

export const useLyrics = (songLink, enabled = false) => {
  return useQuery({
    queryKey: ['lyrics', songLink],
    queryFn: () => fetchSongData(songLink),
    enabled: enabled && !!songLink,
    retry: (failureCount, error) => {
      // Don't retry if it's a 404 or validation error
      if (error.message.includes('Not Found') || error.message.includes('Invalid')) {
        return false
      }
      return failureCount < 2
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
} 