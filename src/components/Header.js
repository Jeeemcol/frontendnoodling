import React from 'react';
import AudioControl from './AudioControl';
import './Header.scss';

function Header({ volume, setVolume, isMuted, setIsMuted }) {
    return (
        <header>
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