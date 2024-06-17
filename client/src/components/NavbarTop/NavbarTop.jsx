import {Button, Navbar, NavbarBrand, NavbarContent, useDisclosure } from "@nextui-org/react";
import React from "react";
import QueryModel from "../QueryModel/QueryModel";

import './NavbarTop.css';

const NavbarTop = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const accordianList = [
        {
            key: 1,
            airaLabel: 'Query 1',
            title: 'What is LRC?',
            content: 'LRC is a computer file format that synchronizes song lyrics with an audio file, such as MP3, Vorbis or MIDI.'
        },
        {
            key: 2,
            airaLabel: 'Query 2',
            title: 'What type of links are supported?',
            content: 'Currently the site supports only link from Spotify, soon support for Youtube music will be added'
        },
        {
            key: 3,
            airaLabel: 'Query 3',
            title: 'How to use .lrc files?',
            content: 'Place the downloaded LRC file near the mp3 file you have, and open any offline music palyer, see lyrics and enjoy your party!'
        }
    ]
    return (
        <>
            <div className="shadow-sm nav-top">
                <Navbar className="mx-w-[100%]" height="60px">
                    <NavbarBrand className="flex-shrink-0">
                        <p className="text-large font-semibold">LRC Get</p>
                    </NavbarBrand>
                    <NavbarContent className="flex-1 flex justify-end items-center" justify="end">
                        <Button onPress={onOpen} isIconOnly color="primary" aria-label="Query">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-help"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                        </Button>
                    </NavbarContent>
                </Navbar>
            </div>
            <QueryModel
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                key={"helo"}
                accordianList={accordianList}
            />
        </>
    )
}

export default NavbarTop;