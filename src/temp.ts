if (!playerOneTurn) {
        if (
        item.piece !== 'x' &&
        boardData[index - 7]?.piece === 'z' &&
        boardData[index - 14]?.playable &&
        boardData[index - 14]?.piece === null
        ) {
          forceFeed.push(boardData[index - 14])
          forceEat.push(item)
        }
      // top left jump
      if (
        item.piece !== 'x' &&
        boardData[index - 9]?.piece === 'z' &&
        boardData[index - 18]?.playable &&
        boardData[index - 18]?.piece === null
        ) {
          forceFeed.push(boardData[index - 18])
          forceEat.push(item)

        }
      // bot left jump
      if (
        item.piece !== 'x' &&
        boardData[index + 7]?.piece === 'z' &&
        boardData[index + 14]?.playable &&
        boardData[index + 14]?.piece === null
        ) {
          forceFeed.push(boardData[index + 14])
          forceEat.push(item)

        }
      // bot right jump
      if (
        item.piece !== 'x' &&
        boardData[index - 9]?.piece === 'z' &&
        boardData[index - 18]?.playable &&
        boardData[index - 18]?.piece === null
        ) {
          forceFeed.push(boardData[index + 18])
          forceEat.push(item)

        }
      }