import { useGlobalContext } from './context/GameContext'


import './App.css'
import Gameboard from './components/Gameboard'
import WinnerModal from './components/WinnerModal'
import GameModeModal from './components/GameModeModal'


function App() {

  const {gameOver, gameMode} = useGlobalContext()
  
  return (
    <div className="App">
      { !gameMode &&
        <GameModeModal /> }
      { gameOver &&
      <WinnerModal /> }
      <Gameboard />

    </div>
  )
}

export default App
