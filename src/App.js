import React, { Suspense, useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import LoveNotes from './components/LoveNotes';
import FloatingMedia from './components/FloatingMedia';
import CountdownTimer from './components/features/CountdownTimer';
import CelebrationMessage from './components/CelebrationMessage';

// const LazyLoadedImage = React.lazy(() => import('./components/LazyLoadedImage'));
// const LazyLoadedVideo = React.lazy(() => import('./components/LazyLoadedVideo'));

function App() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(false); // Confetti starts hidden
  const [fadeOut, setFadeOut] = useState(false);
  const [showContent, setShowContent] = useState(false); // New state to control content visibility
  const [password, setPassword] = useState(''); // State for the password input

  const isDevelopment = false; // Check if in development mode

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setShowConfetti(false), 1000); // Allow 1s for fade-out effect
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [showContent]); // Trigger confetti logic only when content is shown

  const handleCountdownEnd = () => {
    setShowContent(true); // Show content when countdown ends
    setShowConfetti(true); // Trigger confetti when countdown ends
  };

  const handlePasswordSubmit = () => {
    if (password === 'devpass') { // Replace 'devpass' with your desired secret password
      setShowContent(true);
      setShowConfetti(true);
    }
  };

  return (
    <div className="App">
      {!showContent && (
        <>
          <CountdownTimer onCountdownEnd={handleCountdownEnd} />
          {isDevelopment && ( // Only show the password box in development mode
            <div style={{ marginTop: '20px' }}>
              <input
                type="password"
                placeholder="Bypass for dev only =))"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handlePasswordSubmit}>Submit</button>
            </div>
          )}
        </>
      )}
      {showConfetti && (
        <div style={{ transition: 'opacity 1s', opacity: fadeOut ? 0 : 1 }}>
          <Confetti width={windowSize.width} height={windowSize.height} />
        </div>
      )}
      {showContent && (
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
      )}
    </div>
  );
}

export default App;
