import React, { useRef, useEffect, useState } from 'react';
import { SoundHigh, SoundLow, SoundMin, SoundOff } from 'iconoir-react';
import { gsap } from 'gsap';
import './AudioControl.scss';

const colors = require('tailwindcss/colors');

function AudioControl({ volume, setVolume, isMuted, setIsMuted }) {
    const getVolumeIcon = () => {
        let activeIcon;
        if (isMuted || volume === 0) {
            activeIcon = <SoundOff className="sound-icon" color={colors.white} size={24} />;
        } else if (volume > 0 && volume <= 0.33) {
            activeIcon = <SoundMin className="sound-icon" color={colors.white} size={24} />;
        } else if (volume > 0.33 && volume <= 0.66) {
            activeIcon = <SoundLow className="sound-icon" color={colors.white} size={24} />;
        } else {
            activeIcon = <SoundHigh className="sound-icon" color={colors.white} size={24} />;
        }
        return activeIcon;
    }

    const controlRef = useRef(null);
    const [userChanged, setUserChanged] = useState(false);
    const autoMinimizeTimerRef = useRef(null);

    const startAutoMinimizeTimer = () => {
        if (autoMinimizeTimerRef.current) {
            clearTimeout(autoMinimizeTimerRef.current);
        }

        autoMinimizeTimerRef.current = setTimeout(() => {
            toggleAudioControls();
            setUserChanged(false);
        }, 3500); // 3.5 seconds delay
    }

    const toggleAudioControls = () => {
        const audioControlElement = controlRef.current;
        const activeIcon = getVolumeIcon();

        if (audioControlElement) {
            const iconWidth = activeIcon.props.size;
            const iconHeight = activeIcon.props.size;

            if (isMuted || volume === 0) {
                // Animate audio controls to the size of the active icon (SoundOff)
                gsap.to(audioControlElement, {
                    width: iconWidth,
                    height: iconHeight,
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        audioControlElement.style.display = 'none';
                    },
                });
            } else {
                // Animate audio controls to the size of the active icon (other volume icons)
                gsap.to(audioControlElement, {
                    width: iconWidth,
                    height: iconHeight,
                    opacity: 1,
                    duration: 1,
                    display: 'block',
                });
            }
        }
    }

    useEffect(() => {
        return () => {
            if (autoMinimizeTimerRef.current) {
                clearTimeout(autoMinimizeTimerRef.current);
            }
        };
    }, []);

    return (
        <section className='audio-controls' ref={controlRef}>
            <span>Audio Controls</span>
            <button
                className='text-center'
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                onClick={() => {
                    setIsMuted((prevMute) => !prevMute);
                    startAutoMinimizeTimer();
                }}
            >
                {getVolumeIcon()}
            </button>
            <span id='volumeDescription' className='sr-only'>
                {isMuted ? 'Volume is currently muted.' : `Volume level: ${Math.round(volume * 100)}%`}
            </span>
            <input
                type='range'
                id='volumeSlider'
                min='0'
                max='1'
                step='0.01'
                value={volume}
                onChange={(e) => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) {
                        setIsMuted((prevMute) => !prevMute)
                    }
                    startAutoMinimizeTimer();
                }}
                aria-valuenow={volume}
            />
        </section>
    );
}

export default AudioControl;
