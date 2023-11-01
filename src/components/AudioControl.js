import React, { useRef, useEffect, useState } from 'react';
import { SoundHigh, SoundLow, SoundMin, SoundOff, Gear } from 'iconoir-react';
import { gsap } from 'gsap';
import './AudioControl.scss';

const colors = require('tailwindcss/colors');

function AudioControl({ volume, setVolume, isMuted, setIsMuted }) {

    const controlRef = useRef(null);
    const [userChanged, setUserChanged] = useState(false);
    const autoMinimizeTimerRef = useRef(null);
    const [minimized, setMinimized] = useState(false);

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

        if (audioControlElement) {
            if (isMuted || volume === 0) {
                // Animate audio controls to hide (slide to the right)
                gsap.to(audioControlElement, {
                    x: window.innerWidth, // Slide to the right
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        audioControlElement.style.display = 'none';
                        document.querySelector('.audio-control-toggle').style.display = 'inline-block';
                        setMinimized(true); // Set the minimized state
                    },
                });
            } else {
                // Animate audio controls to show (slide in from the right)
                audioControlElement.style.display = 'inline-block';
                document.querySelector('.audio-control-toggle').style.display = 'none';
                gsap.to(audioControlElement, {
                    x: 0, // Slide in from the right
                    opacity: 1,
                    duration: 1,
                    onComplete: () => {
                        setMinimized(false); // Set the minimized state
                    },
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
        <>
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
            <button className="audio-control-toggle text-center absolute top-0 right-0"
                onClick={() => {
                    toggleAudioControls();
                    startAutoMinimizeTimer();
                }}
            >
                {getVolumeIcon()}
            </button>
        </>
    );
}

export default AudioControl;
