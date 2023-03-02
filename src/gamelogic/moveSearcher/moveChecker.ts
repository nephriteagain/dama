export function checkForMovesPlayerOne(
  itemToCheck: {},
  position: number,
  board: {},
  storeArr: [], 
  number: number
  ) {
  if (number === 9) return
  if (number === 7) return

  const moveSquare = board[position + number]
  // p1 move
  if (
    itemToCheck?.piece === 'z' &&
    moveSquare?.piece === null &&
    moveSquare?.playable
  ) {
    storeArr.push(moveSquare)
  }
}

export function checkForMovesPlayerTwo(
  itemToCheck: {},
  position: number,
  board: {},
  storeArr: [], 
  number: number
  ) {
  if (number === -9) return
  if (number === -7) return

  const moveSquare = board[position + number]
  // p1 move
  if (
    itemToCheck?.piece === 'x' &&
    moveSquare?.piece === null &&
    moveSquare?.playable
  ) {
    storeArr.push(moveSquare)
  }
}