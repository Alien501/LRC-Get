import { Card, CardBody, CardHeader, Image, CardFooter, Skeleton } from "@nextui-org/react";
import React from "react";
import Logo from '../../assets/Logo.png';
import { Music, Search, Play } from "lucide-react";

import './SongCard.css'

const SongCard = ({songName, albumName, artistName, albumImage}) => {
    const hasSongData = songName && artistName;
    
    if (!hasSongData) {
        return (
            <Card isFooterBlurred shadow="lg" className="song-card w-full h-[300px] col-span-12 sm:col-span-7 overflow-hidden">
                <div className="w-full h-full relative">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 dark:from-primary-950 dark:via-secondary-950 dark:to-primary-900"></div>
                    
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary-200 dark:bg-secondary-800 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary-300 dark:bg-primary-700 rounded-full opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
                    </div>
                    
                </div>
                
                <CardFooter className="absolute bg-black/30 backdrop-blur-sm bottom-0 z-10 border-t-1 border-white/20">
                    <div className="flex flex-grow gap-3 items-center">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Search className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Skeleton className="w-36 h-4 rounded-lg bg-white/30" />
                            <Skeleton className="w-24 h-3 rounded-lg bg-white/20" />
                        </div>
                    </div>
                </CardFooter>
            </Card>
        );
    }

    return(
        <Card isFooterBlurred shadow="md" className="song-card w-full h-[300px] col-span-12 sm:col-span-7">
            <Image
                removeWrapper
                alt="Card background"
                className="z-10 w-full h-full object-cover"
                src={albumImage || Logo}
                height={300}
                width={100}
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                <div className="flex flex-grow gap-2 items-center">
                <Image
                    alt="Breathing app icon"
                    className="rounded-full w-10 h-11 bg-black"
                    src={albumImage || Logo}
                />
                <div className="flex flex-col">
                    <p className="text-lg font-bold text-white">{songName}</p>
                    <p className="text-tiny text-white uppercase font-bold">{albumName}</p>
                </div>
                </div>
            </CardFooter>
        </Card>
    )
}

export default SongCard;