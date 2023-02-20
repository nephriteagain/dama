function eatMoreChips(pieceToJump, index, board) {
      let forceFeed = []

      console.log(pieceToJump, 'this will find a new target')
      console.log(index)
      if (!pieceToJump.king) {
        // top right
        if (
        pieceToJump.piece !== null &&
        board[index - 14]?.playable &&
        board[index - 7]?.piece !== null &&
        board[index - 7]?.piece !== pieceToJump.piece &&
        board[index - 14]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
      }
    }