import { useGlobalContext } from "../context/GameContext"

import '../sass/WinnerModal.scss'


function WinnerModal() {

  const { playerOneTurn, handleRestart, gameMode } = useGlobalContext()


  if (gameMode === 'dama') {
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
  if (gameMode === 'perdigana') {
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