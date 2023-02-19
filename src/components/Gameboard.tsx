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

  const p1ChipStyle = {backgroundColor: 'red'}
  const p2ChipStyle = {backgroundColor: 'blue'}
  const emptySquareStyle = {backgroundColor: '#111'}
  const highlightedSquare = {backgroundColor: '#ccccff'}
  const kingChip = {border: '6px solid #111'}
  const selectedChip = {scale: '1.15'}

  function handleRestart() {
    setPlayerOneTurn(true)
    setPossibleMoves([])
    setBoardData(arrayData)
    setJumpedChip(null)
  }
  
 

  // game over handler
  useEffect(() => {
    if (gameOver) console.log('game over')
  })  


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
            style={item?.piece === 'z' && item?.king === false ? p1ChipStyle : 
            item?.piece === 'x' && item?.king === false ? p2ChipStyle : 
            item?.piece === 'z' && item?.king === true ? {...p1ChipStyle, ...kingChip} :
            item?.piece === 'x' && item?.king === true ? {...p2ChipStyle, ...kingChip} : {}
          }
            onClick={() => {
              item.king === false ? 
              highlightMoves(item, index, playerOneTurn) : // for normal piece
              highlightMovesKing(item, index, playerOneTurn) // for king piece
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