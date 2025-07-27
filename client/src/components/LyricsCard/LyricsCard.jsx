import { Card, CardFooter, CardHeader, Tab, Tabs, Chip, Skeleton } from "@nextui-org/react";
import React, { useState } from "react";
import { FileText, Music } from "lucide-react";

import './LyricsCard.css'
import PrimaryButton from "../PrimaryButton/PrimaryButton";

const LyricsCard = ({syncedLyrics, plainLyrics, handleCopy, handleDownload}) => {
    const LyricsTab = [
        {
            id: "Plain",
            label: "Plain Lyrics",
            content: syncedLyrics,
            count: Array.isArray(syncedLyrics) ? syncedLyrics.length : 0
        },
        {
            id: "Synced",
            label: "Synced Lyrics",
            content: plainLyrics,
            count: Array.isArray(plainLyrics) ? plainLyrics.length : 0
        }
    ];

    const [currentTab, setCurrentTab] = useState('Plain');
    
    // Check if we have any lyrics data
    const hasLyrics = (syncedLyrics && syncedLyrics.length > 0) || (plainLyrics && plainLyrics.length > 0);
    
    if (!hasLyrics) {
        return (
            <div className="lyrics-card-container">
                <Card radius="lg" shadow="lg" className="w-full">
                    <CardHeader className="flex-col pb-0">
                        <div className="flex items-center justify-between w-full mb-4">
                            <h3 className="text-xl font-bold text-foreground">Lyrics</h3>
                            <Chip 
                                color="default" 
                                variant="flat" 
                                size="sm"
                            >
                                No lyrics
                            </Chip>
                        </div>
                        <Tabs 
                            aria-label="Lyrics Tab" 
                            items={LyricsTab} 
                            color="primary"
                            variant="underlined"
                            isDisabled
                            classNames={{
                                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                cursor: "w-full bg-primary",
                                tab: "max-w-fit px-0 h-12",
                                tabContent: "group-data-[selected=true]:text-primary"
                            }}
                        >
                            {
                                (item) => 
                                    <Tab 
                                        key={item.id} 
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <span>{item.label}</span>
                                                <Chip 
                                                    size="sm" 
                                                    variant="flat" 
                                                    color="default"
                                                >
                                                    0
                                                </Chip>
                                            </div>
                                        }
                                    >
                                        <div className="p-6">
                                            <div className="text-center py-12">
                                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-full flex items-center justify-center">
                                                    <FileText className="w-8 h-8 text-primary-500" />
                                                </div>
                                                <h4 className="text-lg font-semibold text-foreground-600 dark:text-foreground-400 mb-2">
                                                    No Lyrics Available
                                                </h4>
                                                <p className="text-sm text-foreground-500 dark:text-foreground-500 max-w-md mx-auto">
                                                    Get lyrics by pasting a Spotify link above and clicking "Get Lyrics"
                                                </p>
                                            </div>
                                        </div>
                                    </Tab>
                            }
                        </Tabs>
                    </CardHeader>
                    <CardFooter className="flex-row justify-between pt-6">
                        <PrimaryButton
                            buttonTitle={'Copy'}
                            buttonOnClick={() => {}}
                            isLoading={false}
                            variant="bordered"
                            isDisabled
                        />
                        <PrimaryButton
                            buttonTitle={'Download'}
                            buttonOnClick={() => {}}
                            isLoading={false}
                            variant="flat"
                            isDisabled
                        />
                    </CardFooter>
                </Card>
            </div>
        );
    }
    
    return(
        <div className="lyrics-card-container">
            <Card radius="lg" shadow="lg" className="w-full">
                <CardHeader className="flex-col pb-0">
                    <div className="flex items-center justify-between w-full mb-4">
                        <h3 className="text-xl font-bold text-foreground">Lyrics</h3>
                        <Chip 
                            color="primary" 
                            variant="flat" 
                            size="sm"
                        >
                            {LyricsTab.find(tab => tab.id === currentTab)?.count || 0} lines
                        </Chip>
                    </div>
                    <Tabs 
                        onSelectionChange={(k) => setCurrentTab(prev => k)} 
                        aria-label="Lyrics Tab" 
                        items={LyricsTab} 
                        color="primary"
                        variant="underlined"
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                            cursor: "w-full bg-primary",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-primary"
                        }}
                    >
                        {
                            (item) => 
                                <Tab 
                                    key={item.id} 
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <span>{item.label}</span>
                                            <Chip 
                                                size="sm" 
                                                variant="flat" 
                                                color={item.id === 'Plain' ? 'secondary' : 'primary'}
                                            >
                                                {item.count}
                                            </Chip>
                                        </div>
                                    }
                                >
                                    <div className="p-6">
                                        <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
                                            {item.content}
                                        </div>
                                    </div>
                                </Tab>
                        }
                    </Tabs>
                </CardHeader>
                <CardFooter className="flex-row justify-between pt-6">
                    <PrimaryButton
                        buttonTitle={'Copy'}
                        buttonOnClick={(e) => handleCopy(e, currentTab)}
                        isLoading={false}
                        variant="bordered"
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