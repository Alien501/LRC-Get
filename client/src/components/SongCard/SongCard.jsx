import { Card, CardBody, CardHeader, Image, CardFooter } from "@nextui-org/react";
import React from "react";
import Logo from '../../assets/Logo.png';

import './SongCard.css'

const SongCard = ({songName, albumName, artistName, albumImage}) => {
    return(
        <Card isFooterBlurred shadow="md" className="song-card w-full h-[300px] col-span-12 sm:col-span-7">
            <Image
                removeWrapper
                alt="Card background"
                className="z-10 w-full h-full object-cover"
                src={albumImage || Logo}
                height={100}
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