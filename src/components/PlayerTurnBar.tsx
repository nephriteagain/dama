import { useGlobalContext } from "../context/GameContext"

import { playerTurnStyling } from "../tsStyle/playerTurnStyling"

import '../sass/Gameboard.scss'


function PlayerTurnBar() {

  const { playerOneTurn} = useGlobalContext()

  const playerTurnStyle = {}
  playerTurnStyling(playerOneTurn, playerTurnStyle)

  return (
    <div className="player-turn"
    style={playerTurnStyle}
    >
      Player {playerOneTurn? 'One' : 'Two'}'s Turn
    </div>
  )
}

export default PlayerTurnBar