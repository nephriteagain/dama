import { useRef, useEffect } from 'react'
import { MdCropRotate } from 'react-icons/md'

import '../sass/Timer.scss';

type TimerTwoProp = {
  timerTwo: number
  currentTimer: number
}

function TimerTwo({ timerTwo, currentTimer } : TimerTwoProp) {
  


  const timerRef = useRef<HTMLDivElement>(null)


    function rotateClock() {
    if (timerRef.current === null) return

    const timerStyle = window.getComputedStyle(timerRef.current)
    const rotate = timerStyle.transform
    if (rotate === 'matrix(-1, 0, 0, -1, 0, 0)') {
      timerRef.current.style.transform = 'rotate(0deg)'
    } else {
      timerRef.current.style.transform = 'rotate(180deg)'
    }
  }

  function formatTime(deciseconds : number) {
    if (deciseconds === Infinity) return 'Unlimited'
    const minutes = Math.floor(deciseconds / 600);
    const seconds = Math.floor((deciseconds % 600) / 10);
    const deci = deciseconds % 10;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${deci}`;
  };

  
  useEffect(() => {
    if (!timerRef.current) return

    if (currentTimer === 2) {
      timerRef.current.style.backgroundColor = 'blue'
      timerRef.current.style.color = '#fff'
    } else {
      timerRef.current.style.backgroundColor = '#fff'
      timerRef.current.style.color = '#000'
    }
  }, [currentTimer])

  return (
    <div className='timer-two'>
      <div className='timer-counter-two' ref={timerRef}>{formatTime(timerTwo)}</div>
      <span className='flip-time' onClick={rotateClock}><MdCropRotate /></span>
    </div>
  );
}

export default TimerTwo;
