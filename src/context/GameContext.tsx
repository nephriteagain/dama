import { useContext, createContext, useState, useEffect } from "react"

import { arrayData } from "../data/arrayData"

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

  
  const [ boardData, setBoardData ] = useState(arrayData)
  const [ pieceToMove, setPieceToMove ] = useState(null)

  function highlightMoves(xPosition: number, yPosition: number, piece : (string | null), player : number) {

    if (piece === null) return
    const newBoardData = boardData.map((item) => {
      if (!item.playable) return item
        // p1  right move
        if (
            item.x === xPosition + 1 && 
            item.y === yPosition - 1 &&
            item.piece === null &&
            player === 1
          ) {
            return {...item, highlighted: true}
        }
        // p1 left move
        if (
          item.x === xPosition - 1 &&
          item.y === yPosition - 1 &&
          item.piece === null &&
          player === 1
        ) {
            return {...item, highlighted: true}
        }
        // p2 right move
        if (
            item.x === xPosition + 1 && 
            item.y === yPosition + 1 &&
            item.piece === null &&
            player === 2
          ) {
            return {...item, highlighted: true}
        }
        // p2 left move
        if (
          item.x === xPosition - 1 &&
          item.y === yPosition + 1 &&
          item.piece === null &&
          player === 2
        ) {
            return {...item, highlighted: true}
        }
        return {...item, highlighted: false}
      })
  setPieceToMove({piece, x: xPosition, y: yPosition, player})
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

      if (item === chipToMove) {
        return {...item, piece: null, player: null}
      }

      if (
        item.x === xPosition &&
        item.y ===  yPosition
      ) return {...item, piece: pieceToMove.piece, highlighted: false, player: pieceToMove.player}

      return {...item, highlighted: false}
    })
    setPieceToMove(null)
    setBoardData([...newBoardData])
  }

  {/*
  how to eat a piece?
  a piece must be on range
  a piece of opposite type right to each other
  the landing area is empty
  after the transaction, the opponent must have fewer piece
  also account if there is a probable multiple possible piece to take
  */}













  useEffect(() => {
    if (pieceToMove) {
      console.log(pieceToMove)
    }
    //  else {
    //   console.log(boardData)
    // }
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
