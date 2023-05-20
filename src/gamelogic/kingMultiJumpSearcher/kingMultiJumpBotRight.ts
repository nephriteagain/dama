import { data } from "../../data/arrayData"
import { move } from "../kingMoveSearcher/kingBotLeft"

export function kingBotRightMulti(
  itemToMove: data,
  index: number,
  jumpDirection: string[],
  board: data[],
  jumpIndex: number,
  doubleTakeArr: data[],
  tempArrForJumps: data[],
  number: number,
  jumpDirection2nd?: string[],
  doubleTakeLanding?: data[],
) {
  if (number === 9) {

    const moveOne : move = board[jumpIndex + number]
    const moveTwo : move = board[jumpIndex + (number * 2)]
    const moveThree : move = board[jumpIndex + (number * 3)]
    const moveFour : move = board[jumpIndex + (number * 4)]
    const moveFive : move = board[jumpIndex + (number * 5)]
    const moveSix : move = board[jumpIndex + (number * 6)]
    const moveSeven : move = board[jumpIndex + (number * 7)]


    if (
        jumpDirection[index] !== 'top left' &&
        moveOne?.piece !== itemToMove?.piece &&
        moveOne?.piece !== null &&
        moveTwo?.playable &&
        moveTwo?.piece === null
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd && jumpDirection2nd.push('bot right')
        doubleTakeLanding && doubleTakeLanding.push(moveTwo)
      }
      if (
        jumpDirection[index] !== 'top left' &&
        moveOne?.playable &&
        moveOne?.piece === null &&
        moveTwo?.piece !== itemToMove?.piece &&
        moveTwo?.piece !== null &&
        moveThree?.playable &&
        moveThree?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd && jumpDirection2nd.push('bot right')
        doubleTakeLanding && doubleTakeLanding.push(moveThree)
      }
      if (
        jumpDirection[index] !== 'top left' &&
        moveOne?.playable &&
        moveOne?.piece === null &&
        moveTwo?.playable &&
        moveTwo?.piece === null &&
        moveThree?.piece !== itemToMove?.piece &&
        moveThree?.piece !== null &&
        moveFour?.playable &&
        moveFour?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd && jumpDirection2nd.push('bot right')
        doubleTakeLanding && doubleTakeLanding.push(moveFour)
      }
      if (
        jumpDirection[index] !== 'top left' &&
        moveOne?.playable &&
        moveOne?.piece === null &&
        moveTwo?.playable &&
        moveTwo?.piece === null &&
        moveThree?.playable &&
        moveThree?.piece === null &&
        moveFour?.piece !== itemToMove?.piece &&
        moveFour?.piece !== null &&
        moveFive?.playable &&
        moveFive?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd && jumpDirection2nd.push('bot right')
        doubleTakeLanding && doubleTakeLanding.push(moveFive)
      }
      if (
        jumpDirection[index] !== 'top left' &&
        moveOne?.playable &&
        moveOne?.piece === null &&
        moveTwo?.playable &&
        moveTwo?.piece === null &&
        moveThree?.playable &&
        moveThree?.piece === null &&
        moveFour?.playable &&
        moveFour?.piece === null &&
        moveFive?.piece !== itemToMove?.piece &&
        moveFive?.piece !== null &&
        moveSix?.playable &&
        moveSix?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd && jumpDirection2nd.push('bot right')
        doubleTakeLanding && doubleTakeLanding.push(moveSix)
      }
      if (
        jumpDirection[index] !== 'top left' &&
        moveOne?.playable &&
        moveOne?.piece === null &&
        moveTwo?.playable &&
        moveTwo?.piece === null &&
        moveThree?.playable &&
        moveThree?.piece === null &&
        moveFour?.playable &&
        moveFour?.piece === null &&
        moveFive?.playable &&
        moveFive?.piece === null &&
        moveSix?.piece !== itemToMove?.piece &&
        moveSix?.piece !== null &&
        moveSeven?.playable &&
        moveSeven?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd && jumpDirection2nd.push('bot right')
        doubleTakeLanding && doubleTakeLanding.push(moveSeven)
      }
    

  }

    }