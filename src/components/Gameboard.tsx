import { useState, useEffect } from "react"

import { useGlobalContext } from "../context/GameContext"
import { arrayData } from "../data/arrayData"



function Gameboard() {

  const [ p1PossibleMoves, setP1PossibleMoves ] = useState([])
  const [ p2PossibleMoves, setP2PossibleMoves ] = useState([])

  const { boardData, setBoardData, highlightMoves, movePiece, pieceToMove, highlightMovesKing } = useGlobalContext()

  const p1ChipStyle = {backgroundColor: 'red'}
  const p2ChipStyle = {backgroundColor: 'blue'}
  const emptySquareStyle = {backgroundColor: '#111'}
  const highlightedSquare = {backgroundColor: '#ccccff'}
  const kingChip = {border: '6px solid #111'}


  useEffect(() => {
    // after every move this will check if a new king is awakened

      const tempArr = boardData.map((item) => {

      // checks for player 1 new king
      if (item.y === 0 && item.piece === 'z' && item.king === false) {
        console.log('player 1 king awakened!')
        return {...item, king: true}
      }

      // checks for player 2 new king
      if (item.y === 7 && item.piece == 'x' && item.king === false) {
        console.log('player 2 king awakened!')
        return {...item, king: true}
      }
      return item
    })
    setBoardData(tempArr)

    
  },[pieceToMove])  

  
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
            style={item?.piece === 'z' && item?.king === false ? p1ChipStyle : 
            item?.piece === 'x' && item?.king === false ? p2ChipStyle : 
            item?.piece === 'z' && item?.king === true ? {...p1ChipStyle, ...kingChip} :
            item?.piece === 'x' && item?.king === true ? {...p2ChipStyle, ...kingChip} : {}
          }
            onClick={() => {
              item.king === false ? 
              highlightMoves(item, index,) :
              highlightMovesKing(item, index)
            }}
          >
              
          </div>}
        </div> )
      }) }
    </div>
  )
}

export default Gameboard