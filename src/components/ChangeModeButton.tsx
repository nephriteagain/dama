import { useGlobalContext } from '../context/GameContext'

import '../sass/Gameboard.scss'


function ChangeModeButton() {

  const {handleRestart, handleReset, setGameMode} = useGlobalContext()

  function changeGameMode() {
    setGameMode('')
  }
  
  return (
    <div className="change-mode">
      <button className="btn-mode"
        onClick = {
          () => {
            handleRestart()
            handleReset()
            changeGameMode()
          }
        }
      >
        Change Game Mode
      </button>
    </div>
  )
}

export default ChangeModeButton