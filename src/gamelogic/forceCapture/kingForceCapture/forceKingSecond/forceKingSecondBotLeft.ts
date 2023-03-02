export function forceKingBotLeft(
  itemToMove,
  index,
  boardData,
  jumpIndex,
  jumpDirection,
  jumpedArr2nd,
  jumpDirection2nd,
  forceFeed2nd,
  forceFeed,
  number
) {

  if (!itemToMove.king) return

  const moveOne = boardData[jumpIndex + number]
  const moveTwo = boardData[jumpIndex + (number * 2)]
  const moveThree = boardData[jumpIndex + (number * 3)]
  const moveFour = boardData[jumpIndex + (number * 4)]
  const moveFive = boardData[jumpIndex + (number * 5)]
  const moveSix = boardData[jumpIndex + (number * 6)]
  const moveSeven = boardData[jumpIndex + (number * 7)]


  if (
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.piece !== null &&
  moveOne?.piece !== itemToMove?.piece &&
  jumpDirection[index] !== 'top right'
  ) {
    jumpedArr2nd.push(moveTwo)
    forceFeed2nd.push(forceFeed[index])
    number === 7 && jumpDirection2nd.push('bot left')
    
  }
  if (
  moveThree?.playable &&
  moveThree?.piece === null &&
  moveTwo?.piece !== null &&
  moveTwo?.piece !== itemToMove?.piece &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection[index] !== 'top right'
  ) {
    jumpedArr2nd.push(moveThree)
    forceFeed2nd.push(forceFeed[index])
    number === 7 && jumpDirection2nd.push('bot left')
    
  }
  if (
  moveFour?.playable &&
  moveFour?.piece === null &&
  moveThree?.piece !== null &&
  moveThree?.piece !== itemToMove?.piece &&
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection[index] !== 'top right'
  ) {
    jumpedArr2nd.push(moveFour)
    forceFeed2nd.push(forceFeed[index])
    number === 7 && jumpDirection2nd.push('bot left')
    
  }
  if (
  moveFive?.playable &&
  moveFive?.piece === null &&
  moveFour?.piece !== null &&
  moveFour?.piece !== itemToMove?.piece &&
  moveThree?.playable &&
  moveThree?.piece === null &&
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection[index] !== 'top right'
  ) {
    jumpedArr2nd.push(moveFive)
    forceFeed2nd.push(forceFeed[index])
    number === 7 && jumpDirection2nd.push('bot left')
    
  }
  if (
  moveSix?.playable &&
  moveSix?.piece === null &&
  moveFive?.piece !== null &&
  moveFive?.piece !== itemToMove?.piece &&
  moveFour?.playable &&
  moveFour?.piece === null &&
  moveThree?.playable &&
  moveThree?.piece === null &&
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection[index] !== 'top right'
  ) {
    jumpedArr2nd.push(moveSix)
    forceFeed2nd.push(forceFeed[index])
    number === 7 && jumpDirection2nd.push('bot left')
    
  }
  if (
  moveSeven?.playable &&
  moveSeven?.piece === null &&
  moveSix?.piece !== null &&
  moveSix?.piece !== itemToMove?.piece &&
  moveFive?.playable &&
  moveFive?.piece === null &&
  moveFour?.playable &&
  moveFour?.piece === null &&
  moveThree?.playable &&
  moveThree?.piece === null &&
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection[index] !== 'top right'
  ) {
    jumpedArr2nd.push(moveSeven)
    forceFeed2nd.push(forceFeed[index])
    number === 7 && jumpDirection2nd.push('bot left')
    
  }
            }