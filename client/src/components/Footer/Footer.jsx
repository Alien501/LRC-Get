import { Button, Link, Tooltip } from "@nextui-org/react";
import React from "react";
import { Linkedin, Github, Mail, MessageCircle } from "lucide-react";

import './Footer.css';

const Footer = () => {

    return(
        <footer className="bg-background/50 backdrop-blur-md border-t border-divider">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col items-center gap-6">
                    <div className="text-center">
                        <p className="text-base font-semibold text-foreground mb-2">
                            Created By Alien501👽
                        </p>
                        <p className="text-sm text-foreground/60">
                            Get synchronized lyrics for your favorite songs
                        </p>
                    </div>
                    
                    <div className="social-links-container flex gap-3">
                        <Tooltip content="LinkedIn" placement="top">
                            <Button 
                                radius="full" 
                                variant="light" 
                                color="primary" 
                                isIconOnly 
                                as={Link} 
                                target="_blank" 
                                href="https://www.linkedin.com/in/vignesh-chellapandi-2207b5257/" 
                                className="footer-link transition-all duration-200 hover:scale-110"
                            >
                                <Linkedin size={20} />
                            </Button>
                        </Tooltip>
                        
                        <Tooltip content="GitHub" placement="top">
                            <Button 
                                radius="full" 
                                variant="light" 
                                color="primary" 
                                isIconOnly 
                                as={Link} 
                                target="_blank" 
                                href="https://github.com/Alien501" 
                                className="footer-link transition-all duration-200 hover:scale-110"
                            >
                                <Github size={20} />
                            </Button>
                        </Tooltip>
                        
                        <Tooltip content="Email" placement="top">
                            <Button 
                                radius="full" 
                                variant="light" 
                                color="primary" 
                                isIconOnly 
                                as={Link} 
                                target="_blank" 
                                href="mailto:cvignesh404@gmail.com" 
                                className="footer-link transition-all duration-200 hover:scale-110"
                            >
                                <Mail size={20} />
                            </Button>
                        </Tooltip>
                        
                        <Tooltip content="Telegram" placement="top">
                            <Button 
                                radius="full" 
                                variant="light" 
                                color="primary" 
                                isIconOnly 
                                as={Link} 
                                target="_blank" 
                                href="mailto:cvignesh404@gmail.com" 
                                className="footer-link transition-all duration-200 hover:scale-110"
                            >
                                <MessageCircle size={20} />
                            </Button>
                        </Tooltip>
                    </div>
                    
                    <div className="text-center">
                        <p className="text-xs text-foreground/50">
                            © 2024 LRC Get. Made with ❤️ for music lovers.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;