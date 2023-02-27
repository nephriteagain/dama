import { useState } from 'react'

import { useGlobalContext } from './context/GameContext'


import './App.css'
import Gameboard from './components/Gameboard'
import WinnerModal from './components/WinnerModal'
import GameModeModal from './components/GameModeModal'
import Rules from './components/Rules'


function App() {
  const [ openRules, setOpenRules ] = useState(false)

  const {gameOver, gameMode} = useGlobalContext()

  function showRules() {
    setOpenRules(true)
  }

  return (
    <div className="App">
      { !gameMode && <GameModeModal  showRules={showRules} /> }
      { gameOver && <WinnerModal /> }
      { openRules && <Rules setOpenRules={setOpenRules} openRules={openRules}/>}
      <Gameboard showRules={showRules} />
    </div>
  )
}

export default App
