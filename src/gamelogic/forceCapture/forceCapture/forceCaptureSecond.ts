import { data } from "../../../data/arrayData"

export function foreCaptureSecond(
  itemToMove : data,
  index : number,
  boardData : data[],
  jumpIndex : number,
  jumpDirection2nd : string[],
  forceFeed2nd : data[],
  jumpDirection : string[],
  jumpedArr2nd : data[],
  forceFeed : data[],
  number : number
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
