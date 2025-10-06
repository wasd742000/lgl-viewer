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
          Happy Birthday to the person who makes my world brighter and my heart fuller. I hope your day is as wonderful as you are.
        </p>
        <p className="celebration-wish">
          You deserve all the happiness in the world.<br />
          Love you so much!
        </p>
      </div>
    </div>
  );
}

export default CelebrationMessage;
