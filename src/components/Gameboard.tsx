import { useState } from "react"

import { useGlobalContext } from "../context/GameContext"

function Gameboard() {

  const { boardData, setBoardData, highlightMoves, movePiece, pieceToMove } = useGlobalContext()

  const p1ChipStyle = {backgroundColor: 'red'}
  const p2ChipStyle = {backgroundColor: 'blue'}
  const emptySquareStyle = {backgroundColor: '#111'}
  const highlightedSquare = {backgroundColor: '#ccccff'}

  
  return (
    <div className='board'>
      { boardData.map((item) => {
        return ( 
          <div className="square"
            key={`{${item.x},${item.y}}`}
            style={!item?.playable  ? emptySquareStyle : item.highlighted ? highlightedSquare: {}}
            onClick={
              () => {
                if (!item.highlighted) return
                movePiece(pieceToMove, item.x, item.y, item.player)
              }
            }
          >
          <div className="temp-position">
            {`${item.x}, ${item.y}`}
          </div>
          {item.piece !== null && 
          <div className="piece" 
            style={item?.piece === 'z' ? p1ChipStyle : item?.piece === 'x'? p2ChipStyle : {}}
            onClick={() =>highlightMoves(item.x, item.y, item.piece)}
          >
              {item.piece}
          </div>}
        </div> )
      }) }
    </div>
  )
}

export default Gameboard