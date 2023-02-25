import { useGlobalContext } from "../context/GameContext"


import '../sass/WinnerModal.scss'


function WinnerModal() {

  const { playerOneTurn, handleRestart } = useGlobalContext()

  return (
    <div className='modal-background'>
      <div className='winner-modal'>
        <p>
        {!newGame && playerOneTurn ? 'PLAYER 1 WIN!' : 'PLAYER 2 WIN!'}
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

export default WinnerModal