export function forceCaptureRegular(
  item,
  index,
  boardData,
  forceFeed,
  jumpDirection,
  jumpedArr,
  number
) {
    const itemToCapture = boardData[index + number]
    const squareToLand = boardData[index + (number * 2)]
    if (number === - 7) {
      // top right jump
        if (
        item.piece !== null &&
        squareToLand?.playable &&
        itemToCapture?.piece !== null &&
        itemToCapture?.piece !== item.piece &&
        squareToLand?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top right')
          jumpedArr.push(squareToLand)
        }
    }

    if (number === - 9) {
      // top left jump
      if (
        item.piece !== null &&
        squareToLand?.playable &&
        itemToCapture?.piece !== null &&
        itemToCapture?.piece !== item.piece &&
        squareToLand?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top left')
          jumpedArr.push(squareToLand)
        }
    }
        
    if (number === 7) {
      // bot left jump
      if (
        item.piece !== null &&
        squareToLand?.playable &&
        itemToCapture?.piece !== null &&
        itemToCapture?.piece !== item.piece &&
        squareToLand?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot left')
          jumpedArr.push(boardData[index +14])
        }
    }

    if (number === 9) {
      // bot right jump
      if (
        item.piece !== null &&
        squareToLand?.playable &&
        itemToCapture?.piece !== null &&
        itemToCapture?.piece !== item.piece &&
        squareToLand?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot right')
          jumpedArr.push(squareToLand)
        }
    }

      
}