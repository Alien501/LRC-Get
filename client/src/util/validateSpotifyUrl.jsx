export const validateSpotifyUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // Trim whitespace
  const trimmedUrl = url.trim();
  
  if (trimmedUrl === '') {
    return false;
  }

  // Spotify URL patterns
  const spotifyPatterns = [
    /^https?:\/\/open\.spotify\.com\/track\/[a-zA-Z0-9]+(\?.*)?$/,
  ];

  // Check if URL matches any Spotify pattern
  return spotifyPatterns.some(pattern => pattern.test(trimmedUrl));
}; 