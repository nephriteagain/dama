import { useState, useEffect } from 'react'

import { useGlobalContext } from './context/GameContext'


import './App.css'
import Gameboard from './components/Gameboard'
import WinnerModal from './components/WinnerModal'
import GameModeModal from './components/GameModeModal'
import Rules from './components/Rules'


function App() {
  const [ openRules, setOpenRules ] = useState<boolean>(false)
  const [ bodyHeight, setBodyHeight] = useState<undefined|number>(undefined)

  const {gameOver, gameMode} = useGlobalContext()

  function showRules() {
    setOpenRules(true)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      const height = document.body.scrollHeight
      setBodyHeight(height)
    })
  }, [])

  return (
    <div className="App">
      { !gameMode && <GameModeModal  showRules={showRules} bodyHeight={bodyHeight}/> }
      { gameOver && <WinnerModal bodyHeight={bodyHeight}/> }
      { openRules && <Rules setOpenRules={setOpenRules} openRules={openRules}  />}
      <Gameboard showRules={showRules} />
    </div>
  )
}

export default App
