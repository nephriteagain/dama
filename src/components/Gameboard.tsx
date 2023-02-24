import { useState, useEffect } from "react"

import { useGlobalContext } from "../context/GameContext"
import { arrayData } from "../data/arrayData"


function Gameboard() {

  const { 
    boardData,
    setBoardData, 
    highlightMoves, 
    movePiece, 
    pieceToMove,
    setPieceToMove,
    highlightMovesKing, 
    playerOneTurn,
    setPlayerOneTurn,
    gameOver,
    setPossibleMoves,
    setGameOver,
    playerChipsCount,
    jumpedChip,
    setJumpedChip,
    multipleCapture,
    setMultipleCapture,
    forceCapture,
    setForceCapture,
    setKingJumpDirection,
    handleRestart
    
  } = useGlobalContext()


  
  
 

  // game over handler
  useEffect(() => {
    if (gameOver) console.log('game over')
  }, [gameOver])

  // player turn handler and force capture handler
  useEffect(() => {
    

    if (multipleCapture) {
      setMultipleCapture(false)
      return
    }
    
    if (pieceToMove !== null) return
    if (pieceToMove === null) {
      setPlayerOneTurn(!playerOneTurn)
      setKingJumpDirection(null)
    }
    if (forceCapture) return //this wont rerun again multiple times
    let forceFeed = []
    let forceFeed2nd = []
    let forceFeed3rd = []
    let jumpedArr = []
    let jumpDirection = []
    let jumpedArr2nd = []
    let jumpDirection2nd = []
    let jumpedArr3rd = []   

    


    boardData.forEach((item, index) => {
      if (!item.playable) return
      // regular pawn only
      else if (!item.king) {
      function firstJump() {
        // top right jump
        if (
        item.piece !== null &&
        boardData[index - 14]?.playable &&
        boardData[index - 7]?.piece !== null &&
        boardData[index - 7]?.piece !== item.piece &&
        boardData[index - 14]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top right')
          jumpedArr.push(boardData[index - 14])
        }
      // top left jump
      if (
        item.piece !== null &&
        boardData[index - 18]?.playable &&
        boardData[index - 9]?.piece !== null &&
        boardData[index - 9]?.piece !== item.piece &&
        boardData[index - 18]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top left')
          jumpedArr.push(boardData[index - 18])
        }
      // bot left jump
      if (
        item.piece !== null &&
        boardData[index + 14]?.playable &&
        boardData[index + 7]?.piece !== null &&
        boardData[index + 7]?.piece !== item.piece &&
        boardData[index + 14]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot left')
          jumpedArr.push(boardData[index +14])
        }
      // bot right jump
      if (
        item.piece !== null &&
        boardData[index + 18]?.playable &&
        boardData[index + 9]?.piece !== null &&
        boardData[index + 9]?.piece !== item.piece &&
        boardData[index + 18]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot right')
          jumpedArr.push(boardData[index + 18])
        }
      }
      firstJump()
      
    }
      else if (item.king) {
        function topRightKing() {
          // top right ----------------------
        if (
        item.piece !== null &&
        boardData[index - 7]?.piece !== null && boardData[index - 7]?.piece !== item.piece &&
        boardData[index - 14]?.playable && boardData[index - 14]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top right')
          jumpedArr.push(boardData[index - 14])
        }
        else if (
        item.piece !== null &&
        boardData[index - 7]?.playable && boardData[index - 7]?.piece === null &&
        boardData[index - 14]?.piece !== null && boardData[index - 14]?.piece !== item.piece &&
        boardData[index - 21]?.playable && boardData[index - 21]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top right')
          jumpedArr.push(boardData[index - 21])
        }
        else if (
        item.piece !== null &&
        boardData[index - 7]?.playable && boardData[index - 7]?.piece === null &&
        boardData[index - 14]?.playable && boardData[index - 14]?.piece === null &&
        boardData[index - 21]?.piece !== null && boardData[index - 21]?.piece !== item.piece &&
        boardData[index - 28]?.playable && boardData[index - 28]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top right')
          jumpedArr.push(boardData[index - 28])
        }
        else if (
        item.piece !== null &&
        boardData[index - 7]?.playable && boardData[index - 7]?.piece === null &&
        boardData[index - 14]?.playable && boardData[index - 14]?.piece === null &&
        boardData[index - 21]?.playable && boardData[index - 21]?.piece === null &&
        boardData[index - 28]?.piece !== null && boardData[index - 28]?.piece !== item.piece &&
        boardData[index - 35]?.playable && boardData[index - 35]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top right')
          jumpedArr.push(boardData[index - 35])
        }
        else if (
        item.piece !== null &&
        boardData[index - 7]?.playable && boardData[index - 7]?.piece === null &&
        boardData[index - 14]?.playable && boardData[index - 14]?.piece === null &&
        boardData[index - 21]?.playable && boardData[index - 21]?.piece === null &&
        boardData[index - 28]?.playable && boardData[index - 28]?.piece === null &&
        boardData[index - 35]?.piece !== null && boardData[index - 35]?.piece !== item.piece &&
        boardData[index - 42]?.playable && boardData[index - 42]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top right')
          jumpedArr.push(boardData[index - 49])
        }
        }
        function botLeftKing() {
          // bot left -----------------------------
        if (
        item.piece !== null &&
        boardData[index + 7]?.piece !== null && boardData[index + 7]?.piece !== item.piece &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot left')
          jumpedArr.push(boardData[index +14])
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.piece !== null && boardData[index + 14]?.piece !== item.piece &&
        boardData[index + 21]?.playable && boardData[index + 21]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot left')
          jumpedArr.push(boardData[index +21])
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null &&
        boardData[index + 21]?.piece !== null && boardData[index + 21]?.piece !== item.piece &&
        boardData[index + 28]?.playable && boardData[index + 28]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot left')
          jumpedArr.push(boardData[index +28])
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null &&
        boardData[index + 21]?.playable && boardData[index + 21]?.piece === null &&
        boardData[index + 28]?.piece !== null && boardData[index + 28]?.piece !== item.piece &&
        boardData[index + 35]?.playable && boardData[index + 35]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot left')
          jumpedArr.push(boardData[index +35])
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null &&
        boardData[index + 21]?.playable && boardData[index + 21]?.piece === null &&
        boardData[index + 28]?.playable && boardData[index + 28]?.piece === null &&
        boardData[index + 35]?.piece !== null && boardData[index + 35]?.piece !== item.piece &&
        boardData[index + 42]?.playable && boardData[index + 42]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot left')
          jumpedArr.push(boardData[index +42])
        }
        }
        function topLeftKing() {
           // top left ----------------------------
        if (
        item.piece !== null &&
        boardData[index - 9]?.piece !== null && boardData[index - 9]?.piece !== item.piece &&
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top left')
          jumpedArr.push(boardData[index - 18])
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null &&
        boardData[index - 18]?.piece !== null && boardData[index - 18]?.piece !== item.piece &&        
        boardData[index - 27]?.playable && boardData[index - 27]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top left')
          jumpedArr.push(boardData[index - 27])
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null &&
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null &&
        boardData[index - 27]?.piece !== null && boardData[index - 27]?.piece !== item.piece &&
        boardData[index - 36]?.playable && boardData[index - 36]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top left')
          jumpedArr.push(boardData[index - 36])
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null && 
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null && 
        boardData[index - 27]?.playable && boardData[index - 27]?.piece === null && 
        boardData[index - 36]?.piece !== null && boardData[index - 36]?.piece !== item.piece && 
        boardData[index - 45]?.playable && boardData[index - 45]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top left')
          jumpedArr.push(boardData[index - 45])
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null &&
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null &&
        boardData[index - 27]?.playable && boardData[index - 27]?.piece === null &&
        boardData[index - 36]?.playable && boardData[index - 36]?.piece === null &&
        boardData[index - 45]?.piece !== null && boardData[index - 45]?.piece !== item.piece &&
        boardData[index - 54]?.playable && boardData[index - 54]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top left')
          jumpedArr.push(boardData[index - 54])
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null &&
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null &&
        boardData[index - 27]?.playable && boardData[index - 27]?.piece === null &&
        boardData[index - 36]?.playable && boardData[index - 36]?.piece === null &&
        boardData[index - 45]?.playable && boardData[index - 45]?.piece === null &&
        boardData[index - 54]?.piece !== null && boardData[index - 45]?.piece !== item.piece &&        
        boardData[index - 63]?.playable && boardData[index - 63]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('top left')
          jumpedArr.push(boardData[index - 63])
        }
        }
        function botRightKing() {
          // bot right
        if (
        item.piece !== null &&
        boardData[index + 9]?.piece !== null && boardData[index + 9]?.piece !== item.piece &&
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot right')
          jumpedArr.push(boardData[index + 18])
          
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null &&
        boardData[index + 18]?.piece !== null && boardData[index + 18]?.piece !== item.piece &&        
        boardData[index + 27]?.playable && boardData[index + 27]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot right')
          jumpedArr.push(boardData[index + 27])
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null &&
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null &&
        boardData[index + 27]?.piece !== null && boardData[index + 27]?.piece !== item.piece &&
        boardData[index + 36]?.playable && boardData[index + 36]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot right')
          jumpedArr.push(boardData[index + 36])
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null && 
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null && 
        boardData[index + 27]?.playable && boardData[index + 27]?.piece === null && 
        boardData[index + 36]?.piece !== null && boardData[index + 36]?.piece !== item.piece && 
        boardData[index + 45]?.playable && boardData[index + 45]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot right')
          jumpedArr.push(boardData[index + 45])
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null &&
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null &&
        boardData[index + 27]?.playable && boardData[index + 27]?.piece === null &&
        boardData[index + 36]?.playable && boardData[index + 36]?.piece === null &&
        boardData[index + 45]?.piece !== null && boardData[index + 45]?.piece !== item.piece &&
        boardData[index + 54]?.playable && boardData[index + 54]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot right')
          jumpedArr.push(boardData[index + 54])
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null &&
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null &&
        boardData[index + 27]?.playable && boardData[index + 27]?.piece === null &&
        boardData[index + 36]?.playable && boardData[index + 36]?.piece === null &&
        boardData[index + 45]?.playable && boardData[index + 45]?.piece === null &&
        boardData[index + 54]?.piece !== null && boardData[index + 45]?.piece !== item.piece &&        
        boardData[index + 63]?.playable && boardData[index + 63]?.piece === null
        ) {
          forceFeed.push(item)
          jumpDirection.push('bot right')
          jumpedArr.push(boardData[index + 63])
        }
        }
        topRightKing()
        botLeftKing()
        topLeftKing()
        botRightKing()
      }
      
      
      })


// second jump --------------------------------------------------------------------
    function doubleTake() {
      if (!jumpedArr.length) return
      const arrToJump = jumpedArr.map((item, index) => {
      return {
        ...item,
        piece: forceFeed[index].piece,
        highlighted: false,
        king:  forceFeed[index].king
      }
    })
    const arrToJumpIndices = jumpedArr.map((item, index) => {
      return boardData.indexOf(item)
    })
    
    arrToJump.forEach((itemToMove, index) => {
        const jumpIndex = arrToJumpIndices[index]
          if (!itemToMove.king) {
          // top right jump
          if (
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.piece !== null &&
            boardData[jumpIndex - 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 14])
              jumpDirection2nd.push('top right')
              forceFeed2nd.push(forceFeed[index])
            }
          // top left
          if (
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.piece !== null &&
            boardData[jumpIndex - 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 18])
              jumpDirection2nd.push('top left')
              forceFeed2nd.push(forceFeed[index])

            }
          // bot right
          if (
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.piece !== null &&
            boardData[jumpIndex + 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 18])
              jumpDirection2nd.push('bot right')
              forceFeed2nd.push(forceFeed[index])
            } 
          // bot left
          if (
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.piece !== null &&
            boardData[jumpIndex + 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 14])
              jumpDirection2nd.push('bot left')
              forceFeed2nd.push(forceFeed[index])
            }
      }
          else if (itemToMove.king) {
            function topRightKing() {
            if (
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.piece !== null &&
            boardData[jumpIndex - 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 14])
              jumpDirection2nd.push('top right')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex - 21]?.playable &&
            boardData[jumpIndex - 21]?.piece === null &&
            boardData[jumpIndex - 14]?.piece !== null &&
            boardData[jumpIndex - 14]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection[index] !== 'bot left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 21])
              jumpDirection2nd.push('top right')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex - 28]?.playable &&
            boardData[jumpIndex - 28]?.piece === null &&
            boardData[jumpIndex - 21]?.piece !== null &&
            boardData[jumpIndex - 21]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection[index] !== 'bot left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 28])
              jumpDirection2nd.push('top right')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex - 35]?.playable &&
            boardData[jumpIndex - 35]?.piece === null &&
            boardData[jumpIndex - 28]?.piece !== null &&
            boardData[jumpIndex - 28]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex - 21]?.playable &&
            boardData[jumpIndex - 21]?.piece === null &&
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection[index] !== 'bot left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 35])
              jumpDirection2nd.push('top right')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex - 42]?.playable &&
            boardData[jumpIndex - 42]?.piece === null &&
            boardData[jumpIndex - 35]?.piece !== null &&
            boardData[jumpIndex - 35]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex - 28]?.playable &&
            boardData[jumpIndex - 28]?.piece === null &&
            boardData[jumpIndex - 21]?.playable &&
            boardData[jumpIndex - 21]?.piece === null &&
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection[index] !== 'bot left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 42])
              jumpDirection2nd.push('top right')
              forceFeed2nd.push(forceFeed[index])
            }
            }
            function botLeftKing() {
            if (
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.piece !== null &&
            boardData[jumpIndex + 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 14])
              jumpDirection2nd.push('bot left')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex + 21]?.playable &&
            boardData[jumpIndex + 21]?.piece === null &&
            boardData[jumpIndex + 14]?.piece !== null &&
            boardData[jumpIndex + 14]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection[index] !== 'top right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 21])
              jumpDirection2nd.push('bot left')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex + 28]?.playable &&
            boardData[jumpIndex + 28]?.piece === null &&
            boardData[jumpIndex + 21]?.piece !== null &&
            boardData[jumpIndex + 21]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection[index] !== 'top right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 28])
              jumpDirection2nd.push('bot left')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex + 35]?.playable &&
            boardData[jumpIndex + 35]?.piece === null &&
            boardData[jumpIndex + 28]?.piece !== null &&
            boardData[jumpIndex + 28]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex + 21]?.playable &&
            boardData[jumpIndex + 21]?.piece === null &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection[index] !== 'top right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 35])
              jumpDirection2nd.push('bot left')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex + 42]?.playable &&
            boardData[jumpIndex + 42]?.piece === null &&
            boardData[jumpIndex + 35]?.piece !== null &&
            boardData[jumpIndex + 35]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex + 28]?.playable &&
            boardData[jumpIndex + 28]?.piece === null &&
            boardData[jumpIndex + 21]?.playable &&
            boardData[jumpIndex + 21]?.piece === null &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection[index] !== 'top right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 42])
              jumpDirection2nd.push('bot left')
              forceFeed2nd.push(forceFeed[index])
            }
            }
            function topLeftKing() {
            if (
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.piece !== null &&
            boardData[jumpIndex - 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 18])
              jumpDirection2nd.push('top left')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.piece !== null &&
            boardData[jumpIndex - 18]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection[index] !== 'bot right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 27])
              jumpDirection2nd.push('top left')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex - 36]?.playable &&
            boardData[jumpIndex - 36]?.piece === null &&
            boardData[jumpIndex - 27]?.piece !== null &&
            boardData[jumpIndex - 27]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection[index] !== 'bot right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 36])
              jumpDirection2nd.push('top left')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex - 45]?.playable &&
            boardData[jumpIndex - 45]?.piece === null &&
            boardData[jumpIndex - 36]?.piece !== null &&
            boardData[jumpIndex - 36]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection[index] !== 'bot right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 45])
              jumpDirection2nd.push('top left')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex - 54]?.playable &&
            boardData[jumpIndex - 54]?.piece === null &&
            boardData[jumpIndex - 45]?.piece !== null &&
            boardData[jumpIndex - 45]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex - 36]?.playable &&
            boardData[jumpIndex - 36]?.piece === null &&
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection[index] !== 'bot right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 54])
              jumpDirection2nd.push('top left')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex - 63]?.playable &&
            boardData[jumpIndex - 63]?.piece === null &&
            boardData[jumpIndex - 54]?.piece !== null &&
            boardData[jumpIndex - 54]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex - 45]?.playable &&
            boardData[jumpIndex - 45]?.piece === null &&
            boardData[jumpIndex - 36]?.playable &&
            boardData[jumpIndex - 36]?.piece === null &&
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection[index] !== 'bot right'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex - 54])
              jumpDirection2nd.push('top left')
              forceFeed2nd.push(forceFeed[index])
            }
            }
            function botRightKing() {
            if (
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.piece !== null &&
            boardData[jumpIndex + 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 18])
              jumpDirection2nd.push('bot right')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.piece !== null &&
            boardData[jumpIndex + 18]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection[index] !== 'top left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 27])
              jumpDirection2nd.push('bot right')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex + 36]?.playable &&
            boardData[jumpIndex + 36]?.piece === null &&
            boardData[jumpIndex + 27]?.piece !== null &&
            boardData[jumpIndex + 27]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection[index] !== 'top left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 36])
              jumpDirection2nd.push('bot right')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex + 45]?.playable &&
            boardData[jumpIndex + 45]?.piece === null &&
            boardData[jumpIndex + 36]?.piece !== null &&
            boardData[jumpIndex + 36]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection[index] !== 'top left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 45])
              jumpDirection2nd.push('bot right')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex + 54]?.playable &&
            boardData[jumpIndex + 54]?.piece === null &&
            boardData[jumpIndex + 45]?.piece !== null &&
            boardData[jumpIndex + 45]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex + 36]?.playable &&
            boardData[jumpIndex + 36]?.piece === null &&
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection[index] !== 'top left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 54])
              jumpDirection2nd.push('bot right')
              forceFeed2nd.push(forceFeed[index])
            }
            if (
            boardData[jumpIndex + 63]?.playable &&
            boardData[jumpIndex + 63]?.piece === null &&
            boardData[jumpIndex + 54]?.piece !== null &&
            boardData[jumpIndex + 54]?.piece !== itemToMove?.piece &&
            boardData[jumpIndex + 45]?.playable &&
            boardData[jumpIndex + 45]?.piece === null &&
            boardData[jumpIndex + 36]?.playable &&
            boardData[jumpIndex + 36]?.piece === null &&
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection[index] !== 'top left'
            ) {
              jumpedArr2nd.push(boardData[jumpIndex + 54])
              jumpDirection2nd.push('bot right')
              forceFeed2nd.push(forceFeed[index])
            }
            }
            
            topRightKing()
            botLeftKing()
            topLeftKing()
            botRightKing()
            botRightKing()
          }
      })
    }
    doubleTake()


    if (forceFeed2nd.length) forceFeed = forceFeed2nd
    
    // -----------------------------------------------------------------------------------

