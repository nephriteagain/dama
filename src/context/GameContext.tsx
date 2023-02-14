import { useContext, createContext, useState, useEffect } from "react"

import { arrayData } from "../data/arrayData"

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

  
  const [ boardData, setBoardData ] = useState(arrayData)
  const [ pieceToMove, setPieceToMove ] = useState(null)

  function highlightMoves(xPosition: number, yPosition: number, piece : (string | null)) {
    // how to make piece move?
    // square must be empty
    // only allow to move forward
    // only allow at white area
    // when i clicked it it must highlight its possible move
    // and when i clicked the highlighted area it will changes its position
    // when i click anywhere else it should cancel
    // if there is no available move return
    // this operation should highlight the piece possible move
    // need a state for piece that was clicked
    if (piece === null) return
    const newBoardData = boardData.map((item) => {
      if (!item.playable) return item
        if (
            item.x === xPosition + 1 && 
            item.y === yPosition - 1 &&
            item.piece === null
          ) {
            return {...item, highlighted: true}
        }
        if (
          item.x === xPosition - 1 &&
          item.y === yPosition - 1 &&
          item.piece === null
        ) {
            return {...item, highlighted: true}
        }
        return {...item, highlighted: false}
      })
  setPieceToMove({piece, x: xPosition, y: yPosition})
  setBoardData([...newBoardData])
}

  function movePiece(pieceToMove, xPosition: number, yPosition: number, player: number) {
    const chipToMove = boardData.find((item) => {
      if (item.x === pieceToMove.x && item.y === pieceToMove.y) {
        return item
      }
    })
    const newBoardData = boardData.map((item) => {
      if (!item.playable) return item
      if (item === chipToMove) return {...item, piece: null, player: null}
      if (
        item.x === xPosition &&
        item.y ===  yPosition
      ) return {...item, piece: pieceToMove.piece, highlighted: false, player: player}
      return {...item, highlighted: false}
    })
    setPieceToMove(null)
    setBoardData([...newBoardData])
  }


  useEffect(() => {
    console.log(pieceToMove)
  }, [boardData])

  return (
    <GlobalContext.Provider value={{
      boardData, 
      setBoardData,
      highlightMoves,
      movePiece, 
      pieceToMove}}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
