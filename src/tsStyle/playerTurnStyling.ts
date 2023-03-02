export function playerTurnStyling(
  playerOneTurn: boolean,
  playerTurnStyle
) {
  if (playerOneTurn) {
    playerTurnStyle.color = 'red'
    playerTurnStyle.backgroundColor = 'rgb(255, 220, 220)'
  }
  else if (!playerOneTurn) {
    playerTurnStyle.color = 'blue'
    playerTurnStyle.backgroundColor = 'rgb(220, 220, 255)'
  }
}