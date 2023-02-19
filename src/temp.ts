// top right jump
    if (
      boardData[index - 14]?.playable &&
      boardData[index - 14]?.piece === null &&
      boardData[index - 7]?.piece !== null &&
      boardData[index - 7]?.piece !== item?.piece
      ) {
        forceFeed.push(boardData[index - 14])

      }
    // top left
    if (
      boardData[index - 18]?.playable &&
      boardData[index - 18]?.piece === null &&
      boardData[index - 9]?.piece !== null &&
      boardData[index - 9]?.piece !== item?.piece
      ) {
        forceFeed.push(boardData[index - 18])

      }
    // bot right
    if (
      boardData[index + 14]?.playable &&
      boardData[index + 14]?.piece === null &&
      boardData[index + 7]?.piece !== null &&
      boardData[index + 7]?.piece !== item?.piece
      ) {
        forceFeed.push(boardData[index + 14])

      }
    // bot left
    if (
      boardData[index + 18]?.playable &&
      boardData[index + 18]?.piece === null &&
      boardData[index + 9]?.piece !== null &&
      boardData[index + 9]?.piece !== item?.piece
      ) {
        forceFeed.push(boardData[index + 18])

      }