import { useRef, useEffect } from 'react'

import {AiOutlineInfoCircle} from 'react-icons/ai'
import { BsFillFileRuledFill } from 'react-icons/bs'
import { RiTimerFlashLine } from 'react-icons/ri'

import { useGlobalContext } from "../context/GameContext"
import '../sass/GameModeModal.scss'


const GameModeModal = ({ showRules }) => {


  const {
    gameMode,
    setGameMode,
    timeLimit,
    setTimeLimit,
    setTimerOne,
    setTimerTwo
  } = useGlobalContext()


  const damaRef = useRef()
  const perdiganaRef = useRef()
  const gameModeRef = useRef('')
  const alertRef = useRef()
  const dropdropRef = useRef()



  function handleSelectChange(event) {
    event.preventDefault();
    let selectedValue = event.target.value

    switch (selectedValue) {
      case '5:00':
        setTimeLimit(3000);
        break;
      case '1:00':
        setTimeLimit(600);
        break;
      case '3:00':
        setTimeLimit(1800);
        break;
      case '10:00':
        setTimeLimit(6000);
        break;
      case 'Unlimited':
        setTimeLimit(Infinity);
        break;
      default:
        setTimeLimit(3000)
        break;
    }
    dropdropRef.current.style.opacity = '0'
  }


  useEffect(() => {
    setTimerOne(timeLimit)
    setTimerTwo(timeLimit)

    
  }, [timeLimit])



  function selectDamaMode() {
    perdiganaRef.current.classList.remove('selected-mode')
    damaRef.current.classList.add('selected-mode')

    gameModeRef.current = 'dama'

  }
  function selectPerdiganaMode() {
    damaRef.current.classList.remove('selected-mode')
    perdiganaRef.current.classList.add('selected-mode')

    gameModeRef.current = 'perdigana'

  }

  function formatTime (deciseconds) {
    if (deciseconds === Infinity) return 'Unlimited'
    const minutes = Math.floor(deciseconds / 600);
    const seconds = Math.floor((deciseconds % 600) / 10);
    const deci = deciseconds % 10;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}.${deci}`;
  };



  function startGame() {
    if (gameModeRef.current === 'dama' || gameModeRef.current === 'perdigana') {
      setGameMode(gameModeRef.current)
    } else {
      alertRef.current.style.transform = 'translate(-50%, 0%)'
      setTimeout(() => {
        alertRef.current.style.transform = 'translate(-50%, -500%)'
      }, 3000)
    }
  }

  function showTimer() {
    const dropdown = window.getComputedStyle(dropdropRef.current)
    const opacity = dropdown.opacity
    if (opacity === '0') {
      dropdropRef.current.style.opacity = '1'
    } else {
      dropdropRef.current.style.opacity = '0'
  }
}


  return (
    <div className='game-mode-modal-background'>
      <div className='game-mode-modal'>
        <p className="game-mode-header">
        Select a Game Mode
        </p>
        <div>
          <button className="mode-dama" ref={damaRef}
            onClick={selectDamaMode}
          >Dama
            <span className='span-info-dama'>
              <AiOutlineInfoCircle className='more-info-dama' />
            </span>
          </button>
          <button className="mode-perdigana" ref={perdiganaRef}
            onClick={selectPerdiganaMode}
          >Perdigana
            <span className='span-info-perdigana'>
            <AiOutlineInfoCircle className='more-info-perdigana' />
            </span> 
          </button> 

          <div className='selected-time'>
            {formatTime(timeLimit)}
          </div> 

          <select 
            className='time-dropdown'
            onChange={handleSelectChange}
            ref={dropdropRef}
          >
            <option defaultValue="5:00">5:00</option>
            <option value="1:00">1:00</option>
            <option value="3:00">3:00</option>
            <option value="10:00">10:00</option>
            <option value="Unlimited">Unlimited</option>
          </select>


        </div>
        <span className='rule-icon'
          onClick={showRules}
        >
          <BsFillFileRuledFill />
        </span>
        <span className='timer-icon' onClick={showTimer}>
          <RiTimerFlashLine />
        </span>
        <button className="btn-start-game"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
      <div className='notification' ref={alertRef}>
        <p>
        Pick a Game Mode First!
        </p>
      </div>
    </div> 
  )
}

export default GameModeModal