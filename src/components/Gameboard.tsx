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
    setForceCapture
    
  } = useGlobalContext()


  function handleRestart() {
    setPlayerOneTurn(true)
    setPossibleMoves([])
    setBoardData(arrayData)
    setJumpedChip(null)
    setForceCapture(false)
  }
  
 

  // game over handler
  useEffect(() => {
    if (gameOver) console.log('game over')
  }) 

    // player turn handler
  // useEffect(() => {
  //   if (pieceToMove === null) {
  //     setPlayerOneTurn(!playerOneTurn)
  //   }
  // }, [pieceToMove])

  // force eat
  // regular chips NOTE: THIS USEFFECT HAS A BUG!
  useEffect(() => {
    if (multipleCapture) {
      setMultipleCapture(false)
      return
    }
    
    // console.log('no additional move')
    if (pieceToMove !== null) return
    if (pieceToMove === null) setPlayerOneTurn(!playerOneTurn)
    if (forceCapture) return //this wont rerun again multiple times
    let forceFeed = []

    boardData.forEach((item, index) => {
      if (!item.playable) return
      // regular pawn only
      else if (!item.king) {
        // top right jump
      if (
        item.piece !== null &&
        boardData[index - 14]?.playable &&
        boardData[index - 7]?.piece !== null &&
        boardData[index - 7]?.piece !== item.piece &&
        boardData[index - 14]?.piece === null
        ) {
          forceFeed.push(item)
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
        }
      }
      else if (item.king) {
        // top right ----------------------
        if (
        item.piece !== null &&
        boardData[index - 7]?.piece !== null && boardData[index - 7]?.piece !== item.piece &&
        boardData[index - 14]?.playable && boardData[index - 14]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index - 7]?.playable && boardData[index - 7]?.piece === null &&
        boardData[index - 14]?.piece !== null && boardData[index - 14]?.piece !== item.piece &&
        boardData[index - 21]?.playable && boardData[index - 21]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index - 7]?.playable && boardData[index - 7]?.piece === null &&
        boardData[index - 14]?.playable && boardData[index - 14]?.piece === null &&
        boardData[index - 21]?.piece !== null && boardData[index - 21]?.piece !== item.piece &&
        boardData[index - 28]?.playable && boardData[index - 28]?.piece === null
        ) {
          forceFeed.push(item)
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
        }

        // bot left -----------------------------
        if (
        item.piece !== null &&
        boardData[index + 7]?.piece !== null && boardData[index + 7]?.piece !== item.piece &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.piece !== null && boardData[index + 14]?.piece !== item.piece &&
        boardData[index + 21]?.playable && boardData[index + 21]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null &&
        boardData[index + 21]?.piece !== null && boardData[index + 21]?.piece !== item.piece &&
        boardData[index + 28]?.playable && boardData[index + 28]?.piece === null
        ) {
          forceFeed.push(item)
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
        }

        // top left ----------------------------
        if (
        item.piece !== null &&
        boardData[index - 9]?.piece !== null && boardData[index - 9]?.piece !== item.piece &&
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null &&
        boardData[index - 18]?.piece !== null && boardData[index - 18]?.piece !== item.piece &&        
        boardData[index - 27]?.playable && boardData[index - 27]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null &&
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null &&
        boardData[index - 27]?.piece !== null && boardData[index - 27]?.piece !== item.piece &&
        boardData[index - 36]?.playable && boardData[index - 36]?.piece === null
        ) {
          forceFeed.push(item)
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
        }

        // bottom right --------------------
        if (
        item.piece !== null &&
        boardData[index + 7]?.piece !== null && boardData[index + 7]?.piece !== item.piece &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.piece !== null && boardData[index + 14]?.piece !== item.piece &&
        boardData[index + 21]?.playable && boardData[index + 21]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null &&
        boardData[index + 21]?.piece !== null && boardData[index + 21]?.piece !== item.piece &&
        boardData[index + 28]?.playable && boardData[index + 28]?.piece === null
        ) {
          forceFeed.push(item)
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
        }

        // top left
        if (
        item.piece !== null &&
        boardData[index + 9]?.piece !== null && boardData[index + 9]?.piece !== item.piece &&
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null &&
        boardData[index + 18]?.piece !== null && boardData[index + 18]?.piece !== item.piece &&        
        boardData[index + 27]?.playable && boardData[index + 27]?.piece === null
        ) {
          forceFeed.push(item)
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null &&
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null &&
        boardData[index + 27]?.piece !== null && boardData[index + 27]?.piece !== item.piece &&
        boardData[index + 36]?.playable && boardData[index + 36]?.piece === null
        ) {
          forceFeed.push(item)
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
        }
          
      }
      
      })
    
    


    if (forceFeed.length) {
      forceFeed = forceFeed.filter((force) => {
      if (playerOneTurn) return force.piece === 'x'
      if (!playerOneTurn) return force.piece === 'z'
    })
    }
    // console.log('forcefeed arr', forceFeed)
    // console.log(forceFeed.length)
    
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