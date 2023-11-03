import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import './CmdrKeen.scss';

function CmdrKeen() {
    const charEl = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(MotionPathPlugin);

        const tl = gsap.timeline();

        const screenWidth = window.innerWidth;
        const stopPosition = screenWidth / 4;

        // Create two separate timelines
        const backgroundTl = gsap.timeline({ repeat: -1, repeatDelay: 0 });
        const moveCharacterTl = gsap.timeline();

        // 1 Background position (in backgroundTl)
        backgroundTl.to('#keen-sprite', {
            backgroundPosition: '-166px',
            ease: 'steps(4)',
            duration: 0.6,
        });

        // 2 Move character to a position (in moveCharacterTl)
        moveCharacterTl.to('#keen-sprite', {
            x: stopPosition,
            duration: 2.5,
            ease: 'linear',
            onComplete: () => {
                charEl.current.classList.remove('character');
                charEl.current.classList.add('character-pogo');
            },
        });

        // To make them happen concurrently, start both timelines at the same time
        const mainTl = gsap.timeline();
        mainTl.add([backgroundTl, moveCharacterTl], 0);

        // 3 Pogo arc
        mainTl.to('#keen-sprite', {
            duration: 5,
            motionPath: {
                path: [
                    { x: stopPosition * 1.5, y: -40 },
                    { x: stopPosition * 2, y: 500 },
                ],
            },
            repeat: 0,
            repeatDelay: 0,
            backgroundPosition: '0px',
            onComplete: () => {
                document.querySelector('#keen-sprite').style.display = 'none';
            },
        });

    }, []);

    return (
        <div id="keen-sprite" className="character" ref={charEl}></div>
    );
}

export default CmdrKeen;
