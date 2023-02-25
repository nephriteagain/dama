import { useRef, useEffect } from 'react'
import {AiOutlineInfoCircle} from 'react-icons/ai'

import { useGlobalContext } from "../context/GameContext"
import '../sass/GameModeModal.scss'


const GameModeModal = () => {
  const {gameMode, setGameMode} = useGlobalContext()

  const damaRef = useRef()
  const perdiganaRef = useRef()
  const gameModeRef = useRef('')

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

  function startGame() {
    if (gameModeRef.current === 'dama' || gameModeRef.current === 'perdigana') {
      setGameMode(gameModeRef.current)
    } else {
      alert('PICK A GAME MODE FIRST!!!')
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
              <AiOutlineInfoCircle className='more-info-dama' />
          </button>
          <button className="mode-perdigana" ref={perdiganaRef}
            onClick={selectPerdiganaMode}
          >Perdigana 
            <AiOutlineInfoCircle className='more-info-perdigana' />
          </button> 
        </div>
        
        <button className="btn-start-game"
          onClick={startGame}
        >
          Start Game
        </button>
      </div>
    </div> 
  )
}

export default GameModeModal