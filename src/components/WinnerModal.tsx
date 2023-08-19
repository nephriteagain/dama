import { useEffect } from "react"
import { useGlobalContext } from "../context/GameContext"

import '../sass/WinnerModal.scss'

type WinnerModalProps = {
  bodyHeight: number|undefined
}

function WinnerModal({bodyHeight}: WinnerModalProps) {

  const { playerOneTurn, handleRestart, gameMode, timeSup } = useGlobalContext()


  // useEffect(() => {
  //   const modalBackground = document.querySelector('modal-background') as HTMLDivElement
  //   if (bodyHeight && modalBackground) {
  //     modalBackground.style.height = `${bodyHeight}px`
  //   }
  // }, [bodyHeight])

  if (timeSup) {
    return (
    <div className='modal-background'>
      <div className='winner-modal'>
        <p>
        {playerOneTurn ? 'PLAYER TWO WIN!' : 'PLAYER ONE WIN!'} 
        </p>
        <button className="btn-new-game"
          onClick={handleRestart}
        >
          New Game
        </button>
      </div>
    </div>  
    )
  }


  else if (gameMode === 'dama') {
    return (
    <div className='modal-background'>
      <div className='winner-modal'>
        <p>
        {playerOneTurn ? 'PLAYER TWO WIN!' : 'PLAYER ONE WIN!'} 
        </p>
        <button className="btn-new-game"
          onClick={handleRestart}
        >
          New Game
        </button>
      </div>
    </div>  
    )
  }
  // else if (gameMode === 'perdigana') {
  else {
    return (
    <div className='modal-background'>
      <div className='winner-modal'>
        <p>
        {!playerOneTurn ? 'PLAYER TWO WIN!' : 'PLAYER ONE WIN!'} 
        </p>
        <button className="btn-new-game"
          onClick={handleRestart}
        >
          New Game
        </button>
      </div>
    </div>  
    )
  }
  
}

export default WinnerModal