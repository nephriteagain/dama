import { useState, useEffect } from "react"

import { useGlobalContext } from "../context/GameContext"
import { arrayData } from "../data/arrayData"



function Gameboard() {

  const [ p1PossibleMoves, setP1PossibleMoves ] = useState([])
  const [ p2PossibleMoves, setP2PossibleMoves ] = useState([])

  const { boardData, setBoardData, highlightMoves, movePiece, pieceToMove } = useGlobalContext()

  const p1ChipStyle = {backgroundColor: 'red'}
  const p2ChipStyle = {backgroundColor: 'blue'}
  const emptySquareStyle = {backgroundColor: '#111'}
  const highlightedSquare = {backgroundColor: '#ccccff'}


  
  return (
    <div className='board'>
      { boardData.map((item: [], index: number) => {
        return ( 
          <div className="square"
            key={index}
            style={!item?.playable  ? emptySquareStyle : item.highlighted ? highlightedSquare: {}}
            onClick={
              () => {
                if (!item.highlighted) return
                movePiece(pieceToMove, item, index)
              }
            }
          >
          <div className="temp-position">
            {`${item.x}, ${item.y}`}
          </div>
          {item.piece !== null && 
          <div className="piece" 
            style={item?.piece === 'z' ? p1ChipStyle : item?.piece === 'x'? p2ChipStyle : {}}
            onClick={() => {
              highlightMoves(item, index)}}
          >
              {item.piece}
          </div>}
        </div> )
      }) }
    </div>
  )
}

export default Gameboard