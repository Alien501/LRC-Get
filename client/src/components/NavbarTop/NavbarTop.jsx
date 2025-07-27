import {Button, Navbar, NavbarBrand, NavbarContent, useDisclosure, Tooltip } from "@nextui-org/react";
import React from "react";
import QueryModel from "../QueryModel/QueryModel";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon, HelpCircle } from "lucide-react";

import './NavbarTop.css';

const NavbarTop = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { theme, toggleTheme, isDark } = useTheme();
    
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
            <div className="shadow-sm nav-top backdrop-blur-md bg-background/60">
                <Navbar className="mx-w-[100%]" height="60px">
                    <NavbarBrand className="flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <img 
                                src="/android-chrome-192x192.png" 
                                alt="LRC Get Logo" 
                                className="w-8 h-8 rounded-lg shadow-sm"
                            />
                            <p className="text-large font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tight">
                                LRC Get
                            </p>
                        </div>
                    </NavbarBrand>
                    <NavbarContent className="flex-1 flex justify-end items-center gap-2" justify="end">
                        <Tooltip content="Toggle theme" placement="bottom">
                            <Button 
                                onPress={toggleTheme} 
                                isIconOnly 
                                variant="light" 
                                color="primary" 
                                aria-label="Toggle theme"
                                className="transition-all duration-200 hover:scale-110"
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            </Button>
                        </Tooltip>
                        <Tooltip content="Help & FAQ" placement="bottom">
                            <Button 
                                onPress={onOpen} 
                                isIconOnly 
                                color="primary" 
                                aria-label="Query"
                                className="transition-all duration-200 hover:scale-110"
                            >
                                <HelpCircle size={20} />
                            </Button>
                        </Tooltip>
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