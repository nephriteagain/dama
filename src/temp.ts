if (!item.king) {
          // top right jump
          if (
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.piece !== null &&
            boardData[jumpIndex - 7]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
              jumpedArr3rd.push(boardData[jumpIndex - 14])
              forceFeed3rd.push(forceFeed[index])
            }
          // top left
          if (
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.piece !== null &&
            boardData[jumpIndex - 9]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
              jumpedArr3rd.push(boardData[jumpIndex - 18])
              forceFeed3rd.push(forceFeed[index])

            }
          // bot right
          if (
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.piece !== null &&
            boardData[jumpIndex + 7]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'top left'
            ) {
              jumpedArr3rd.push(boardData[boardData[jumpIndex + 14]])
              forceFeed3rd.push(forceFeed[index])
            } 
          // bot left
          if (
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.piece !== null &&
            boardData[jumpIndex + 9]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'top right'
            ) {
              jumpedArr3rd.push(boardData[jumpIndex + 18])
              forceFeed3rd.push(forceFeed[index])

            }
}