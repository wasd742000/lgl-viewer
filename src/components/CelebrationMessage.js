import React from 'react';
import CountdownTimer from './features/CountdownTimer';
import './CelebrationMessage.css';

function CelebrationMessage() {
  return (
    <div className="celebration-message-container">
      <div className="celebration-header">
        <h1 className="celebration-title">HAPPY BIRTHDAY</h1>
        <p className="celebration-subtitle">LE GIA LINH - MY BEAUTIFUL LOVE</p>
        <p className="celebration-date"><span className="typing-animation">8th October 2003</span></p>
      </div>
      <div className="celebration-content">
        <p className="celebration-message">
          Another year of your amazing life, another year of our beautiful journey together.<br />
          Every moment with you feels like a precious memory worth treasuring forever.
        </p>
        <p className="celebration-wish">
          May your day be filled with endless joy, laughter, and love. You deserve all the happiness in the world.<br />
          Love you so much!
        </p>
      </div>
      <div className="countdown-timer-wrapper">
        <CountdownTimer />
      </div>
    </div>
  );
}

export default CelebrationMessage;