// third jump ---------------------------------------------------------------------------
function tripleTake() {
  if (!forceFeed2nd.length) return
  const arrToJump3rd = jumpedArr2nd.map((item, index) => {
    return {
      ...item,
        piece: forceFeed2nd[index].piece,
        highlighted: false,
        king:  forceFeed2nd[index].king
    }
  })
  const arrToJumpIndices = jumpedArr2nd.map((item, index) => {
      return boardData.indexOf(item)
    })
  
  arrToJump3rd.forEach((item, index) => {
    const jumpIndex = arrToJumpIndices[index]
    if (!item.king) {
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
          // top left
          else if (
            boardData[jumpIndex - 9].piece !== null &&
            boardData[jumpIndex - 9] !== item.piece &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18].piece === null &&
            jumpDirection2nd[index] !== 'bot right'
          ) {
            forceFeed3rd.push(forceFeed2nd[index])

          }
          // bot left
          else if (
            boardData[jumpIndex + 7].piece !== null &&
            boardData[jumpIndex + 7] !== item.piece &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14].piece === null &&
            jumpDirection2nd[index] !== 'top right'
          ) {
            forceFeed3rd.push(forceFeed2nd[index])

          }
          // bot right
          else if (
            boardData[jumpIndex + 9].piece !== null &&
            boardData[jumpIndex + 9] !== item.piece &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18].piece === null &&
            jumpDirection2nd[index] !== 'top left'
          ) {
            forceFeed3rd.push(forceFeed2nd[index])
          }
}
    else if (item.king) {

            function topRightKing() {
            if (
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.piece !== null &&
            boardData[jumpIndex - 7]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 21]?.playable &&
            boardData[jumpIndex - 21]?.piece === null &&
            boardData[jumpIndex - 14]?.piece !== null &&
            boardData[jumpIndex - 14]?.piece !== item?.piece &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 28]?.playable &&
            boardData[jumpIndex - 28]?.piece === null &&
            boardData[jumpIndex - 21]?.piece !== null &&
            boardData[jumpIndex - 21]?.piece !== item?.piece &&
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 35]?.playable &&
            boardData[jumpIndex - 35]?.piece === null &&
            boardData[jumpIndex - 28]?.piece !== null &&
            boardData[jumpIndex - 28]?.piece !== item?.piece &&
            boardData[jumpIndex - 21]?.playable &&
            boardData[jumpIndex - 21]?.piece === null &&
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 42]?.playable &&
            boardData[jumpIndex - 42]?.piece === null &&
            boardData[jumpIndex - 35]?.piece !== null &&
            boardData[jumpIndex - 35]?.piece !== item?.piece &&
            boardData[jumpIndex - 28]?.playable &&
            boardData[jumpIndex - 28]?.piece === null &&
            boardData[jumpIndex - 21]?.playable &&
            boardData[jumpIndex - 21]?.piece === null &&
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            }
            function botLeftKing() {
            if (
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.piece !== null &&
            boardData[jumpIndex + 7]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 21]?.playable &&
            boardData[jumpIndex + 21]?.piece === null &&
            boardData[jumpIndex + 14]?.piece !== null &&
            boardData[jumpIndex + 14]?.piece !== item?.piece &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 28]?.playable &&
            boardData[jumpIndex + 28]?.piece === null &&
            boardData[jumpIndex + 21]?.piece !== null &&
            boardData[jumpIndex + 21]?.piece !== item?.piece &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 35]?.playable &&
            boardData[jumpIndex + 35]?.piece === null &&
            boardData[jumpIndex + 28]?.piece !== null &&
            boardData[jumpIndex + 28]?.piece !== item?.piece &&
            boardData[jumpIndex + 21]?.playable &&
            boardData[jumpIndex + 21]?.piece === null &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 42]?.playable &&
            boardData[jumpIndex + 42]?.piece === null &&
            boardData[jumpIndex + 35]?.piece !== null &&
            boardData[jumpIndex + 35]?.piece !== item?.piece &&
            boardData[jumpIndex + 28]?.playable &&
            boardData[jumpIndex + 28]?.piece === null &&
            boardData[jumpIndex + 21]?.playable &&
            boardData[jumpIndex + 21]?.piece === null &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            }
            function topLeftKing() {
            if (
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.piece !== null &&
            boardData[jumpIndex - 9]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.piece !== null &&
            boardData[jumpIndex - 18]?.piece !== item?.piece &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 36]?.playable &&
            boardData[jumpIndex - 36]?.piece === null &&
            boardData[jumpIndex - 27]?.piece !== null &&
            boardData[jumpIndex - 27]?.piece !== item?.piece &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 45]?.playable &&
            boardData[jumpIndex - 45]?.piece === null &&
            boardData[jumpIndex - 36]?.piece !== null &&
            boardData[jumpIndex - 36]?.piece !== item?.piece &&
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 54]?.playable &&
            boardData[jumpIndex - 54]?.piece === null &&
            boardData[jumpIndex - 45]?.piece !== null &&
            boardData[jumpIndex - 45]?.piece !== item?.piece &&
            boardData[jumpIndex - 36]?.playable &&
            boardData[jumpIndex - 36]?.piece === null &&
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 63]?.playable &&
            boardData[jumpIndex - 63]?.piece === null &&
            boardData[jumpIndex - 54]?.piece !== null &&
            boardData[jumpIndex - 54]?.piece !== item?.piece &&
            boardData[jumpIndex - 45]?.playable &&
            boardData[jumpIndex - 45]?.piece === null &&
            boardData[jumpIndex - 36]?.playable &&
            boardData[jumpIndex - 36]?.piece === null &&
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            }
            function botRightKing() {
            if (
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.piece !== null &&
            boardData[jumpIndex + 9]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.piece !== null &&
            boardData[jumpIndex + 18]?.piece !== item?.piece &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 36]?.playable &&
            boardData[jumpIndex + 36]?.piece === null &&
            boardData[jumpIndex + 27]?.piece !== null &&
            boardData[jumpIndex + 27]?.piece !== item?.piece &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 45]?.playable &&
            boardData[jumpIndex + 45]?.piece === null &&
            boardData[jumpIndex + 36]?.piece !== null &&
            boardData[jumpIndex + 36]?.piece !== item?.piece &&
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 54]?.playable &&
            boardData[jumpIndex + 54]?.piece === null &&
            boardData[jumpIndex + 45]?.piece !== null &&
            boardData[jumpIndex + 45]?.piece !== item?.piece &&
            boardData[jumpIndex + 36]?.playable &&
            boardData[jumpIndex + 36]?.piece === null &&
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 63]?.playable &&
            boardData[jumpIndex + 63]?.piece === null &&
            boardData[jumpIndex + 54]?.piece !== null &&
            boardData[jumpIndex + 54]?.piece !== item?.piece &&
            boardData[jumpIndex + 45]?.playable &&
            boardData[jumpIndex + 45]?.piece === null &&
            boardData[jumpIndex + 36]?.playable &&
            boardData[jumpIndex + 36]?.piece === null &&
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            }
            
            topRightKing()
            botLeftKing()
            topLeftKing()
            botRightKing()
            botRightKing()
          }
  })

}
tripleTake()
if (forceFeed3rd.length) forceFeed = forceFeed3rd

