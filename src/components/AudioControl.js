import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import { SoundHigh, SoundLow, SoundMin, SoundOff } from 'iconoir-react';
import './AudioControl.scss';

const colors = require('tailwindcss/colors');

//destructures props to use directly within the function
function AudioControl({ volume, setVolume, isMuted, setIsMuted }) {

    //dynamically set volume icons like Windows 11
    const getVolumeIcon = () => {
        if (isMuted || volume == 0) {
            // set colours.white value into color attribute of jsx block
            //button(css): 44px https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
            return <SoundOff className="sound-icon" color={colors.white} size={24} />;
        } else if (volume > 0 && volume <= 0.33) {
            return <SoundMin className="sound-icon" color={colors.white} size={24} />;
        } else if (volume > 0.33 && volume <= 0.66) {
            return <SoundLow className="sound-icon" color={colors.white} size={24} />;
        } else {
            return <SoundHigh className="sound-icon" color={colors.white} size={24} />;
        }
    };

    const controlRef = useRef(null);

    useEffect(() => {
        // This will run after the component mounts
        gsap.fromTo(controlRef.current, 
            { opacity: 0, x: -100 },   // Start from opacity 0 and x offset of -100
            { opacity: 1, x: 0, duration: 1 }  // Animate to opacity 1 and x offset of 0 in 1 second
        );
    }, []);

    return (
        <section className='audio-controls' ref={controlRef}>
            <header>Audio Controls</header>
            <button
                className='text-center'
                aria-label={isMuted ? "Unmute" : "Mute"}
                // @todo explain this bit (below)
                onClick={() => setIsMuted(prevMute => !prevMute)}
            >
                {getVolumeIcon()}
            </button>
            <span id="volumeDescription" className="sr-only">
                {isMuted ? "Volume is currently muted." : `Volume level: ${Math.round(volume * 100)}%`}
            </span>
            <input 
                type="range" 
                id="volumeSlider" 
                min="0" 
                max="1" 
                step="0.01" 
                value={volume} 
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                aria-valuenow={volume}
            />
        </section>
    );
}

//This ensures that when the component is used and provides incorrect props
//there will be a clear warning in the console
AudioControl.propTypes = {
    volume: PropTypes.number.isRequired,
    setVolume: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
    setIsMuted: PropTypes.func.isRequired,
};

export default AudioControl;