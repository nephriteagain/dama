import { useEffect, useRef } from "react"

import { useGlobalContext } from "../context/GameContext"
import Timer from './Timer'
import TimerTwo from "./TimerTwo"

import '../sass/Gameboard.scss'
// regular chips
import { forceCaptureRegular } from "../gamelogic/forceCapture/forceCapture/forceCaptureFirstJump"
import { foreCaptureSecond } from "../gamelogic/forceCapture/forceCapture/forceCaptureSecond"
import { forceCaptureThird } from "../gamelogic/forceCapture/forceCapture/forceCaptureThird"

// king chips
import { forceKingCapture } from "../gamelogic/forceCapture/kingForceCapture/forceKingFirst/forceKingFirst"
import { forceKingBotLeft } from "../gamelogic/forceCapture/kingForceCapture/forceKingSecond/forceKingSecondBotLeft"
import { forceKingBotRight } from "../gamelogic/forceCapture/kingForceCapture/forceKingSecond/forceKingSecondBotRight"
import { forceKingTopLeft } from "../gamelogic/forceCapture/kingForceCapture/forceKingSecond/forceKingSecondTopLeft"
import { forceKingTopRight } from "../gamelogic/forceCapture/kingForceCapture/forceKingSecond/forceKingSecondTopRight"
import { forceKingThirdBotLeft } from "../gamelogic/forceCapture/kingForceCapture/forceKingThird/forceKingThirdBotLeft"
import { forceKingThirdBotRight } from "../gamelogic/forceCapture/kingForceCapture/forceKingThird/forceKingThirdBotRight"
import { forceKingThirdTopLeft } from "../gamelogic/forceCapture/kingForceCapture/forceKingThird/forceKingThirdTopLeft"
import { forceKingThirdTopRight } from "../gamelogic/forceCapture/kingForceCapture/forceKingThird/forceKingThirdTopRight"

