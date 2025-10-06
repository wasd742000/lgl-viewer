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
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio(audioFiles[currentTrackIndex]));

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = audioFiles[currentTrackIndex];
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error('Audio play was interrupted:', error);
      });
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [currentTrackIndex, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, [currentTrackIndex]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error('Audio play was interrupted:', error);
      });
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
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default FloatingMusicPlayer;