import React, { useState, useEffect } from 'react';
import './CountdownTimer.css';

function CountdownTimer({ onCountdownEnd }) {
  const calculateTimeLeft = () => {
    const targetDate = new Date('2025-10-08T00:00:00');
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if countdown has ended (all values are 0 or undefined)
      if (!newTimeLeft.days && !newTimeLeft.hours && !newTimeLeft.minutes && !newTimeLeft.seconds) {
        if (onCountdownEnd) {
          onCountdownEnd();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onCountdownEnd]);

  return (
    <div className="countdown-timer visually-appealing" id="countdownTimer">
      <h2>Time Until Your Special Day:</h2>
      <div className="timer-display">
        <span>{timeLeft.days || '00'}</span> Days
        <span>{timeLeft.hours || '00'}</span> Hours
        <span>{timeLeft.minutes || '00'}</span> Minutes
        <span>{timeLeft.seconds || '00'}</span> Seconds
      </div>
    </div>
  );
}

export default CountdownTimer;
