export function forceCaptureThird(
  item,
  index,
  boardData,
  jumpIndex,
  jumpDirection2nd,
  forceFeed3rd,
  forceFeed2nd,
  number
) {
  if (item?.king) return

  if (number === -7) {
    // top right jump
    if (
      boardData[jumpIndex - 7].piece !== null &&
      boardData[jumpIndex - 7] !== item.piece &&
      boardData[jumpIndex - 14]?.playable &&
      boardData[jumpIndex - 14].piece === null &&
      jumpDirection2nd[index] !== 'bot left'
    ) {
      forceFeed3rd.push(forceFeed2nd[index])
    }
  }

  if (number === -9) {
    // top left
    if (
      boardData[jumpIndex - 9].piece !== null &&
      boardData[jumpIndex - 9] !== item.piece &&
      boardData[jumpIndex - 18]?.playable &&
      boardData[jumpIndex - 18].piece === null &&
      jumpDirection2nd[index] !== 'bot right'
    ) {
      forceFeed3rd.push(forceFeed2nd[index])
    }
  }
  
  if (number === 7) {
    // bot left
    if (
      boardData[jumpIndex + 7].piece !== null &&
      boardData[jumpIndex + 7] !== item.piece &&
      boardData[jumpIndex + 14]?.playable &&
      boardData[jumpIndex + 14].piece === null &&
      jumpDirection2nd[index] !== 'top right'
    ) {
      forceFeed3rd.push(forceFeed2nd[index])
    }
  }

  if (number === 9) {
    // bot right
    if (
      boardData[jumpIndex + 9].piece !== null &&
      boardData[jumpIndex + 9] !== item.piece &&
      boardData[jumpIndex + 18]?.playable &&
      boardData[jumpIndex + 18].piece === null &&
      jumpDirection2nd[index] !== 'top left'
    ) {
      forceFeed3rd.push(forceFeed2nd[index])
    }
  }
          
          
          
}