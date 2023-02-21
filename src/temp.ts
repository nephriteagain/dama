function highlightMoves(itemToMove, position: number, playerTurn: boolean, board) {
    const { x: xPosition, y: yPosition, piece, player, selected } = itemToMove;
    let tempArrForMoves = []
    let tempArrForJumps = []
    let jumpDirection = []
    const arrPieceToEat = []
    
    if (piece === null) return
    if (itemToMove.king) return
    // if p1 try to access p2 chips it will immediately return and vice versa for player 2
    if (playerTurn === true && player === 2 || !playerTurn && player === 1) return
    // console.log(position)   

    if (!itemToMove.king) {
     // p1 man left move
    if (
      itemToMove?.piece === 'z' &&
      board[position - 9]?.piece === null &&
      board[position - 9]?.playable
      ) {
      tempArrForMoves.push(board[position - 9])

    }
    // p1 man right move
    if (
      itemToMove?.piece === 'z' &&
      board[position - 7]?.piece === null &&
      board[position - 7]?.playable
      ) {
      tempArrForMoves.push(board[position - 7])

    }
    // p2 man left move
    if (
      itemToMove?.piece === 'x' &&
      board[position + 9]?.piece === null &&
      board[position + 9]?.playable
      ) {
      tempArrForMoves.push(board[position + 9])

    }
    // p2 man right move
    if (
      itemToMove?.piece === 'x' &&
      board[position + 7]?.piece === null &&
      board[position + 7]?.playable

      ) {
      tempArrForMoves.push(board[position + 7])

    }

    // top right jump
    if (
      board[position - 14]?.playable &&
      board[position - 14]?.piece === null &&
      board[position - 7]?.piece !== null &&
      board[position - 7]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position - 14])
        jumpDirection.push('top right')
        arrPieceToEat.push(board.indexOf(board[position - 7]))
      }
    // top left
    if (
      board[position - 18]?.playable &&
      board[position - 18]?.piece === null &&
      board[position - 9]?.piece !== null &&
      board[position - 9]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position - 18])
        jumpDirection.push('top left')
        arrPieceToEat.push(board.indexOf(board[position - 9]))
      }
    // bot right
    if (
      board[position + 14]?.playable &&
      board[position + 14]?.piece === null &&
      board[position + 7]?.piece !== null &&
      board[position + 7]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position + 14])
        jumpDirection.push('bot right')
        arrPieceToEat.push(board.indexOf(board[position + 7]))
      }
    // bot left
    if (
      board[position + 18]?.playable &&
      board[position + 18]?.piece === null &&
      board[position + 9]?.piece !== null &&
      board[position + 9]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position + 18])
        jumpDirection.push('bot right')
        arrPieceToEat.push(board.indexOf(board[position + 9]))
      }
    }
//--------this area check if there is a double take opportunity
    const doubleTakeArr = []
    const jumpDirection2nd = []
    function doubleTake() {
      if (!tempArrForJumps.length) return
      const arrToJump = tempArrForJumps.map(item => {
        return {
          ...item,
          piece: itemToMove.piece,
          highlighted: false,
        }
        
      })
      // transformed jumped arr indices
      const  arrToJumpIndices = tempArrForJumps.map(item => {
        return boardData.indexOf(item)
      })
      // total number of jumps
      const jumpNum = tempArrForJumps.map(item => 0)
      console.log(arrToJump);console.log(arrToJumpIndices);console.log(jumpNum)
      arrToJump.forEach((itemToMove, index) => {
        const jumpIndex = arrToJumpIndices[index]

        if (!itemToMove.king) {
          // top right jump
          if (
            board[jumpIndex - 14]?.playable &&
            board[jumpIndex - 14]?.piece === null &&
            board[jumpIndex - 7]?.piece !== null &&
            board[jumpIndex - 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot left'
            ) {
              doubleTakeArr.push(board[jumpIndex - 14])
              jumpDirection2nd.push('top right')
              arrPieceToEat.push(board.indexOf(board[jumpIndex - 7]))
            }
          // top left
          if (
            board[jumpIndex - 18]?.playable &&
            board[jumpIndex - 18]?.piece === null &&
            board[jumpIndex - 9]?.piece !== null &&
            board[jumpIndex - 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot right'
            ) {
              doubleTakeArr.push(board[jumpIndex - 18])
              jumpDirection2nd.push('top left')
              arrPieceToEat.push(board.indexOf(board[jumpIndex - 9]))
            }
          // bot right
          if (
            board[jumpIndex + 14]?.playable &&
            board[jumpIndex + 14]?.piece === null &&
            board[jumpIndex + 7]?.piece !== null &&
            board[jumpIndex + 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top left'
            ) {
              doubleTakeArr.push(board[jumpIndex + 14])
              jumpDirection2nd.push('bot right')
              arrPieceToEat.push(board.indexOf(board[jumpIndex + 7]))
            }
          // bot left
          if (
            board[jumpIndex + 18]?.playable &&
            board[jumpIndex + 18]?.piece === null &&
            board[jumpIndex + 9]?.piece !== null &&
            board[jumpIndex + 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top right'
            ) {
              doubleTakeArr.push(board[jumpIndex + 18])
              jumpDirection2nd.push('bot left')
              arrPieceToEat.push(board.indexOf(board[jumpIndex + 9]))
            }
      }
      })
    }
    doubleTake()

      // transformed jumped arr
      


    console.log(doubleTakeArr, 'double take')
    console.log(jumpDirection)
// ----------------------------------------------------------------------------------


    if (doubleTakeArr.length) tempArrForJumps = doubleTakeArr

    const boardCopy = board.map((item, index) => {
      if (!item.playable) return item
      else if (position === index) {
          return {...item, selected: true}
        }
      if (tempArrForJumps.length) {
        if (tempArrForJumps.indexOf(item) > -1) {
          return {...item, highlighted: true, selected: false}
        }
      }
      else if (tempArrForMoves.indexOf(item) > -1) {
        return {...item, highlighted: true, selected: false}
      }
      return {...item, highlighted: false, selected: false}
    })


    
// -------------------------------continue this shit


  setPieceToEat([...arrPieceToEat])
  setPieceToMove({...itemToMove})
  setPossibleMoves([...tempArrForMoves])
  setBoardData([...boardCopy])
  }