function Gameboard({showRules}) {
  


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
    multipleCapture,
    setMultipleCapture,
    forceCapture,
    setForceCapture,
    setKingJumpDirection,
    handleRestart,
    setGameMode,
    gameMode,
    timerOne,
    setTimerOne,
    timerTwo,
    setTimerTwo,
    isActive,
    setIsActive,
    currentTimer,
    setCurrentTimer,
    isFirstMove,
    setIsFirstMove,
    handleReset,
    setGameOver,
    setTimesUp,
    timeSup

    
  } = useGlobalContext()

  function changeGameMode() {
    setGameMode('')
  }
  
  const handleStart = () => {
    setIsActive(true);
  };

  const handleNext = () => {
    if (!playerOneTurn) setCurrentTimer(2)
    if (playerOneTurn) setCurrentTimer(1)
  };


 

    useEffect(() => {
    if (isFirstMove) return
    handleNext()
    console.log('handle next ran')
  }, [playerOneTurn])


  useEffect(() => {
    let interval = null;
    if  (isActive && getCurrentTimer() === 0) setTimesUp(true)
    if (isActive && getCurrentTimer() > 0) {
      interval = setInterval(() => {
        if (currentTimer === 1) {
          setTimerOne(timerOne => timerOne - 1);
        } else {
          setTimerTwo(timerTwo => timerTwo - 1);
        } 
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timerOne, timerTwo, currentTimer]);

  const getCurrentTimer = () => {
    return currentTimer === 1 ? timerOne : timerTwo;
  };


  // game over handler
  useEffect(() => {
    if (timeSup) setGameOver(true)
  }, [timeSup])

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
      if (item?.piece === null) return
      // regular pawn only
      else if (!item.king) {
        forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -7)
        forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -9)
        forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 9)
        forceCaptureRegular(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 7)
      
    }
      else if (item.king) {
      }
      forceKingCapture(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -7)
      forceKingCapture(item, index, boardData, forceFeed, jumpDirection, jumpedArr, -9)
      forceKingCapture(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 7)
      forceKingCapture(item, index, boardData, forceFeed, jumpDirection, jumpedArr, 9)
      
      })

      console.log(forceFeed, 'forcefeed')
      console.log(jumpedArr, 'jumped arr')

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
          foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, -7)
          foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, -9)
          foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, 7)
          foreCaptureSecond(itemToMove, index, boardData, jumpIndex, jumpDirection2nd, forceFeed2nd, jumpDirection, jumpedArr2nd, forceFeed, 9)
      }
          else if (itemToMove.king) {
            forceKingBotLeft(itemToMove, index, boardData, jumpIndex, jumpDirection, jumpedArr2nd, jumpDirection2nd, forceFeed2nd, forceFeed, 7)
            forceKingBotRight(itemToMove, index, boardData, jumpIndex, jumpDirection, jumpedArr2nd, jumpDirection2nd, forceFeed2nd, forceFeed, 9)
            forceKingTopLeft(itemToMove, index, boardData, jumpIndex, jumpDirection, jumpedArr2nd, jumpDirection2nd, forceFeed2nd, forceFeed, -9)
            forceKingTopRight(itemToMove, index, boardData, jumpIndex, jumpDirection, jumpedArr2nd, jumpDirection2nd, forceFeed2nd, forceFeed, -7)
          }
      })
    }
    doubleTake()


    

    console.log(forceFeed2nd, 'forcefeed2nd')
    console.log(jumpedArr2nd, 'jump arr second')

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
      forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -7)
      forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -9)
      forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 7)
      forceCaptureThird(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 9)
}
    else if (item.king) {
      forceKingThirdBotLeft(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 7)
      forceKingThirdBotRight(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, 9)
      forceKingThirdTopLeft(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -9)
      forceKingThirdTopRight(item, index, boardData, jumpIndex, jumpDirection2nd, forceFeed3rd, forceFeed2nd, -7)
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

  const playerTurnStyle = {}
  if (playerOneTurn) {
    playerTurnStyle.color = 'red'
    playerTurnStyle.backgroundColor = 'rgb(255, 220, 220)'
  }
  else if (!playerOneTurn) {
    playerTurnStyle.color = 'blue'
    playerTurnStyle.backgroundColor = 'rgb(220, 220, 255)'
  }
  


  return (
    <div className="container">
    <div className="player-turn"
    style={playerTurnStyle}
    >
      Player {playerOneTurn? 'One' : 'Two'}'s Turn
    </div>

    <div className="restart-game">
      <button className="btn-restart"
        onClick={() => {
          handleRestart()
          handleReset()
        }}
      >Restart Game</button>
    </div>
    <div className="change-mode">
      <button className="btn-mode"
        onClick = {
          () => {
            handleRestart()
            handleReset()
            changeGameMode()
          }
        }
      >
        Change Game Mode
      </button>
    </div>
    <div className="show-rules">
        <button className="btn-show-rules" onClick={showRules}>
          Show Rules
        </button>
    </div>
    { gameMode && <div className="current-game-mode">
        Game Mode: <span>{gameMode.toUpperCase()}</span>
    </div> }
    <TimerTwo timerTwo={timerTwo} currentTimer={currentTimer} />

    <div className='board'>
      { boardData.map((item: [], index: number) => {

        const boardStyle  = {}
        function boardStyling() {
        if (!item.playable) {
          boardStyle.backgroundColor = '#111'
        } else if (item?.highlighted) {
          boardStyle.backgroundColor = '#ccccff'
          boardStyle.cursor = 'pointer'
        } else if (item?.selected) {
          boardStyle.backgroundColor = '#6CD486'
        } else if (playerOneTurn) {
          boardStyle.backgroundColor = 'rgba(255, 0, 0, 0.08)'
        } else if (!playerOneTurn) {
          boardStyle.backgroundColor = 'rgba(0,0,255, 0.08)'
        }
        }
        boardStyling()
        
        const chipStyle = {}
        function chipStyling() {
        if (item?.piece === 'z') chipStyle.background = 'linear-gradient(to right, red 0%, rgb(255, 90, 90) 70%)'
        if (item?.piece === 'x') chipStyle.background = 'linear-gradient(to right, blue 0%, rgb(90, 90, 255) 70%)'
        if (item?.king) chipStyle.border = '0.4rem dashed #111'
        if (item?.movable) chipStyle.opacity = '1'
        if (!item?.movable) chipStyle.opacity = '0.4'
        }
        chipStyling()
        
        // cursor pointers
        function cursorPointers() {
          if (playerOneTurn && item?.piece === 'z' && item?.movable) chipStyle.cursor = 'grab'
        if (playerOneTurn && item?.piece === 'x' && item?.movable) chipStyle.cursor = 'not-allowed'
        if (!playerOneTurn && item?.piece === 'x' && item?.movable) chipStyle.cursor = 'grab'
        if (!playerOneTurn && item?.piece === 'z' && item?.movable) chipStyle.cursor = 'not-allowed'
        if (playerOneTurn && item?.piece === 'z' && !item?.movable) chipStyle.cursor = 'not-allowed'
        if (!playerOneTurn && item?.piece === 'x' && !item?.movable) chipStyle.cursor = 'not-allowed'
        }
        cursorPointers()
        



        return ( 
          <div className='square'
            key={index}
            style={boardStyle}
            onClick={
              () => {
                if (!item.highlighted) return
                isFirstMove && handleStart()
                movePiece(pieceToMove, item, index)
                
              }
            }
          >

          {item.piece !== null && 
          <div className="piece"
            draggable='true'
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
    <Timer timerOne={timerOne} currentTimer={currentTimer}/>
    </div>
  )
}

export default Gameboard