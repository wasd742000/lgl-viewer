import React, { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import LoveNotes from './components/LoveNotes';
import FloatingMedia from './components/FloatingMedia';
import CountdownTimer from './components/features/CountdownTimer';
import CelebrationMessage from './components/CelebrationMessage';
import FloatingMusicPlayer from './components/FloatingMusicPlayer';
import FloatingChatbox from './components/FloatingChatbox';

function App() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [password, setPassword] = useState('');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const isDevelopment = true;

  const audioRef = useRef(new Audio(process.env.PUBLIC_URL + '/assets/audio/romantic-background.mp3'));

  const handleResize = useCallback(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setShowConfetti(false), 1000);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showContent]);

  const handleCountdownEnd = useCallback(() => {
    setShowContent(true);
    setShowConfetti(true);
  }, []);

  const handlePasswordSubmit = useCallback(() => {
    if (password === 'devpass') {
      setShowContent(true);
      setShowConfetti(true);
    }
  }, [password]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const renderDevelopmentBypass = () => (
    <div style={{ marginTop: '20px' }}>
      <input
        type="password"
        placeholder="Bypass for dev only =))"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlePasswordSubmit}>Submit</button>
    </div>
  );

  const renderConfetti = () => (
    <div style={{ transition: 'opacity 1s', opacity: fadeOut ? 0 : 1 }}>
      <Confetti width={windowSize.width} height={windowSize.height} />
    </div>
  );

  const renderMainContent = () => (
    <>
      <Navbar />
      <main>
        <CelebrationMessage />
        <FloatingMedia />
        <section id="loveNotes">
          <LoveNotes />
        </section>
      </main>
      <Footer />
    </>
  );

  return (
    <div className="App">
      <div style={{ paddingBottom: '60px' }}> {/* Reserve space for the fixed footer */}
        {!showContent && (
          <>
            <CountdownTimer onCountdownEnd={handleCountdownEnd} />
            {isDevelopment && renderDevelopmentBypass()}
          </>
        )}
        {showConfetti && renderConfetti()}
        {showContent && renderMainContent()}
      </div>
      <FloatingMusicPlayer />
      <FloatingChatbox />
    </div>
  );
}

export default App;
