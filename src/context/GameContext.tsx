import { useContext, createContext, useState, useEffect, ReactNode } from "react"
import { compileString } from "sass"
import Gameboard from "../components/Gameboard"

import { arrayData } from "../data/arrayData"
import { POSSIBLEJUMPS } from "../data/possibleJumps"
// regular chips logic
import { checkForMovesPlayerOne, checkForMovesPlayerTwo } from '../gamelogic/moveSearcher/moveChecker'
import { checkForJumps } from "../gamelogic/moveSearcher/jumpChecker"
import { checkForMultiJumps } from "../gamelogic/moveSearcher/multiJumpChecker"
import { regularCapture } from "../gamelogic/additionalCapture/capture/regularCapture"
// king logic
import { kingBotLeft } from "../gamelogic/kingMoveSearcher/kingBotLeft"
import { kingBotRight } from "../gamelogic/kingMoveSearcher/kingBotRight"
import { kingTopLeft } from "../gamelogic/kingMoveSearcher/kingTopLeft"
import { kingTopRight } from "../gamelogic/kingMoveSearcher/kingTopRight"
import { kingBotLeftMulti } from "../gamelogic/kingMultiJumpSearcher/kingMultiJumpBotLeft"
import { kingBotRightMulti } from "../gamelogic/kingMultiJumpSearcher/kingMultiJumpBotRight"
import { kingTopLeftMulti } from "../gamelogic/kingMultiJumpSearcher/kingMultiJumpTopLeft"
import { kingTopRightMulti } from "../gamelogic/kingMultiJumpSearcher/kingMultiJumpTopRight"
import { kingBotLeftCapture } from "../gamelogic/additionalCapture/kingCapture/botLeftKingCapture"
import { kingBotRightCapture } from "../gamelogic/additionalCapture/kingCapture/botRightKingCapture"
import { kingTopLeftCapture } from "../gamelogic/additionalCapture/kingCapture/topLeftKingCapture"
import { kingTopRightCapture } from "../gamelogic/additionalCapture/kingCapture/topRightKingCapture"



type GlobalContextProviderProps = {
  children: ReactNode
}



const GlobalContext = createContext()

