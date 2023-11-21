import React, { useState } from "react";

import '../css/LyricsCard.css'

export default function LyricsCard({songLyrics, isFetchPressed, lyricType, copyClicked, downloadClicked}){
    const [isHovered, setIsHovered] = useState(false)

    return(
        <div className="fetched-lyric-container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div className="fake-cont">
                {(isFetchPressed && isHovered) && <button className="copy-content primary-btn" name={`${lyricType}`} onClick={copyClicked}>COPY</button>}
                {(isFetchPressed && isHovered) && <button className="download-content primary-btn" name={`${lyricType}`} onClick={downloadClicked}>DOWNLOAD</button>}
            </div>
                {songLyrics}
        </div>
    )
}