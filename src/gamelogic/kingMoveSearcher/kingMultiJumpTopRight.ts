export function kingTopRightMulti(
  itemToMove: {},
  index: number,
  jumpDirection: string [],
  board: any [],
  jumpIndex: number,
  doubleTakeArr: [],
  jumpDirection2nd: string [],
  doubleTakeLanding: any [],
  tempArrForJumps: [],
  number: number
) {
  if (number === -7) {

    const moveOne = board[jumpIndex + number]
    const moveTwo = board[jumpIndex + (number * 2)]
    const moveThree = board[jumpIndex + (number * 3)]
    const moveFour = board[jumpIndex + (number * 4)]
    const moveFive = board[jumpIndex + (number * 5)]
    const moveSix = board[jumpIndex + (number * 6)]
    const moveSeven = board[jumpIndex + (number * 7)]


    if (
        jumpDirection[index] !== 'bot left' &&
        moveOne?.piece !== itemToMove?.piece &&
        moveOne?.piece !== null &&
        moveTwo?.playable &&
        moveTwo?.piece === null
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(moveTwo)
      }
      if (
        jumpDirection[index] !== 'bot left' &&
        moveOne?.playable &&
        moveOne?.piece === null &&
        moveTwo?.piece !== itemToMove?.piece &&
        moveTwo?.piece !== null &&
        moveThree?.playable &&
        moveThree?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(moveThree)
      }
      if (
        jumpDirection[index] !== 'bot left' &&
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
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(moveFour)
      }
      if (
        jumpDirection[index] !== 'bot left' &&
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
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(moveFive)
      }
      if (
        jumpDirection[index] !== 'bot left' &&
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
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(moveSix)
      }
      if (
        jumpDirection[index] !== 'bot left' &&
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
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(moveSeven)
      }
    

  }

    }