//---------------------------------------------------------------------------------------
    

    if (forceFeed.length) {
      forceFeed = forceFeed.filter((force) => {
      if (playerOneTurn) return force.piece === 'x'
      if (!playerOneTurn) return force.piece === 'z'
    })
    }


    if (forceFeed.length) {
      setForceCapture(true)
      const boardDataCopy = boardData.map((item, index) => {
        if (!item.playable) return item
        if(!item === null) return item
        if (playerOneTurn && item?.piece === 'z') return item
        if (!playerOneTurn && item?.piece === 'x') return item

        else if (forceFeed.indexOf(item) > - 1) {
          return {...item, movable: true}
        }


        return {...item, movable: false}
      })

      setBoardData(boardDataCopy)
    }
  
  }, [pieceToMove])



  return (
    <>
    <div className="player-turn"
    style={playerOneTurn? {color: 'red'} : {color: 'blue'}}
    >
      Player {playerOneTurn? 'One' : 'Two'}'s Turn
    </div>

    <div className="restart-game">
      <button className="btn-restart" onClick={handleRestart}>Restart Game</button>
    </div>

    <div className='board'>
      { boardData.map((item: [], index: number) => {


        const boardStyle  = {}
        if (!item.playable) {
          boardStyle.backgroundColor = '#111'
        } else if (item?.highlighted) {
          boardStyle.backgroundColor = '#ccccff'
        } else if (item?.selected) {
          boardStyle.backgroundColor = '#6CD486'
        }

        const chipStyle = {}
        if (item?.piece === 'z') chipStyle.backgroundColor = 'red'
        if (item?.piece === 'x') chipStyle.backgroundColor = 'blue'
        if (item?.king) chipStyle.border = '6px solid #111'
        if (item?.movable) chipStyle.opacity = '1'
        if (!item?.movable) chipStyle.opacity = '0.4'
        

        return ( 
          <div className="square"
            key={index}
            style={boardStyle}
            onClick={
              () => {
                if (!item.highlighted) return
                movePiece(pieceToMove, item, index)
              }
            }
          >
          <div className="temp-position">
            {`${index} ${item.king? 'K' : ''} ${item.x} ${item.y}`}
            
          </div>
          {item.piece !== null && 
          <div className="piece" 
            style={chipStyle}
            onClick={() => {
              if (!item.movable) return
              item.king === false ?
              highlightMoves(item, index, playerOneTurn, boardData) : // for normal piece
              highlightMovesKing(item, index, playerOneTurn, boardData) // for king piece
            }}
          >
          </div>}
        </div> )
      }) }
    </div>
    
    </>
  )
}

export default Gameboard