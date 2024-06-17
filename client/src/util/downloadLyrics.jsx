const downloadLyrics = (lyrics, songName, type) => {
    // I'm Lazy to handle click when empty
    try {
        const lyric = (lyrics.map(l => l.props.children)).join('\n');
    
        const lyricBlob = new Blob([lyric], {type: 'text/plain'});
        const url = URL.createObjectURL(lyricBlob);
        const file = document.createElement('a');
        file.href = url;
        file.download = `${songName}.${type === 'Synced'? 'lrc': 'txt'}`;
        file.click();
        URL.revokeObjectURL(url);
    } catch (error) {
        
    }
}

export {
    downloadLyrics
}