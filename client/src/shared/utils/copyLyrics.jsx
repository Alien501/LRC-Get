
const copyLyrics = (lyrics) => {
    // I'm Lazy to handle click when empty
    try {
        const lyric = (lyrics.map((l) => l.props.children).join('\n'));
        navigator.clipboard.writeText(lyric);
    } catch (error) {
        
    }
}

export {
    copyLyrics
}