import { useGlobalContext } from "../context/GameContext"

import { playerTurnStyling } from "../tsStyle/playerTurnStyling"
import { GrRobot } from 'react-icons/gr'

import '../sass/Gameboard.scss'


function PlayerTurnBar() {

  const { playerOneTurn, playWithBot} = useGlobalContext()

  const playerTurnStyle = {}
  playerTurnStyling(playerOneTurn, playerTurnStyle)

  if (!playWithBot) {
    return (
      <div className="player-turn"
      style={playerTurnStyle}
      >
        Player {playerOneTurn? 'One' : 'Two'}'s Turn
      </div>
    )
  }
  
  return (
    <div className="player-turn"
    style={playerTurnStyle}
    >
      {playerOneTurn ? 'Your Turn' : "Opponent's Turn"}
    </div>
  )
}

export default PlayerTurnBar