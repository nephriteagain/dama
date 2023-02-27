import { useRef, useEffect } from 'react'

import '../sass/Timer.scss';

function TimerTwo({ timerTwo, currentTimer }) {
  

    useEffect(() => {
    if (currentTimer === 2) {
      timerRef.current.style.backgroundColor = 'blue'
      timerRef.current.style.color = '#fff'
    } else {
      timerRef.current.style.backgroundColor = '#fff'
      timerRef.current.style.color = '#000'
    }
  }, [currentTimer])

  const timerRef = useRef()

  const formatTime = (deciseconds) => {
    const minutes = Math.floor(deciseconds / 600);
    const seconds = Math.floor((deciseconds % 600) / 10);
    const deci = deciseconds % 10;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${deci}`;
  };

  return (
    <div className='timer-two'>
      <div className='timer-counter-two' ref={timerRef}>{formatTime(timerTwo)}</div>
    </div>
  );
}

export default TimerTwo;
