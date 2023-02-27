import { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GameContext';

import '../sass/Timer.scss'


function Timer() {
  const [deciseconds, setDeciseconds] = useState(100);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && deciseconds > 0) {
      interval = setInterval(() => {
        setDeciseconds(deciseconds => deciseconds - 1);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, deciseconds]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setDeciseconds(3000);
  };

  const formatTime = (deciseconds) => {
    const minutes = Math.floor(deciseconds / 600);
    const seconds = Math.floor((deciseconds % 600) / 10);
    const deci = deciseconds % 10;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${deci}`;
  };

  return (
    <div>
      <h1>{formatTime(deciseconds)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;
