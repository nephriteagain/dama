import { data } from "../../data/arrayData"

export type move = (data|null|undefined)

export function kingBotLeft(
  itemToMove: data,
  position: number,
  kingJumpDirection: string|null,
  board: data[],
  tempArrForMoves: data[],
  tempArrForJumps: data[],
  jumpDirection: string[],
  number: number
) {
      const moveOne : move = board[position + number]
      const moveTwo : move = board[position + (number * 2)]
      const moveThree : move = board[position + (number * 3)]
      const moveFour : move = board[position + (number * 4)]
      const moveFive : move = board[position + (number * 5)]
      const moveSix : move = board[position + (number * 6)]
      const moveSeven : move = board[position + (number * 7)]

      if (number === 7) {
        if (kingJumpDirection ===  'top right') return
      if (moveOne?.piece === null && moveOne.playable === true) {
      tempArrForMoves.push(moveOne)
      if (moveTwo?.piece === null && moveTwo.playable === true) {
        tempArrForMoves.push(moveTwo)
        if (moveThree?.piece === null && moveThree.playable === true) {
          tempArrForMoves.push(moveThree)
          if (moveFour?.piece === null && moveFour.playable === true) {
            tempArrForMoves.push(moveFour)
            if (moveFive?.piece === null && moveFive.playable === true) {
              tempArrForMoves.push(moveFive)
              if (moveSix?.piece === null && moveSix.playable === true) {
                tempArrForMoves.push(moveSix)
                if (moveSeven?.piece === null && moveSeven.playable === true) {
                tempArrForMoves.push(moveSeven)
                }
              } else if (
      moveSix?.piece !== null &&
      moveSix?.piece !== itemToMove.piece &&
      moveSeven?.playable &&
      moveSeven?.piece === null
    ) {
                tempArrForJumps.push(moveSeven)
                jumpDirection && jumpDirection.push('bot left')

              }
            } else if (
      moveFive?.piece !== null &&
      moveFive?.piece !== itemToMove.piece &&
      moveSix?.playable &&
      moveSix?.piece === null
    ) {
                tempArrForJumps.push(moveSix)
                jumpDirection && jumpDirection.push('bot left')

                if (moveSeven?.piece === null && moveSeven.playable === true) {
                tempArrForJumps.push(moveSeven)
                jumpDirection && jumpDirection.push('bot left')

                }
              }
            
          } else if (
      moveFour?.piece !== null &&
      moveFour?.piece !== itemToMove.piece &&
      moveFive?.playable &&
      moveFive?.piece === null
    ) {
              tempArrForJumps.push(moveFive)
              jumpDirection && jumpDirection.push('bot left')

              if (moveSix?.piece === null && moveSix.playable === true) {
                tempArrForJumps.push(moveSix)
                jumpDirection && jumpDirection.push('bot left')

                if (moveSeven?.piece === null && moveSeven.playable === true) {
                tempArrForJumps.push(moveSeven)
                jumpDirection && jumpDirection.push('bot left')

                }
              }
            }

        } else if (
      moveThree?.piece !== null &&
      moveThree?.piece !== itemToMove.piece &&
      moveFour?.playable &&
      moveFour?.piece === null
    ) {
            tempArrForJumps.push(moveFour)
            jumpDirection && jumpDirection.push('bot left')

            if (moveFive?.piece === null && moveFive.playable === true) {
              tempArrForJumps.push(moveFive)
              jumpDirection && jumpDirection.push('bot left')

              if (moveSix?.piece === null && moveSix.playable === true) {
                tempArrForJumps.push(moveSix)
                jumpDirection && jumpDirection.push('bot left')

                if (moveSeven?.piece === null && moveSeven.playable === true) {
                tempArrForJumps.push(moveSeven)
                jumpDirection && jumpDirection.push('bot left')

                }
              }
            }
          }

      } else if (
      moveTwo?.piece !== null &&
      moveTwo?.piece !== itemToMove.piece &&
      moveThree?.playable &&
      moveThree?.piece === null
    ) {
          tempArrForJumps.push(moveThree)
          jumpDirection && jumpDirection.push('bot left')

          if (moveFour?.piece === null && moveFour.playable === true) {
            tempArrForJumps.push(moveFour)
            jumpDirection && jumpDirection.push('bot left')

            if (moveFive?.piece === null && moveFive.playable === true) {
              tempArrForJumps.push(moveFive)
              jumpDirection && jumpDirection.push('bot left')

              if (moveSix?.piece === null && moveSix.playable === true) {
                tempArrForJumps.push(moveSix)
                jumpDirection && jumpDirection.push('bot left')

                if (moveSeven?.piece === null && moveSeven.playable === true) {
                tempArrForJumps.push(moveSeven)
                jumpDirection && jumpDirection.push('bot left')

                }
              }
            }
          }
        }

    } else if (
      moveOne?.piece !== null &&
      moveOne?.piece !== itemToMove.piece &&
      moveTwo?.playable &&
      moveTwo?.piece === null
    ) {
        tempArrForJumps.push(moveTwo)
        jumpDirection && jumpDirection.push('bot left')

        if (moveThree?.piece === null && moveThree.playable === true) {
          tempArrForJumps.push(moveThree)
          jumpDirection && jumpDirection.push('bot left')

          if (moveFour?.piece === null && moveFour.playable === true) {
            tempArrForJumps.push(moveFour)
            jumpDirection && jumpDirection.push('bot left')

            if (moveFive?.piece === null && moveFive.playable === true) {
              tempArrForJumps.push(moveFive)
              jumpDirection && jumpDirection.push('bot left')

              if (moveSix?.piece === null && moveSix.playable === true) {
                tempArrForJumps.push(moveSix)
                jumpDirection && jumpDirection.push('bot left')

                if (moveSeven?.piece === null && moveSeven.playable === true) {
                tempArrForJumps.push(moveSeven)
                jumpDirection && jumpDirection.push('bot left')

                }
              }
            }
          }
        }
      }
      }
      
    }