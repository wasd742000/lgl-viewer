import React, { Suspense, useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import './App.css';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import LoveNotes from './components/LoveNotes';
import FloatingMedia from './components/FloatingMedia';
import CountdownTimer from './components/features/CountdownTimer';
import CelebrationMessage from './components/CelebrationMessage';

const LazyLoadedImage = React.lazy(() => import('./components/LazyLoadedImage'));
const LazyLoadedVideo = React.lazy(() => import('./components/LazyLoadedVideo'));

function App() {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [showConfetti, setShowConfetti] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setShowConfetti(false), 1000); // Allow 1s for fade-out effect
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showConfetti && (
        <div style={{ transition: 'opacity 1s', opacity: fadeOut ? 0 : 1 }}>
          <Confetti width={windowSize.width} height={windowSize.height} />
        </div>
      )}
      <Navbar />
      <main>
        <CelebrationMessage />
        <FloatingMedia />
        <section id="loveNotes">
          <LoveNotes />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