export const GlobalProvider = ({children}: GlobalContextProviderProps) => {

  
  const [ boardData, setBoardData ] = useState(arrayData)
  const [ pieceToMove, setPieceToMove ] = useState(null)
  const [ possibleMoves, setPossibleMoves ] = useState([])

  const [ playerOneTurn, setPlayerOneTurn ] = useState(true) // player one will still be first to move regardless
  const [ playerChipsCount, setPlayerChipsCount ] = useState({p1: 12, p2: 12})
  const [ gameOver, setGameOver ] = useState(false)
  const [ jumpedChip, setJumpedChip ] = useState(null)
  const [multipleCapture, setMultipleCapture] = useState(false)
  const [forceCapture, setForceCapture] = useState(false)
  const [ kingJumpDirection, setKingJumpDirection ] = useState(null)
  const [ gameMode, setGameMode ] = useState('')
  const [ timeLimit, setTimeLimit ] = useState(3000)
  const [timerOne, setTimerOne] = useState(timeLimit);
  const [timerTwo, setTimerTwo] = useState(timeLimit);
  const [isActive, setIsActive] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(2);
  const [ isFirstMove, setIsFirstMove ] = useState(true)
  const [ timeSup, setTimesUp ] = useState(false)



  function highlightMoves(itemToMove, position: number, playerTurn: boolean, board) {
    const { x: xPosition, y: yPosition, piece, player, selected } = itemToMove;
    let tempArrForMoves = [] // stores non capturing moves
    let tempArrForJumps = [] // stores capturing moves
    let tempArrForJumps2 = []                                         
    let jumpDirection = [] // stores direction of jumps
    const doubleTakeArr : number[] = [] // stores jumps from double captures
    let tripleTakeArr : number[] = []
    const jumpDirection2nd : string[] = [] // stores direction jumps from double captures
    
    if (piece === null) return
    if (itemToMove.king) return
    // if p1 try to access p2 chips it will immediately return and vice versa for player 2
    if (playerTurn === true && piece === 'x' || !playerTurn && piece === 'z') return
    // console.log(position)   

    if (!itemToMove.king) {
      // p1 right move
      checkForMovesPlayerOne(itemToMove, position, board, tempArrForMoves, -7)
      // p1 left move
      checkForMovesPlayerOne(itemToMove, position, board, tempArrForMoves, -9)
      // p2 left move
      checkForMovesPlayerTwo(itemToMove, position, board, tempArrForMoves, 7)
      // p2 right move
      checkForMovesPlayerTwo(itemToMove, position, board, tempArrForMoves, 9)

      // top right jump
      checkForJumps(itemToMove, position, board, tempArrForJumps, -7, jumpDirection)
      // top left jump
      checkForJumps(itemToMove, position, board, tempArrForJumps, -9, jumpDirection)
      // bot left jump
      checkForJumps(itemToMove, position, board, tempArrForJumps, 7, jumpDirection)
      // bot right jump
      checkForJumps(itemToMove, position, board, tempArrForJumps, 9, jumpDirection)

    }
//--------this area check if there is a double take opportunity
    
    function doubleTake() {
      if (!tempArrForJumps.length) return

      const arrToJump = tempArrForJumps.map(item => {
        return {
          ...item,
          piece: itemToMove.piece,
          highlighted: false,
          king: itemToMove.king
        }
        
      })
      // transformed jumped arr indices
      const  arrToJumpIndices = tempArrForJumps.map(item => {
        return boardData.indexOf(item)
      })
      // total number of jumps

      
      arrToJump.forEach((itemToMove, index) => {
        if (!itemToMove.king) {
            checkForMultiJumps( itemToMove, index, arrToJumpIndices, board, jumpDirection, doubleTakeArr,  -7, tempArrForJumps, jumpDirection2nd, tempArrForJumps2,)
            checkForMultiJumps( itemToMove, index, arrToJumpIndices, board, jumpDirection, doubleTakeArr,  -9, tempArrForJumps, jumpDirection2nd, tempArrForJumps2,)
            checkForMultiJumps( itemToMove, index, arrToJumpIndices, board, jumpDirection, doubleTakeArr,  7, tempArrForJumps, jumpDirection2nd, tempArrForJumps2,)
            checkForMultiJumps( itemToMove, index, arrToJumpIndices, board, jumpDirection, doubleTakeArr,  9, tempArrForJumps, jumpDirection2nd, tempArrForJumps2,)

        }
      })
    }
    doubleTake()
    
    // ----------------------------------------------------------------------------------
    
    // tripleTake------------------------------------------
    function tripleTake() {
      if (!doubleTakeArr.length) return
      const jumpIndices = tempArrForJumps2.map((item, index) => {
        return board.indexOf(item)
      })
      const arrToJump = tempArrForJumps2.map((item, index) => {
        return {
          ...item,
          piece: itemToMove.piece,
          king: itemToMove.king,
          highlighted: false,
        }
      })

    arrToJump.forEach((item, index) => {
      if (!itemToMove.king) {
        checkForMultiJumps(itemToMove, index, jumpIndices, board, jumpDirection2nd, tripleTakeArr, -7, tempArrForJumps)
        checkForMultiJumps(itemToMove, index, jumpIndices, board, jumpDirection2nd, tripleTakeArr, -9, tempArrForJumps)
        checkForMultiJumps(itemToMove, index, jumpIndices, board, jumpDirection2nd, tripleTakeArr, 7, tempArrForJumps)
        checkForMultiJumps(itemToMove, index, jumpIndices, board, jumpDirection2nd, tripleTakeArr, 9, tempArrForJumps)
      }
    })

    tripleTakeArr = tripleTakeArr.filter((item) => {
      return item !== undefined
    })
    }

    tripleTake()
//-----------------------------------------------------
if (doubleTakeArr.length) tempArrForJumps = doubleTakeArr
if (tripleTakeArr.length) tempArrForJumps = tripleTakeArr

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


  


  
  setPieceToMove({...itemToMove})
  setPossibleMoves([...tempArrForMoves])
  setBoardData([...boardCopy])
  }

  function highlightMovesKing(itemToMove, position: number, playerTurn, board) {
    const { x: xPosition, y: yPosition, piece, player } = itemToMove;
    let tempArrForMoves = []
    let tempArrForJumps = []
    let jumpDirection = []
    
    let doubleTakeArr = []
    let tripleTakeArr = []
    let jumpDirection2nd = []
    let doubleTakeLanding = []

    if (piece === null) return
    if (!itemToMove.king) return
    // if p1 try to access p2 ch0ips it will immediately return and vice versa for player 2
    if (playerTurn === true && piece === 'x' || !playerTurn && piece === 'z') return
    
    if (itemToMove.king) {
      // top right move
      kingBotLeft(itemToMove, position, kingJumpDirection, board, tempArrForMoves, tempArrForJumps, jumpDirection, 7)
      kingBotRight(itemToMove, position, kingJumpDirection, board, tempArrForMoves, tempArrForJumps, jumpDirection, 9)
      kingTopRight(itemToMove, position, kingJumpDirection, board, tempArrForMoves, tempArrForJumps, jumpDirection, -7)
      kingTopLeft(itemToMove, position, kingJumpDirection, board, tempArrForMoves, tempArrForJumps, jumpDirection, -9)
    }
    


// ----- double take checker -------- ------------------
function doubleTake() {
  if (!tempArrForJumps.length) return

  const arrToJump = tempArrForJumps.map(item => {
    return {
      ...item,
      piece: itemToMove.piece,
      highlighted: false,
      king: itemToMove.king
    }
  })
  const arrToJumpIndices = tempArrForJumps.map(item => {
        return boardData.indexOf(item)
      })

  arrToJump.forEach((itemToMove, index) => {
    const jumpIndex = arrToJumpIndices[index]

    kingBotLeftMulti(itemToMove,index, jumpDirection, board, jumpIndex, doubleTakeArr,  tempArrForJumps, 7, jumpDirection2nd, doubleTakeLanding)

    kingBotRightMulti(itemToMove,index, jumpDirection, board, jumpIndex, doubleTakeArr,  tempArrForJumps, 9, jumpDirection2nd, doubleTakeLanding)
    
    kingTopRightMulti(itemToMove, index, jumpDirection, board, jumpIndex, doubleTakeArr,  tempArrForJumps, -7, jumpDirection2nd, doubleTakeLanding)

    kingTopLeftMulti(itemToMove,index, jumpDirection, board, jumpIndex, doubleTakeArr,  tempArrForJumps, -9, jumpDirection2nd, doubleTakeLanding)

    
  })

}

doubleTake()

// ----------------------------------------------------
// triple take checker
if (doubleTakeArr.length) tempArrForJumps = doubleTakeArr

function tripleTake() {
  if (!doubleTakeArr.length) return
  const jumpIndices = doubleTakeLanding.map((item, index) => {
    return board.indexOf(item)
  })
  const arrToJump = doubleTakeLanding.map((item, index) => {
        return {
          ...item,
          piece: itemToMove.piece,
          king: itemToMove.king,
          highlighted: false,

        }
      })
  
  arrToJump.forEach((item, index) => {
    const jumpIndex = jumpIndices[index]
    if (itemToMove.king) {

      kingTopLeftMulti(itemToMove, index, jumpDirection2nd, board, jumpIndex, tripleTakeArr, tempArrForJumps, -9)

      kingTopRightMulti(itemToMove, index, jumpDirection2nd, board, jumpIndex, tripleTakeArr, tempArrForJumps, -7)

      kingBotLeftMulti(itemToMove, index, jumpDirection2nd, board, jumpIndex, tripleTakeArr, tempArrForJumps, 7)

      kingBotRightMulti(itemToMove, index, jumpDirection2nd, board, jumpIndex, tripleTakeArr, tempArrForJumps, 9)
    }
  })


}
tripleTake()
// ----------------------------------------------------
if (tripleTakeArr.length) tempArrForJumps = tripleTakeArr
    
    const tempboard = board.map((item, index) => {
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


    setPossibleMoves([...tempArrForMoves])
    setBoardData([...tempboard])
    setPieceToMove({...itemToMove})

  }



  function movePiece(pieceToMove: [], placeToLand: [], index: number) {
    let movingPiece = pieceToMove
    let chipToBeTaken = {}
    let multipleJumpSearcher = {}
    let jumpSearcherIndex = -1000
    let jumped = false
    let jumpDirection: (null|string) = kingJumpDirection

    // find the selected chip
    const chipToMove = boardData.find((item) => {
      if (item.x === movingPiece.x && item.y === movingPiece.y) {
        return item
      }
    })

    let newBoardData = boardData.map((item, index) => {
      if (!item.playable) return item
      const indexStart = boardData.indexOf(chipToMove)
      const indexLand = boardData.indexOf(placeToLand)

      
            

      if (item === chipToMove) {
        return {...item, piece: null, selected: true, king:false}
      }

      if (
        item.x === placeToLand.x && item.y ===  placeToLand.y) {
        multipleJumpSearcher = {
          ...item,
          piece: movingPiece.piece,
          highlighted: false, 
          king: movingPiece.king, 
          selected: true
        }
        jumpSearcherIndex = index

        return multipleJumpSearcher
      }
      
      // removes captured
      POSSIBLEJUMPS.forEach((possibleMoves) => {
        if (
          possibleMoves.indexOf(index) !== -1 &&
          possibleMoves.indexOf(indexStart) !== -1 &&
          possibleMoves.indexOf(indexLand) !== -1 &&
          indexLand !== index &&
          item?.piece !== null &&
          (index > indexStart && index < indexLand || 
            index < indexStart && index > indexLand)
        ) {
            chipToBeTaken = item
            const indexEat = boardData.indexOf(item)
            if
            (
              indexLand > indexEat &&
              indexLand === indexEat + 7 ||
              indexLand === indexEat + 14 ||
              indexLand === indexEat + 21 ||
              indexLand === indexEat + 28 ||
              indexLand === indexEat + 35 ||
              indexLand === indexEat + 42 
            ) {
              setKingJumpDirection('bot left')
              jumpDirection = 'bot left'
            }
            else if
            (
              indexLand < indexEat &&
              indexLand === indexEat - 7 ||
              indexLand === indexEat - 14 ||
              indexLand === indexEat - 21 ||
              indexLand === indexEat - 28 ||
              indexLand === indexEat - 35 ||
              indexLand === indexEat - 42 
            ) {
              setKingJumpDirection('top right')
              jumpDirection = 'top right'

            } 
            else if
            (
              indexLand > indexEat &&
              indexLand === indexEat + 9 ||
              indexLand === indexEat + 18 ||
              indexLand === indexEat + 27 ||
              indexLand === indexEat + 36 ||
              indexLand === indexEat + 45 ||
              indexLand === indexEat + 54 || 
              indexLand === indexEat + 63  
            ) {
              setKingJumpDirection('bot right')
              jumpDirection = 'bot right'

            }
            else if
            (
              indexLand < indexEat &&
              indexLand === indexEat - 9 ||
              indexLand === indexEat - 18 ||
              indexLand === indexEat - 27 ||
              indexLand === indexEat - 36 ||
              indexLand === indexEat - 45 ||
              indexLand === indexEat - 54 || 
              indexLand === indexEat - 63  
            ) {
              console.log('top left')
              setKingJumpDirection('top left')
              jumpDirection = 'top left'
            }
              
          
        }
        
      })

    
      
      return {...item, highlighted: false, selected: false,}

    })

    
  
    newBoardData =  newBoardData.map((item, index) => {
      const capturedIndex = boardData.indexOf(chipToBeTaken)
      if (index === capturedIndex) {
        console.log('captured', item)
        jumped = true
        return {
          ...item, 
          piece: null, 
          king: false,
          selected: false, 
          highlighted: false,
          movable: true
        }
      }
      


        return {...item, movable: true}
      
    })
    // setBoardData([...newArr])
    
    let forceFeed = []
    function eatMoreChips(pieceToJump, index: number, board, pieceJumped: boolean, kingJumpDirection: string) {
      if (!pieceJumped) return // only when a piece do a capture that this will run
      forceFeed = []
      if (!pieceToJump.king) {
          regularCapture(pieceToJump, index, board, forceFeed, -7)
          regularCapture(pieceToJump, index, board, forceFeed, -9)
          regularCapture(pieceToJump, index, board, forceFeed, 7)
          regularCapture(pieceToJump, index, board, forceFeed, 9)
        }

      if (pieceToJump.king) {
        // top right
        kingTopLeftCapture(pieceJumped, index, board, kingJumpDirection, forceFeed, -9)
        kingTopRightCapture(pieceJumped, index, board, kingJumpDirection, forceFeed, -7)
        kingBotLeftCapture(pieceJumped, index, board, kingJumpDirection, forceFeed, 7)
        kingBotRightCapture(pieceJumped, index, board, kingJumpDirection, forceFeed, 9)
      }
      if (forceFeed.length) {
        // console.log(forceFeed, 'you must eat this again')
        movingPiece = pieceToJump
        setMultipleCapture(true)
        forceFeed = forceFeed.filter((force) => {
      if (playerOneTurn) return force.piece === 'z'
      if (!playerOneTurn) return force.piece === 'x'
    })

      newBoardData = board.map((item, sameIndex) => {
          if (!item.playable) return item
          if (!item === null) return item
          if (playerOneTurn && item?.piece === 'x') return item
          if (!playerOneTurn && item?.piece === 'z') return item
          else if (sameIndex === index) {
          // console.log('matched')
          return {...item, movable: true}
        }


        return {...item, movable: false}
        })
      
      }
    }
    

    eatMoreChips(multipleJumpSearcher, jumpSearcherIndex, newBoardData, jumped, jumpDirection)



    function kingPromotionChecker() {
      if (forceFeed.length) return
      newBoardData = newBoardData.map((item) => {
        if (!item.playable) return item

        else if (item.piece === 'z' && !item.king && item.y === 7) {
          console.log('player 1 king awakened')
          return {...item, king: true}
        }
        
        else if (item.piece === 'x' && !item.king && item.y === 0) {
          console.log('player 2 king awakened')
          return {...item, king: true}
        }
        return item
      })
    }

    kingPromotionChecker()
  
    setBoardData([...newBoardData])
  
    

    // if no additional piece to be take this will end the turn of the player
    
    setPieceToMove(null)
    // setPlayerOneTurn(!playerOneTurn)
    setForceCapture(false)
    setIsFirstMove(false)
  }

  function handleRestart() {
    setBoardData(arrayData)
    setPieceToMove(null)
    setPossibleMoves([])
    setPlayerOneTurn(true)
    setPlayerChipsCount({p1: 12, p2: 12})
    setGameOver(false)
    setJumpedChip(null)
    setMultipleCapture(false)
    setForceCapture(false)
    setKingJumpDirection(null)
    setIsFirstMove(true)
    setTimesUp(false)

    handleReset()
  } 

  function handleReset() {
    setIsActive(false);
    setTimerOne(timeLimit);
    setTimerTwo(timeLimit);
    setCurrentTimer(1);
  };


  // player chips counter
  useEffect(() => {
    let playerMoveArr  = []
    let tempArr = []
    let jumpDirection = []

    boardData.forEach((item, index) => {
      if (!item?.playable) return // black squares
      if (item?.piece === null) return // empty white squares

      if (!item.king) {
        if (playerOneTurn) {
          checkForMovesPlayerOne(item, index, boardData, playerMoveArr, -7)
          checkForMovesPlayerOne(item, index, boardData, playerMoveArr, -9)

        } else {
          checkForMovesPlayerTwo(item, index, boardData, playerMoveArr, 7)
          checkForMovesPlayerTwo(item, index, boardData, playerMoveArr, 9)

        }
        

      }
      if (item.king) {
        if (playerOneTurn && item?.piece ==='x') return
        if (!playerOneTurn && item?.piece === 'z') return
        kingBotLeft(item, index, kingJumpDirection, boardData, tempArr, tempArr, jumpDirection, 7)

        kingBotRight(item, index, kingJumpDirection, boardData, tempArr, tempArr, jumpDirection, 9)

        kingTopLeft(item, index, kingJumpDirection, boardData, tempArr, tempArr, jumpDirection, -9)

        kingTopRight(item, index, kingJumpDirection, boardData, tempArr, tempArr, jumpDirection, -7)
      }
      
    })
    
    tempArr.forEach(item => {
      playerMoveArr.push(item)
    })


    // if a player has no moves left the game is over
    if (!playerMoveArr.length) {
      setGameOver(true)
    }
  }, [playerOneTurn])




  return (
    <GlobalContext.Provider value={{
      boardData, 
      setBoardData,
      highlightMoves,
      highlightMovesKing,
      movePiece, 
      pieceToMove,
      setPieceToMove,
      playerOneTurn,
      setPlayerOneTurn,
      gameOver,
      setGameOver,
      playerChipsCount,
      setPossibleMoves,
      jumpedChip,
      setJumpedChip,
      multipleCapture,
      setMultipleCapture,
      forceCapture,
      setForceCapture,
      setKingJumpDirection,
      handleRestart,
      gameMode,
      setGameMode,
      timerOne,
      setTimerOne,
      timerTwo,
      setTimerTwo,
      isActive,
      setIsActive,
      currentTimer,
      setCurrentTimer,
      isFirstMove,
      handleReset,
      setTimesUp,
      timeSup,
      timeLimit,
      setTimeLimit
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
