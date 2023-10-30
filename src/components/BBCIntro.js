import React, { useRef, useState, useEffect } from 'react';//select specific hooks
import './BBCStyles.scss';

function BBCIntro({ volume, setIsMuted }) {
    // Uses useState hook (array returned with 2 variables: 1) a var and 2) a function)
    // 1) a form of getter 
    // 2) a form of setter(esque: it queues the change for react to manage when ready)
    const [isPoweredOn, setPoweredOn] = useState(false);
    const [isFocussed, setIsFocussed] = useState(false);
    const [sysMessage, setSysMessage] = useState("Start with sound? Yes (y)/ No (n)?");
    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();  // Prevents the page from reloading
        const value = e.target.elements.userInput.value.toLowerCase();
        if (value === 'y' || value === 'n') {
            setPoweredOn(true);
            if (value === 'y') {
                const audio = new Audio('/audio/bbc.mp3');
                audio.volume = volume;
                audio.play();
                setIsMuted(false);
            }
            else {
                setIsMuted(true);
            }
            e.target.elements.userInput.value = '';
        }
        else {
            setSysMessage("Invalid choice. Please enter 'y' to start with sound or 'n' to start without.");
            e.target.elements.userInput.value = '';
        }
    }

    function focusInput() {
        inputRef.current.focus();
    }

    // This useEffect will run every time the component re-renders with a new input field
    useEffect(() => {
        // This function adjusts the width of the input field based on its content.
        // The underscore cursor is made with an ::after on the .bbc-input-wrapper.
        // The default input width = 20 characters (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text#size)
        // which would push the underscore way to the right and not just after the 
        // input which is how the BBC Micro worked, hence this editing below
        const input = inputRef.current;

        function resizeInput() {
            input.style.width = `${input.value.length + 1}ch`;
        }        

        input.addEventListener('input', resizeInput);
        resizeInput();

        // Clean-up: even if we're using this component fairly persistently, it's
        // good practice to clean up as it could be used elsewhere for other reasons
        // later. This therefore makes it more extensible without memory issues
        return () => {
            input.removeEventListener('input', resizeInput);
        }
    }, [inputRef.current]); // This dependency ensures the useEffect runs for each new input element


    return (
        <div className="bbc-container" onClick={focusInput}>
            { !isPoweredOn && 
                <div className="bbc-output">
                    <p dangerouslySetInnerHTML={{ __html: sysMessage }}></p>
                    <form onSubmit={handleSubmit}>
                        <div className="bbc-prompt-line">
                            <span className="bbc-prompt">&gt;</span>
                            <div className="bbc-input-wrapper">
                                <input type="text" name="userInput" className="bbc-input" ref={inputRef} />
                            </div>
                        </div>
                    </form>
                </div>
            }
            { isPoweredOn && 
                <div className="bbc-output">
                    <p>BBC Computer 32K</p>
                    <p>Acorn DFS</p>
                    <p>BASIC</p>
                    <div className="bbc-prompt-line">
                        <span className="bbc-prompt">&gt;</span>
                        <div className="bbc-input-wrapper">
                            <input type="text" className="bbc-input" ref={inputRef} size="1"/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default BBCIntro;

//mock up a post-it note to stick 
//on the side of the display saying something like Say "Hello"

//could print a dot matrix style paper thing to seque

//reboot

//mid 90s internet