import React, { useState, useEffect } from 'react';

const Countdown = ({ endTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  function calculateTimeRemaining() {
    const difference = endTime * 1000 - Date.now();
    const timeLeft = {};

    if (difference > 0) {
      timeLeft.days = Math.floor(difference / (1000 * 60 * 60 * 24));
      timeLeft.hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      timeLeft.minutes = Math.floor((difference / 1000 / 60) % 60);
      timeLeft.seconds = Math.floor((difference / 1000) % 60);
    }

    return timeLeft;
  }

  const { days, hours, minutes, seconds } = timeRemaining;

  if (endTime * 1000 - Date.now() > 0) {
    return (
      <div>
        {days?.toString().padStart(2, '0')}d&nbsp;:&nbsp;
        {hours?.toString().padStart(2, '0')}h&nbsp;:&nbsp;
        {minutes?.toString().padStart(2, '0')}m&nbsp;:&nbsp;
        {seconds?.toString().padStart(2, '0')}s
      </div>
    );
  }
  return null;
};

export default Countdown;
