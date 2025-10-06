import React, { useState, useRef } from 'react';
import './FloatingActionButton.css';

const FloatingActionButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(process.env.PUBLIC_URL + '/assets/audio/romantic-background.mp3'));

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button className="fab" onClick={togglePlay}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
};

export default FloatingActionButton;
