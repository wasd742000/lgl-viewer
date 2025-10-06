import React, { useState, useEffect } from 'react';
import './FloatingMusicPlayer.css';

function FloatingMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1.0; // Ensure volume is set to maximum
      audioRef.current.muted = false; // Ensure audio is not muted
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });
    }
  };

  return (
    <div className="floating-music-player">
      <audio ref={audioRef} loop>
        <source src="/assets/audio/romantic-background.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button onClick={togglePlay} className="play-button">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}

export default FloatingMusicPlayer;