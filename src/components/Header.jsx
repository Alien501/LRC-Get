import React, { useState } from "react"

import '../css/Header.css'

export default function HeaderTop(){
    const [isQueryClicked, setIsQueryClicked] = useState(false)

    return(
        <header className="header-container">
            {isQueryClicked && <div className="modal-back-drop"></div>}
            <div className="header-app-name">
                LRC Get
            </div>
            <div className="query-icon-container" onClick={() => setIsQueryClicked(true)}>
                <div className="icon material-symbols-outlined">
                    question_mark
                </div>
            </div>

            <div className={`query-modal-container ${isQueryClicked? "active": ''}`}>
                <div className="close-btn-container" onClick={() => setIsQueryClicked(false)}>
                    <div className="material-symbols-outlined">
                        close
                    </div>
                </div>

                <div className="query-container">
                    <div className="query-question">
                        What is LRC?
                    </div>
                    <div className="query-answer">
                    LRC is a computer file format that synchronizes song lyrics with an audio file, such as MP3, Vorbis or MIDI.
                    </div>
                </div>

                <div className="query-container">
                    <div className="query-question">
                        What type of links are supported?
                    </div>
                    <div className="query-answer">
                    Currently the site supports only link from Spotify, soon support for Youtube music will be added
                    </div>
                </div>

                <div className="query-container">
                    <div className="query-question">
                        How to use .lrc files?
                    </div>
                    <div className="query-answer">
                        Place the downloaded LRC file near the mp3 file you have, and open any offline music palyer, see lyrics and enjoy your party!
                    </div>
                </div>
            </div>
        </header>
    )
}