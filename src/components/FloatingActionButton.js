import React, { useState, useRef, useEffect } from 'react';
import './FloatingActionButton.css';

const FloatingActionButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const audioRef = useRef(new Audio(process.env.PUBLIC_URL + '/assets/audio/romantic-background.mp3'));

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!isAudioInitialized) {
      audio.play().catch((error) => {
        console.error('Audio playback failed:', error);
      });
      setIsAudioInitialized(true);
    } else if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <button className="fab" onClick={togglePlay}>
      {isPlaying ? 'Pause' : 'Play'}
    </button>
  );
};

export default FloatingActionButton;
