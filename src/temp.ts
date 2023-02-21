if (
            board[jumpIndices[index] - 14]?.playable &&
            board[jumpIndices[index] - 14]?.piece === null &&
            board[jumpIndices[index] - 7]?.piece !== null &&
            board[jumpIndices[index] - 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot left'
            ) {
              tripleTakeArr.push(tempArrForJumps[index])

            }
          // top left
          if (
            board[jumpIndices[index] - 18]?.playable &&
            board[jumpIndices[index] - 18]?.piece === null &&
            board[jumpIndices[index] - 9]?.piece !== null &&
            board[jumpIndices[index] - 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot right'
            ) {
              tripleTakeArr.push(tempArrForJumps[index])
            }
          // bot right
          if (
            board[jumpIndices[index] + 14]?.playable &&
            board[jumpIndices[index] + 14]?.piece === null &&
            board[jumpIndices[index] + 7]?.piece !== null &&
            board[jumpIndices[index] + 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top left'
            ) {
              tripleTakeArr.push(board[tempArrForJumps[index]])
            } 
          // bot left
          if (
            board[jumpIndices[index] + 18]?.playable &&
            board[jumpIndices[index] + 18]?.piece === null &&
            board[jumpIndices[index] + 9]?.piece !== null &&
            board[jumpIndices[index] + 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top right'
            ) {
              tripleTakeArr.push(tempArrForJumps[index])
            }