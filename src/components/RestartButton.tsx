import { useGlobalContext } from "../context/GameContext"

import '../sass/Gameboard.scss'

function RestartButton() {

  const { handleRestart, handleReset } = useGlobalContext()

  return (
    <div className="restart-game">
      <button className="btn-restart"
        onClick={() => {
          handleRestart()
          handleReset()
        }}
      >Restart Game</button>
    </div>
  )
}

export default RestartButton