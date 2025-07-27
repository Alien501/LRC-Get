export const copyLyrics = (lyrics) => {
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

    // Copy to clipboard
    navigator.clipboard.writeText(textContent).then(() => {
      // You could add a toast notification here
      console.log('Lyrics copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy lyrics:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    });
  } catch (error) {
    console.error('Error copying lyrics:', error);
  }
}; 