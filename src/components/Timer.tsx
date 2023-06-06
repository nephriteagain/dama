import { useRef, useEffect } from 'react';
import { MdCropRotate } from 'react-icons/md'

import '../sass/Timer.scss';

type TimeProps = {
  timerOne: number
  currentTimer: number
}

function Timer({ timerOne, currentTimer } : TimeProps) {

  const timerRef = useRef<HTMLDivElement>(null)

    function rotateClock() {
      if (!timerRef.current) return

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

    if (currentTimer === 1) {
      timerRef.current.style.backgroundColor = 'red'
      timerRef.current.style.color = '#fff'
    } else {
      timerRef.current.style.backgroundColor = '#fff'
      timerRef.current.style.color = '#000'
    }
  }, [currentTimer])

  return (
    <div className='timer-one'>
      <div className='timer-counter-one' ref={timerRef}>{formatTime(timerOne)}</div>
      <span className='flip-time' onClick={rotateClock}><MdCropRotate /></span>
    </div>
  );
}

export default Timer;
