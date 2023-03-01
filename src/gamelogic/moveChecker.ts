export function checkForMoves(
  itemToCheck: {},
  position: number,
  board: {},
  storeArr: [], 
  number: number
  ) {

  const moveSquare = board[position + number]
  // p1 move
  if (
    itemToCheck?.piece === 'z' &&
    moveSquare?.piece === null &&
    moveSquare?.playable
  ) {
    storeArr.push(moveSquare)
  }
  // p2 move
  if (
    itemToCheck?.piece === 'x' &&
    moveSquare?.piece === null &&
    moveSquare?.playable
  ) {
    storeArr.push(moveSquare)
  }

}