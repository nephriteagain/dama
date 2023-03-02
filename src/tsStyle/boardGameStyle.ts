export function boardStyling(
  item,
  boardStyle,
  playerOneTurn
) {
  if (!item.playable) {
    boardStyle.background = 'linear-gradient(to top left, #111 0%, rgba(0, 0, 0, 0.80) 75%' 
  } else if (item?.highlighted) {
    boardStyle.backgroundColor = '#ccccff'
    boardStyle.cursor = 'pointer'
  } else if (item?.selected) {
    boardStyle.backgroundColor = '#6CD486'
  } else if (playerOneTurn) {
    boardStyle.backgroundColor = 'rgba(255, 0, 0, 0.08)'
  } else if (!playerOneTurn) {
    boardStyle.backgroundColor = 'rgba(0,0,255, 0.08)'
  }
}