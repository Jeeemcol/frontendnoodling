import React, { useRef, useState, useEffect } from 'react';//select specific hooks
import './BBCStyles.scss';
import DOMPurify from 'dompurify';

function BBCIntro({ volume, setIsMuted, username, setUsername, startCmdrKeenAnimation }) {
    // Uses useState hook (array returned with 2 variables: 1) a var and 2) a function)
    // 1) a form of getter 
    // 2) a form of setter(esque: it queues the change for react to manage when ready)
    const [isPoweredOn, setPoweredOn] = useState(false);
    const [isFocussed, setIsFocussed] = useState(false);
    const [promptIndex, setPromptIndex] = useState(0);
    const [sysMessage, setSysMessage] = useState("Start with sound? Yes (y)/ No (n)?");
    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();  // Prevents the traditional page load on a submission
        const value = DOMPurify.sanitize(e.target.elements.userInput.value);
        switch (promptIndex) {
            case 0:
                if (value === 'y' || value === 'n') {
                    setPoweredOn(true);
                    if (value === 'y') {
                        const audio = new Audio('/audio/bbc.mp3');//not dl unless y selected
                        audio.volume = volume;
                        audio.play();
                        setIsMuted(false);
                    }
                    else {
                        setIsMuted(true);
                    }
                    setSysMessage("BBC Computer 32K<br/>Acorn DFS<br/>BASIC");
                    setPromptIndex(prevIndex => prevIndex + 1);
                    e.target.elements.userInput.value = '';
                }
                else {
                    setSysMessage("Invalid choice. Please enter 'y' to start with sound or 'n' to start without.");
                    e.target.elements.userInput.value = '';
                }
                break;
            case 1:
                const helloPattern = /(hello|hi|hey|howdy|greetings|salutations|bonjour|hola|ciao|hallo|namaste|konnichiwa|aloha|ahlan|hej|hei)/i;
                if (helloPattern.test(value)) {
                    setSysMessage("Please enter your name.");
                    setPromptIndex(prevIndex => prevIndex + 1);
                } else {
                    setSysMessage("You have entered " + value.substring(0, 10) + ". <br/> Hint: say hello!");
                }
                e.target.elements.userInput.value = '';
                break;
            case 2:
                setUsername(value);
                setSysMessage("You have entered " + value + ". Continue with this name (y) or change it (n)?");
                setPromptIndex(prevIndex => prevIndex + 1);
                e.target.elements.userInput.value = '';
                break;
            case 3:
                if (value === 'y') {
                    setSysMessage("Then welcome, " + username + ". This was " + process.env.REACT_APP_MY_NAME + "'s first computer: A BBC Micro. " + process.env.REACT_APP_BBC_BLURB);
                    setPromptIndex(prevIndex => prevIndex + 1);
                    e.target.elements.userInput.value = '';
                    //trigger Keen after x seconds (give time for the reply to show)
                    startCmdrKeenAnimation(true);
                }
                else {
                    setPromptIndex(prevIndex => prevIndex - 1);
                    setSysMessage("Please enter your name.");
                    e.target.elements.userInput.value = '';
                }
                break;
            default:
                setSysMessage("What the?!<br/>Follow that pogo!");
                break;
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
        <> {/* fragment: In JSX, you can't return multiple sibling elements directly. 
            They need to be wrapped in a parent element or a fragment. */}
            <div className="bbc-container relative" onClick={focusInput}>
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
            </div>
            <div className="post-it-note absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Say "Hello"
            </div>
        </>
    );
}

export default BBCIntro;

//could print a dot matrix style paper thing to seque

//reboot

//mid 90s internet