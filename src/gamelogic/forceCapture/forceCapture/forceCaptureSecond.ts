export function foreCaptureSecond(
  itemToMove,
  index,
  boardData,
  jumpIndex,
  jumpDirection2nd,
  forceFeed2nd,
  jumpDirection,
  jumpedArr2nd,
  forceFeed,
  number
) {
  
    const itemToCapture = boardData[jumpIndex + number]
    const squareToLand = boardData[jumpIndex + (number * 2)]

    
    if (number === -7) {
      // top right jump
      if (
        squareToLand?.playable &&
        squareToLand?.piece === null &&
        itemToCapture?.piece !== null &&
        itemToCapture?.piece !== itemToMove?.piece &&
        jumpDirection[index] !== 'bot left'
      ) {
        jumpedArr2nd.push(squareToLand)
        jumpDirection2nd.push('top right')
        forceFeed2nd.push(forceFeed[index])
      }
    }
      
    if (number === -9) {
      // top left
      if (
        squareToLand?.playable &&
        squareToLand?.piece === null &&
        itemToCapture?.piece !== null &&
        itemToCapture?.piece !== itemToMove?.piece &&
        jumpDirection[index] !== 'bot right'
      ) {
        jumpedArr2nd.push(squareToLand)
        jumpDirection2nd.push('top left')
        forceFeed2nd.push(forceFeed[index])
      }
    }

    if (number === 9) {
      // bot right
      if (
        squareToLand?.playable &&
        squareToLand?.piece === null &&
        itemToCapture?.piece !== null &&
        itemToCapture?.piece !== itemToMove?.piece &&
        jumpDirection[index] !== 'top left'
      ) {
        jumpedArr2nd.push(squareToLand)
        jumpDirection2nd.push('bot right')
        forceFeed2nd.push(forceFeed[index])
      } 
    }
          
    if (number === 7) {
      // bot left
      if (
        squareToLand?.playable &&
        squareToLand?.piece === null &&
        itemToCapture?.piece !== null &&
        itemToCapture?.piece !== itemToMove?.piece &&
        jumpDirection[index] !== 'top right'
      ) {
        jumpedArr2nd.push(squareToLand)
        jumpDirection2nd.push('bot left')
        forceFeed2nd.push(forceFeed[index])
      }
    }
          
      }
