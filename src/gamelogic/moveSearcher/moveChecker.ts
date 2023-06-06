import { data } from "../../data/arrayData"

export function checkForMovesPlayerOne(
  itemToCheck: data,
  position: number,
  board: data[],
  storeArr: data[], 
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
  itemToCheck: data,
  position: number,
  board: data[],
  storeArr: data[], 
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

export function checkForMovesOrJumpsPlayerOne(
  itemToCheck: data,
  position: number,
  board: data[],
  storeArr: data[], 
  number: number
) {
  if (number === 9) return
  if (number === 7) return

  const moveSquare = board[position + number]
  const jumpSquare = board[position + (number * 2)]
  // p1 move
  if (
    itemToCheck?.piece === 'z' &&
    moveSquare?.piece === null &&
    moveSquare?.playable
  ) {
    storeArr.push(moveSquare)
  }

  else if (
    itemToCheck?.piece === 'z' &&
    moveSquare?.piece ==='x' &&
    jumpSquare?.piece === null &&
    jumpSquare?.playable
  ) {
    storeArr.push(jumpSquare)
  }
}

export function checkForMovesOrJumpsPlayerTwo(
  itemToCheck: data,
  position: number,
  board: data[],
  storeArr: data[], 
  number: number
  ) {
  if (number === -9) return
  if (number === -7) return

  const moveSquare = board[position + number]
  const jumpSquare = board[position + (number * 2) ]
  // p1 move
  if (
    itemToCheck?.piece === 'x' &&
    moveSquare?.piece === null &&
    moveSquare?.playable
  ) {
    storeArr.push(moveSquare)
  }

  else if (
    itemToCheck?.piece === 'x' &&
    moveSquare?.piece === 'z' &&
    jumpSquare?.piece === null &&
    jumpSquare?.playable
  ) {
    storeArr.push(jumpSquare)
  }
}