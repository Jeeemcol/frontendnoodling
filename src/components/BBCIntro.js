import React, { useRef, useEffect } from 'react';
import './BBCStyles.scss';

function BBCIntro() {
    const inputRef = useRef(null);

    function focusInput() {
        inputRef.current.focus();
    }

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
    }, []);

    return (
        <div className="bbc-container" onClick={focusInput}>
            <div className="bbc-output">
                <p>BBC Computer 32K</p>
                <p>Acorn DFS</p>
                <p>BASIC</p>
                <div className="bbc-prompt-line">
                    <span className="bbc-prompt">&gt;</span>
                    <div className="bbc-input-wrapper">
                        <input type="text" className="bbc-input" ref={inputRef} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BBCIntro;

//mock up a post-it note to stick 
//on the side of the display saying something like Say "Hello"