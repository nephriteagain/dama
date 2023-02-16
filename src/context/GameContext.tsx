import { useContext, createContext, useState, useEffect, ReactNode } from "react"

import { arrayData } from "../data/arrayData"

type GlobalContextProviderProps = {
  children: ReactNode
}

// type GlobalContext = {
//   highlightMoves : (itemToMove: [], position: number) => []
//   movePiece : ()
// }


const GlobalContext = createContext()

export const GlobalProvider = ({children}: GlobalContextProviderProps) => {

  
  const [ boardData, setBoardData ] = useState(arrayData)
  const [ pieceToMove, setPieceToMove ] = useState(null)
  const [ possibleMoves, setPossibleMoves ] = useState([])

  function highlightMoves(itemToMove: [], position: number) {
    const xPosition = itemToMove.x
    const yPosition = itemToMove.y
    const piece = itemToMove.piece
    const player = itemToMove.player
    const tempArrForMoves = []


    if (piece === null) return
    const newBoardData = boardData.map((item, index) => {
      if (!item.playable) return item

        // p1  right move
        if (
            item.x === xPosition + 1 && 
            item.y === yPosition - 1 &&
            item.piece === null &&
            player === 1
          ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true}
        }
        // p1 left move
        if (
          item.x === xPosition - 1 &&
          item.y === yPosition - 1 &&
          item.piece === null &&
          player === 1
        ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true}
        }
        // p2 right move
        if (
            item.x === xPosition + 1 && 
            item.y === yPosition + 1 &&
            item.piece === null &&
            player === 2
          ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true}
        }
        // p2 left move
        if (
          item.x === xPosition - 1 &&
          item.y === yPosition + 1 &&
          item.piece === null &&
          player === 2
        ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true}
        }
        
        // p1 top right take
        if (
          player === 1 &&
          item.x === xPosition + 2 &&
          item.y === yPosition - 2 &&
          item.piece === null &&
          boardData[index + 7].piece === 'x'
          ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }
        // p1 top left take
        if (
          player === 1 &&
          item.x === xPosition - 2 &&
          item.y === yPosition - 2 &&
          item.piece === null &&
          boardData[index + 9].piece === 'x'
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }
        // p1 bottom right take
        if (
          player === 1 &&
          item.x === xPosition + 2 &&
          item.y === yPosition + 2 &&
          item.piece === null &&
          boardData[index - 9].piece === 'x'
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }
        // p1 bottom left take
        if (
          player === 1 &&
          item.x === xPosition - 2 &&
          item.y === yPosition + 2 &&
          item.piece === null &&
          boardData[index - 7].piece === 'x'
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }

        // p2 bottom right take
        if (
          player === 2 &&
          item.x === xPosition + 2 &&
          item.y === yPosition + 2 &&
          item.piece === null &&
          boardData[index - 9].piece === 'z'
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }
        // p2 bottom left take
        if (
          player === 2 &&
          item.x === xPosition - 2 &&
          item.y === yPosition + 2 &&
          item.piece === null &&
          boardData[index - 7].piece === 'z'
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }
        // p2 top right take
        if (
          player === 2 &&
          item.x === xPosition + 2 &&
          item.y === yPosition - 2 &&
          item.piece === null &&
          boardData[index + 7].piece === 'z'
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }
        // p2 top left take
        if (
          player === 2 &&
          item.x === xPosition - 2 &&
          item.y === yPosition - 2 &&
          item.piece === null &&
          boardData[index + 9].piece === 'z'
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }


        return {...item, highlighted: false}
      })
  setPieceToMove({...itemToMove})
  setPossibleMoves([...tempArrForMoves])
  setBoardData([...newBoardData])
}

  function movePiece(pieceToMove: [], placeToLand: []) {
    const xPosition : number = placeToLand.x
    const yPosition : number = placeToLand.y
    const player : number = placeToLand.player

    const chipToMove = boardData.find((item) => {
      if (item.x === pieceToMove.x && item.y === pieceToMove.y) {
        return item
      }
    })
    const newBoardData = boardData.map((item, index) => {
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

  })








  useEffect(() => {
    if (pieceToMove) {
      console.log(pieceToMove, 'piece to move')
      console.log(possibleMoves, 'possible moves')
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
