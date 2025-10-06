import React, { useState, useRef, useEffect } from 'react';
import './FloatingMusicPlayer.css';

const FloatingMusicPlayer = () => {
  const audioFiles = [
    `${process.env.PUBLIC_URL}/assets/audio/romantic-background.mp3`,
    `${process.env.PUBLIC_URL}/assets/audio/romantic-background-2.mp3`,
    `${process.env.PUBLIC_URL}/assets/audio/romantic-background-3.mp3`,
  ];

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioFiles[currentTrackIndex]));

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = audioFiles[currentTrackIndex];
    if (isPlaying) {
      audio.play();
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [currentTrackIndex, isPlaying]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % audioFiles.length);
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === 0 ? audioFiles.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="floating-music-player">
      <div className="track-info">
        <span>Playing: Track {currentTrackIndex + 1}</span>
      </div>
      <div className="controls">
        <button onClick={playPrevious}>⏮️</button>
        <button onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
        <button onClick={playNext}>⏭️</button>
      </div>
    </div>
  );
};

export default FloatingMusicPlayer;