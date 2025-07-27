const validateSpotifyUrl = (url) => {
    return url.includes('https://open.spotify.com/track/')
}

export {
    validateSpotifyUrl
}