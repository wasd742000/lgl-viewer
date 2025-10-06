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

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <Confetti width={windowSize.width} height={windowSize.height} />
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
