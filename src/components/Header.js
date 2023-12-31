import React, { useState, useEffect } from 'react';
import AudioControl from './AudioControl';
import './Header.scss';
import logo from './jmcle-logo-small.png';

function Header({ volume, setVolume, isMuted, setIsMuted }) {
    const [pageTitle, setPageTitle] = useState(document.title);

    useEffect(() => {
        setPageTitle(document.title);
    }, []);

    return (
        <header className="relative flex justify-center items-center">
            <a href="/">
                <span className="sr-only">Home</span>
                <img 
                    id="site-logo" 
                    src={logo} 
                    alt="Site logo, man with an old monitor for a head" 
                    className="absolute ml-1 left-0 top-0 mt-1 rounded-full overflow-hidden"
                />
            </a>
            <span id="page-title" className="absolute top-0 left-16 items-center top-1/4 hidden sm:block">Jm --about</span>
            <AudioControl
                volume={volume} 
                setVolume={setVolume} 
                isMuted={isMuted} 
                setIsMuted={setIsMuted} 
            />
        </header>
    );
}

export default Header;