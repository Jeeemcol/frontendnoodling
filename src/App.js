import React, { useState } from 'react';
import './styles/tailwind.scss';
import BBCIntro from './components/BBCIntro';
import AudioControl from './components/AudioControl';
import CmdrKeen from './components/CmdrKeen';
import Header from  './components/Header';
import Mid90sInternet from './components/Mid90sInternet';
import Messenger00s from './components/00sMessenger';
import UX2010s from './components/2010sUX';

function App() {
  // Below, useState initializes a piece of state for our component and provides a function to update it.
  // By using useState, we can manage state in our function component.
  // When we call the setter function returned by useState (eg setVolume), it schedules a re-render of the component.
  // React then creates a new Virtual DOM representation of the UI. During reconciliation, 
  // React diffs the current VDOM with the new one to determine the minimal set of changes required 
  // for the actual DOM, ensuring efficient updates.
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(true);
  const [username, setUsername] = useState('');
  const [audioControlVisible, setAudioControlVisible] = useState(true);

  const toggleAudioControl = () => {
      setAudioControlVisible(!audioControlVisible);
  };

  return (
    <div className="App relative">
      <Header 
          volume={volume} 
          setVolume={setVolume} 
          isMuted={isMuted} 
          setIsMuted={setIsMuted} 
      />
      <BBCIntro
        volume={volume}
        setIsMuted={setIsMuted}
        username={username}
        setUsername={setUsername}
      />
      <CmdrKeen
        volume={volume}
      />
    </div>
  );
}

export default App;