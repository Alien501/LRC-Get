import { Card, CardFooter, CardHeader, Tab, Tabs } from "@nextui-org/react";
import React, { useState } from "react";

import './LyricsCard.css'
import PrimaryButton from "../PrimaryButton/PrimaryButton";

const LyricsCard = ({syncedLyrics, plainLyrics, handleCopy, handleDownload}) => {
    const LyricsTab = [
        {
            id: "Plain",
            label: "Plain",
            content: syncedLyrics
        },
        {
            id: "Synced",
            label: "Synced",
            content: plainLyrics
        }
    ];

    const [currentTab, setCurrentTab] = useState('Plain');

    return(
        <div className="lyrics-card-container mt-5">
            <Card radius="sm" shadow="md">
                <CardHeader className="flex-col">
                    <Tabs onSelectionChange={(k) => setCurrentTab(prev => k)} aria-label="Lyrics Tab" items={LyricsTab} color="primary">
                        {
                            (item) => 
                                <Tab key={item.id} title={item.label}>
                                    {item.content}
                                </Tab>
                            
                        }
                    </Tabs>
                </CardHeader>
                <CardFooter className="flex-row justify-between">
                    <PrimaryButton
                        buttonTitle={'Copy'}
                        buttonOnClick={(e) => handleCopy(e, currentTab)}
                        isLoading={false}
                        variant="flat"
                    />
                    <PrimaryButton
                        buttonTitle={'Download'}
                        buttonOnClick={(e) => handleDownload(e, currentTab)}
                        isLoading={false}
                        variant="flat"
                    />
                </CardFooter>
            </Card>
        </div>
    )
}

export default LyricsCard;