export function cursorPointers(
  playerOneTurn,
  item,
  chipStyle
) {
  if (playerOneTurn && item?.piece === 'z' && item?.movable) chipStyle.cursor = 'grab'
  if (playerOneTurn && item?.piece === 'x' && item?.movable) chipStyle.cursor = 'not-allowed'
  if (!playerOneTurn && item?.piece === 'x' && item?.movable) chipStyle.cursor = 'grab'
  if (!playerOneTurn && item?.piece === 'z' && item?.movable) chipStyle.cursor = 'not-allowed'
  if (playerOneTurn && item?.piece === 'z' && !item?.movable) chipStyle.cursor = 'not-allowed'
  if (!playerOneTurn && item?.piece === 'x' && !item?.movable) chipStyle.cursor = 'not-allowed'
  }