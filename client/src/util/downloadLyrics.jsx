export const downloadLyrics = (lyrics, songName, tabName) => {
  try {
    // If lyrics is an array of React elements, extract the text content
    let textContent = '';
    
    if (Array.isArray(lyrics)) {
      // Extract text from React elements
      textContent = lyrics
        .map(lyric => {
          if (typeof lyric === 'string') {
            return lyric;
          }
          // If it's a React element, try to get the text content
          if (lyric && lyric.props && lyric.props.children) {
            return lyric.props.children;
          }
          return '';
        })
        .filter(text => text)
        .join('\n');
    } else if (typeof lyrics === 'string') {
      textContent = lyrics;
    } else {
      textContent = 'No lyrics available';
    }

    // Create filename
    const safeSongName = songName ? songName.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'lyrics';
    const filename = `${safeSongName}_${tabName.toLowerCase()}.txt`;

    // Create blob and download
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    window.URL.revokeObjectURL(url);
    
    console.log(`Lyrics downloaded as ${filename}`);
  } catch (error) {
    console.error('Error downloading lyrics:', error);
  }
}; 