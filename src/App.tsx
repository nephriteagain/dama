import { useGlobalContext } from './context/GameContext'

import './App.css'
import Gameboard from './components/Gameboard'
import WinnerModal from './components/WinnerModal'


function App() {

  const {gameOver} = useGlobalContext()
  
  return (
    <div className="App">
      { gameOver &&
      <WinnerModal /> }
      <Gameboard />
    </div>
  )
}

export default App
