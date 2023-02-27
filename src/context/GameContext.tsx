import { useContext, createContext, useState, useEffect, ReactNode } from "react"
import { compileString } from "sass"
import Gameboard from "../components/Gameboard"

import { arrayData } from "../data/arrayData"
import { POSSIBLEJUMPS } from "../data/possibleJumps"

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

  const [ playerOneTurn, setPlayerOneTurn ] = useState(false) // player one will still be first to move regardless
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
     // p1 man left move
    if (
      itemToMove?.piece === 'z' &&
      board[position - 9]?.piece === null &&
      board[position - 9]?.playable
      ) {
      tempArrForMoves.push(board[position - 9])

    }
    // p1 man right move
    if (
      itemToMove?.piece === 'z' &&
      board[position - 7]?.piece === null &&
      board[position - 7]?.playable
      ) {
      tempArrForMoves.push(board[position - 7])

    }
    // p2 man left move
    if (
      itemToMove?.piece === 'x' &&
      board[position + 9]?.piece === null &&
      board[position + 9]?.playable
      ) {
      tempArrForMoves.push(board[position + 9])

    }
    // p2 man right move
    if (
      itemToMove?.piece === 'x' &&
      board[position + 7]?.piece === null &&
      board[position + 7]?.playable

      ) {
      tempArrForMoves.push(board[position + 7])

    }

    // top right jump
    if (
      board[position - 14]?.playable &&
      board[position - 14]?.piece === null &&
      board[position - 7]?.piece !== null &&
      board[position - 7]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position - 14])
        jumpDirection.push('top right')
      }
    // top left
    if (
      board[position - 18]?.playable &&
      board[position - 18]?.piece === null &&
      board[position - 9]?.piece !== null &&
      board[position - 9]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position - 18])
        jumpDirection.push('top left')
      }
    // bot left
    if (
      board[position + 14]?.playable &&
      board[position + 14]?.piece === null &&
      board[position + 7]?.piece !== null &&
      board[position + 7]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position + 14])
        jumpDirection.push('bot left')

      }
    // bot right
    if (
      board[position + 18]?.playable &&
      board[position + 18]?.piece === null &&
      board[position + 9]?.piece !== null &&
      board[position + 9]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position + 18])
        jumpDirection.push('bot right')

      }
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
        const jumpIndex = arrToJumpIndices[index]
        if (!itemToMove.king) {
          // top right jump
          if (
            board[jumpIndex - 14]?.playable &&
            board[jumpIndex - 14]?.piece === null &&
            board[jumpIndex - 7]?.piece !== null &&
            board[jumpIndex - 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot left'
            ) {
              doubleTakeArr.push(tempArrForJumps[index])
              jumpDirection2nd.push('top right')
              tempArrForJumps2.push(board[jumpIndex - 14])
            }
          // top left
          if (
            board[jumpIndex - 18]?.playable &&
            board[jumpIndex - 18]?.piece === null &&
            board[jumpIndex - 9]?.piece !== null &&
            board[jumpIndex - 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'bot right'
            ) {
              doubleTakeArr.push(tempArrForJumps[index])
              jumpDirection2nd.push('top left')
              tempArrForJumps2.push(board[jumpIndex - 18])

            }
          // bot left
          if (
            board[jumpIndex + 14]?.playable &&
            board[jumpIndex + 14]?.piece === null &&
            board[jumpIndex + 7]?.piece !== null &&
            board[jumpIndex + 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top right'
            ) {
              doubleTakeArr.push(tempArrForJumps[index])
              jumpDirection2nd.push('bot left')
              tempArrForJumps2.push(board[jumpIndex + 14])

            } 
          // bot right
          if (
            board[jumpIndex + 18]?.playable &&
            board[jumpIndex + 18]?.piece === null &&
            board[jumpIndex + 9]?.piece !== null &&
            board[jumpIndex + 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top left'
            ) {
              doubleTakeArr.push(tempArrForJumps[index])
              jumpDirection2nd.push('bot right')
              tempArrForJumps2.push(board[jumpIndex + 18])
            }
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
        // top right
        if (
            board[jumpIndices[index] - 14]?.playable &&
            board[jumpIndices[index] - 14]?.piece === null &&
            board[jumpIndices[index] - 7]?.piece !== null &&
            board[jumpIndices[index] - 7]?.piece !== itemToMove?.piece &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
              tripleTakeArr.push(tempArrForJumps[index])

            }
          // top left
          if (
            board[jumpIndices[index] - 18]?.playable &&
            board[jumpIndices[index] - 18]?.piece === null &&
            board[jumpIndices[index] - 9]?.piece !== null &&
            board[jumpIndices[index] - 9]?.piece !== itemToMove?.piece &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
              tripleTakeArr.push(tempArrForJumps[index])
            }
          // bot left
          if (
            board[jumpIndices[index] + 14]?.playable &&
            board[jumpIndices[index] + 14]?.piece === null &&
            board[jumpIndices[index] + 7]?.piece !== null &&
            board[jumpIndices[index] + 7]?.piece !== itemToMove?.piece &&
            jumpDirection2nd[index] !== 'top right'
            ) {
              tripleTakeArr.push(tempArrForJumps[index])
            } 
          // bot right
          if (
            board[jumpIndices[index] + 18]?.playable &&
            board[jumpIndices[index] + 18]?.piece === null &&
            board[jumpIndices[index] + 9]?.piece !== null &&
            board[jumpIndices[index] + 9]?.piece !== itemToMove?.piece &&
            jumpDirection2nd[index] !== 'top left'
            ) {
              tripleTakeArr.push(tempArrForJumps[index])
            }
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
      function topRight() {
        if (kingJumpDirection === 'bot left') return
        if (board[position - 7]?.piece === null && board[position - 7].playable === true) {
      tempArrForMoves.push(board[position - 7])
      if (board[position - 14]?.piece === null && board[position - 14].playable === true) {
        tempArrForMoves.push(board[position - 14])
        if (board[position - 21]?.piece === null && board[position - 21].playable === true) {
          tempArrForMoves.push(board[position - 21])
          if (board[position - 28]?.piece === null && board[position - 28].playable === true) {
            tempArrForMoves.push(board[position - 28])
            if (board[position - 35]?.piece === null && board[position - 35].playable === true) {
              tempArrForMoves.push(board[position - 35])
              if (board[position - 42]?.piece === null && board[position - 42].playable === true) {
                tempArrForMoves.push(board[position - 42])
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForMoves.push(board[position - 49])
                }
              } else if (
      board[position - 42]?.piece !== null &&
      board[position - 42]?.piece !== itemToMove.piece &&
      board[position - 49]?.playable &&
      board[position - 49]?.piece === null
    ) {
                  tempArrForJumps.push(board[position - 49])
                  jumpDirection.push('top right')
                }

            }  else if (
      board[position - 35]?.piece !== null &&
      board[position - 35]?.piece !== itemToMove.piece &&
      board[position - 42]?.playable &&
      board[position - 42]?.piece === null
    ) {
                tempArrForJumps.push(board[position - 42])
                jumpDirection.push('top right')
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
                  jumpDirection.push('top right')
                }
              }

          } else if (
      board[position - 28]?.piece !== null &&
      board[position - 28]?.piece !== itemToMove.piece &&
      board[position - 35]?.playable &&
      board[position - 35]?.piece === null
    ) {
              tempArrForJumps.push(board[position - 35])
              jumpDirection.push('top right')
              if (board[position - 42]?.piece === null && board[position - 42].playable === true) {
                tempArrForJumps.push(board[position - 42])
                jumpDirection.push('top right')
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
                  jumpDirection.push('top right')
                }
              }
            }

        } else if (
      board[position - 21]?.piece !== null &&
      board[position - 21]?.piece !== itemToMove.piece &&
      board[position - 28]?.playable &&
      board[position - 28]?.piece === null
    ) {
            tempArrForJumps.push(board[position - 28])
            jumpDirection.push('top right')
            if (board[position - 35]?.piece === null && board[position - 35].playable === true) {
              tempArrForJumps.push(board[position - 35])
              jumpDirection.push('top right')
              if (board[position - 42]?.piece === null && board[position - 42].playable === true) {
                tempArrForJumps.push(board[position - 42])
                jumpDirection.push('top right')
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
                  jumpDirection.push('top right')
                }
              }
            }
          }

      } else if (
      board[position - 14]?.piece !== null &&
      board[position - 14]?.piece !== itemToMove.piece &&
      board[position - 21]?.playable &&
      board[position - 21]?.piece === null
    ) {
          tempArrForJumps.push(board[position - 21])
          jumpDirection.push('top right')
          if (board[position - 28]?.piece === null && board[position - 28].playable === true) {
            tempArrForJumps.push(board[position - 28])
            jumpDirection.push('top right')
            if (board[position - 35]?.piece === null && board[position - 35].playable === true) {
              tempArrForJumps.push(board[position - 35])
              jumpDirection.push('top right')
              if (board[position - 42]?.piece === null && board[position - 42].playable === true) {
                tempArrForJumps.push(board[position - 42])
                jumpDirection.push('top right')
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
                  jumpDirection.push('top right')
                }
              }
            }
          }
        }

    } else if (
      board[position - 7]?.piece !== null &&
      board[position - 7]?.piece !== itemToMove.piece &&
      board[position - 14]?.playable &&
      board[position - 14]?.piece === null
    ) {
        tempArrForJumps.push(board[position - 14])
        jumpDirection.push('top right')
        if (board[position - 21]?.piece === null && board[position - 21].playable === true) {
          tempArrForJumps.push(board[position - 21])
          jumpDirection.push('top right')
          if (board[position - 28]?.piece === null && board[position - 28].playable === true) {
            tempArrForJumps.push(board[position - 28])
            jumpDirection.push('top right')
            if (board[position - 35]?.piece === null && board[position - 35].playable === true) {
              tempArrForJumps.push(board[position - 35])
              jumpDirection.push('top right')
              if (board[position - 42]?.piece === null && board[position - 42].playable === true) {
                tempArrForJumps.push(board[position - 42])
                jumpDirection.push('top right')
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
                  jumpDirection.push('top right')
                }
              }
            }
          }
        }
      }
      }
    

    // top left move
    function topLeft() {
      if (kingJumpDirection ===  'bot right') return
      if (board[position - 9]?.piece === null && board[position - 9].playable === true) {
      tempArrForMoves.push(board[position - 9])
      if (board[position - 18]?.piece === null && board[position - 18].playable === true) {
        tempArrForMoves.push(board[position - 18])
        if (board[position - 27]?.piece === null && board[position - 27].playable === true) {
          tempArrForMoves.push(board[position - 27])
          if (board[position - 36]?.piece === null && board[position - 36].playable === true) {
            tempArrForMoves.push(board[position - 36])
            if (board[position - 45]?.piece === null && board[position - 45].playable === true) {
              tempArrForMoves.push(board[position - 45])
              if (board[position - 54]?.piece === null && board[position - 54].playable === true) {
                tempArrForMoves.push(board[position - 54])
                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForMoves.push(board[position - 63])
                }
              } else if (
      board[position - 54]?.piece !== null &&
      board[position - 54]?.piece !== itemToMove.piece &&
      board[position - 63]?.playable &&
      board[position - 63]?.piece === null
    ) {
                tempArrForJumps.push(board[position - 63])
                jumpDirection.push('top left')

              }
            } else if (
      board[position - 45]?.piece !== null &&
      board[position - 45]?.piece !== itemToMove.piece &&
      board[position - 54]?.playable &&
      board[position - 54]?.piece === null
    ) {
                tempArrForJumps.push(board[position - 54])
                jumpDirection.push('top left')

                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
                jumpDirection.push('top left')

                }
              }
            
          } else if (
      board[position - 36]?.piece !== null &&
      board[position - 36]?.piece !== itemToMove.piece &&
      board[position - 45]?.playable &&
      board[position - 45]?.piece === null
    ) {
              tempArrForJumps.push(board[position - 45])
              jumpDirection.push('top left')

              if (board[position - 54]?.piece === null && board[position - 54].playable === true) {
                tempArrForJumps.push(board[position - 54])
                jumpDirection.push('top left')

                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
                jumpDirection.push('top left')

                }
              }
            }

        } else if (
      board[position - 27]?.piece !== null &&
      board[position - 27]?.piece !== itemToMove.piece &&
      board[position - 36]?.playable &&
      board[position - 36]?.piece === null
    ) {
            tempArrForJumps.push(board[position - 36])
            jumpDirection.push('top left')

            if (board[position - 45]?.piece === null && board[position - 45].playable === true) {
              tempArrForJumps.push(board[position - 45])
              jumpDirection.push('top left')

              if (board[position - 54]?.piece === null && board[position - 54].playable === true) {
                tempArrForJumps.push(board[position - 54])
                jumpDirection.push('top left')

                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
                jumpDirection.push('top left')

                }
              }
            }
          }

      } else if (
      board[position - 18]?.piece !== null &&
      board[position - 18]?.piece !== itemToMove.piece &&
      board[position - 27]?.playable &&
      board[position - 27]?.piece === null
    ) {
          tempArrForJumps.push(board[position - 27])
          jumpDirection.push('top left')

          if (board[position - 36]?.piece === null && board[position - 36].playable === true) {
            tempArrForJumps.push(board[position - 36])
            jumpDirection.push('top left')

            if (board[position - 45]?.piece === null && board[position - 45].playable === true) {
              tempArrForJumps.push(board[position - 45])
              jumpDirection.push('top left')

              if (board[position - 54]?.piece === null && board[position - 54].playable === true) {
                tempArrForJumps.push(board[position - 54])
                jumpDirection.push('top left')

                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
                jumpDirection.push('top left')

                }
              }
            }
          }
        }

    } else if (
      board[position - 9]?.piece !== null &&
      board[position - 9]?.piece !== itemToMove.piece &&
      board[position - 18]?.playable &&
      board[position - 18]?.piece === null
    ) {
        tempArrForJumps.push(board[position - 18])
        jumpDirection.push('top left')

        if (board[position - 27]?.piece === null && board[position - 27].playable === true) {
          tempArrForJumps.push(board[position - 27])
          jumpDirection.push('top left')

          if (board[position - 36]?.piece === null && board[position - 36].playable === true) {
            tempArrForJumps.push(board[position - 36])
            jumpDirection.push('top left')

            if (board[position - 45]?.piece === null && board[position - 45].playable === true) {
              tempArrForJumps.push(board[position - 45])
              jumpDirection.push('top left')

              if (board[position - 54]?.piece === null && board[position - 54].playable === true) {
                tempArrForJumps.push(board[position - 54])
                jumpDirection.push('top left')

                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
                jumpDirection.push('top left')

                }
              }
            }
          }
        }
      }
    }
    
    // bottom right move
    function botRight() {
        if (kingJumpDirection === 'top left') return

      if (board[position + 9]?.piece === null && board[position + 9].playable === true) {
      tempArrForMoves.push(board[position + 9])
      if (board[position + 18]?.piece === null && board[position + 18].playable === true) {
        tempArrForMoves.push(board[position + 18])
        if (board[position + 27]?.piece === null && board[position + 27].playable === true) {
          tempArrForMoves.push(board[position + 27])
          if (board[position + 36]?.piece === null && board[position + 36].playable === true) {
            tempArrForMoves.push(board[position + 36])
            if (board[position + 45]?.piece === null && board[position + 45].playable === true) {
              tempArrForMoves.push(board[position + 45])
              if (board[position + 54]?.piece === null && board[position + 54].playable === true) {
                tempArrForMoves.push(board[position + 54])
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForMoves.push(board[position + 63])
                }
              } else if (
      board[position + 54]?.piece !== null &&
      board[position + 54]?.piece !== itemToMove.piece &&
      board[position + 63]?.playable &&
      board[position + 63]?.piece === null
    ) {
                tempArrForJumps.push(board[position + 63])
                jumpDirection.push('bot right')
              }
            } else if (
      board[position + 45]?.piece !== null &&
      board[position + 45]?.piece !== itemToMove.piece &&
      board[position + 54]?.playable &&
      board[position + 54]?.piece === null
    ) {
                tempArrForJumps.push(board[position + 54])
                jumpDirection.push('bot right')
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
                jumpDirection.push('bot right')
                }
              }
            
          } else if (
      board[position + 36]?.piece !== null &&
      board[position + 36]?.piece !== itemToMove.piece &&
      board[position + 45]?.playable &&
      board[position + 45]?.piece === null
    ) {
              tempArrForJumps.push(board[position + 45])
              jumpDirection.push('bot right')
              if (board[position + 54]?.piece === null && board[position + 54].playable === true) {
                tempArrForJumps.push(board[position + 54])
                jumpDirection.push('bot right')
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
                jumpDirection.push('bot right')
                }
              }
            }

        } else if (
      board[position + 27]?.piece !== null &&
      board[position + 27]?.piece !== itemToMove.piece &&
      board[position + 36]?.playable &&
      board[position + 36]?.piece === null
    ) {
            tempArrForJumps.push(board[position + 36])
            jumpDirection.push('bot right')
            if (board[position + 45]?.piece === null && board[position + 45].playable === true) {
              tempArrForJumps.push(board[position + 45])
              jumpDirection.push('bot right')
              if (board[position + 54]?.piece === null && board[position + 54].playable === true) {
                tempArrForJumps.push(board[position + 54])
                jumpDirection.push('bot right')
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
                jumpDirection.push('bot right')
                }
              }
            }
          }

      } else if (
      board[position + 18]?.piece !== null &&
      board[position + 18]?.piece !== itemToMove.piece &&
      board[position + 27]?.playable &&
      board[position + 27]?.piece === null
    ) {
          tempArrForJumps.push(board[position + 27])
          jumpDirection.push('bot right')
          if (board[position + 36]?.piece === null && board[position + 36].playable === true) {
            tempArrForJumps.push(board[position + 36])
            jumpDirection.push('bot right')
            if (board[position + 45]?.piece === null && board[position + 45].playable === true) {
              tempArrForJumps.push(board[position + 45])
              jumpDirection.push('bot right')
              if (board[position + 54]?.piece === null && board[position + 54].playable === true) {
                tempArrForJumps.push(board[position + 54])
                jumpDirection.push('bot right')
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
                jumpDirection.push('bot right')
                }
              }
            }
          }
        }

    } else if (
      board[position + 9]?.piece !== null &&
      board[position + 9]?.piece !== itemToMove.piece &&
      board[position + 18]?.playable &&
      board[position + 18]?.piece === null
    ) {
        tempArrForJumps.push(board[position + 18])
        jumpDirection.push('bot right')
        if (board[position + 27]?.piece === null && board[position + 27].playable === true) {
          tempArrForJumps.push(board[position + 27])
          jumpDirection.push('bot right')
          if (board[position + 36]?.piece === null && board[position + 36].playable === true) {
            tempArrForJumps.push(board[position + 36])
            jumpDirection.push('bot right')
            if (board[position + 45]?.piece === null && board[position + 45].playable === true) {
              tempArrForJumps.push(board[position + 45])
              jumpDirection.push('bot right')
              if (board[position + 54]?.piece === null && board[position + 54].playable === true) {
                tempArrForJumps.push(board[position + 54])
                jumpDirection.push('bot right')
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
                jumpDirection.push('bot right')
                }
              }
            }
          }
        }
      }
    }
    
    // bottom left move
    function botLeft() {
        if (kingJumpDirection === 'top right') return

      if (board[position + 7]?.piece === null && board[position + 7].playable === true) {
      tempArrForMoves.push(board[position + 7])
      if (board[position + 14]?.piece === null && board[position + 14].playable === true) {
        tempArrForMoves.push(board[position + 14])
        if (board[position + 21]?.piece === null && board[position + 21].playable === true) {
          tempArrForMoves.push(board[position + 21])
          if (board[position + 28]?.piece === null && board[position + 28].playable === true) {
            tempArrForMoves.push(board[position + 28])
            if (board[position + 35]?.piece === null && board[position + 35].playable === true) {
              tempArrForMoves.push(board[position + 35])
              if (board[position + 42]?.piece === null && board[position + 42].playable === true) {
                tempArrForMoves.push(board[position + 42])
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForMoves.push(board[position + 49])
                }
              } else if (
      board[position + 42]?.piece !== null &&
      board[position + 42]?.piece !== itemToMove.piece &&
      board[position + 49]?.playable &&
      board[position + 49]?.piece === null
    ) {
                  tempArrForJumps.push(board[position + 49])
                  jumpDirection.push('bot left')
                }

            }  else if (
      board[position + 35]?.piece !== null &&
      board[position + 35]?.piece !== itemToMove.piece &&
      board[position + 42]?.playable &&
      board[position + 42]?.piece === null
    ) {
                tempArrForJumps.push(board[position + 42])
                jumpDirection.push('bot left')
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
                  jumpDirection.push('bot left')
                }
              }

          } else if (
      board[position + 28]?.piece !== null &&
      board[position + 28]?.piece !== itemToMove.piece &&
      board[position + 35]?.playable &&
      board[position + 35]?.piece === null
    ) {
              tempArrForJumps.push(board[position + 35])
              jumpDirection.push('bot left')
              if (board[position + 42]?.piece === null && board[position + 42].playable === true) {
                tempArrForJumps.push(board[position + 42])
                jumpDirection.push('bot left')
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
                  jumpDirection.push('bot left')
                }
              }
            }

        } else if (
      board[position + 21]?.piece !== null &&
      board[position + 21]?.piece !== itemToMove.piece &&
      board[position + 28]?.playable &&
      board[position + 28]?.piece === null
    ) {
            tempArrForJumps.push(board[position + 28])
            jumpDirection.push('bot left')
            if (board[position + 35]?.piece === null && board[position + 35].playable === true) {
              tempArrForJumps.push(board[position + 35])
              jumpDirection.push('bot left')
              if (board[position + 42]?.piece === null && board[position + 42].playable === true) {
                tempArrForJumps.push(board[position + 42])
                jumpDirection.push('bot left')
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
                  jumpDirection.push('bot left')
                }
              }
            }
          }

      } else if (
      board[position + 14]?.piece !== null &&
      board[position + 14]?.piece !== itemToMove.piece &&
      board[position + 21]?.playable &&
      board[position + 21]?.piece === null
    ) {
          tempArrForJumps.push(board[position + 21])
          jumpDirection.push('bot left')
          if (board[position + 28]?.piece === null && board[position + 28].playable === true) {
            tempArrForJumps.push(board[position + 28])
            jumpDirection.push('bot left')
            if (board[position + 35]?.piece === null && board[position + 35].playable === true) {
              tempArrForJumps.push(board[position + 35])
              jumpDirection.push('bot left')
              if (board[position + 42]?.piece === null && board[position + 42].playable === true) {
                tempArrForJumps.push(board[position + 42])
                jumpDirection.push('bot left')
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
                  jumpDirection.push('bot left')
                }
              }
            }
          }
        }

    } else if (
      board[position + 7]?.piece !== null &&
      board[position + 7]?.piece !== itemToMove.piece &&
      board[position + 14]?.playable &&
      board[position + 14]?.piece === null
    ) {
        tempArrForJumps.push(board[position + 14])
        jumpDirection.push('bot left')
        if (board[position + 21]?.piece === null && board[position + 21].playable === true) {
          tempArrForJumps.push(board[position + 21])
          jumpDirection.push('bot left')
          if (board[position + 28]?.piece === null && board[position + 28].playable === true) {
            tempArrForJumps.push(board[position + 28])
            jumpDirection.push('bot left')
            if (board[position + 35]?.piece === null && board[position + 35].playable === true) {
              tempArrForJumps.push(board[position + 35])
              jumpDirection.push('bot left')
              if (board[position + 42]?.piece === null && board[position + 42].playable === true) {
                tempArrForJumps.push(board[position + 42])
                jumpDirection.push('bot left')
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
                  jumpDirection.push('bot left')
                }
              }
            }
          }
        }
      }
    }
    
    topRight();topLeft();botRight();botLeft()
    }
    
    


    // console.log(tempArrForMoves, 'moves')


// ----- double take checker --------------------------
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
    // top right
    function topRight() {
      if (
        jumpDirection[index] !== 'bot left' &&
        board[jumpIndex - 7]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 7]?.piece !== null &&
        board[jumpIndex - 14]?.playable &&
        board[jumpIndex - 14]?.piece === null
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(board[jumpIndex - 14])
      }
      if (
        jumpDirection[index] !== 'bot left' &&
        board[jumpIndex - 7]?.playable &&
        board[jumpIndex - 7]?.piece === null &&
        board[jumpIndex - 14]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 14]?.piece !== null &&
        board[jumpIndex - 21]?.playable &&
        board[jumpIndex - 21]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(board[jumpIndex - 21])
      }
      if (
        jumpDirection[index] !== 'bot left' &&
        board[jumpIndex - 7]?.playable &&
        board[jumpIndex - 7]?.piece === null &&
        board[jumpIndex - 14]?.playable &&
        board[jumpIndex - 14]?.piece === null &&
        board[jumpIndex - 21]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 21]?.piece !== null &&
        board[jumpIndex - 28]?.playable &&
        board[jumpIndex - 28]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(board[jumpIndex - 28])
      }
      if (
        jumpDirection[index] !== 'bot left' &&
        board[jumpIndex - 7]?.playable &&
        board[jumpIndex - 7]?.piece === null &&
        board[jumpIndex - 14]?.playable &&
        board[jumpIndex - 14]?.piece === null &&
        board[jumpIndex - 21]?.playable &&
        board[jumpIndex - 21]?.piece === null &&
        board[jumpIndex - 28]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 28]?.piece !== null &&
        board[jumpIndex - 35]?.playable &&
        board[jumpIndex - 35]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(board[jumpIndex - 35])
      }
      if (
        jumpDirection[index] !== 'bot left' &&
        board[jumpIndex - 7]?.playable &&
        board[jumpIndex - 7]?.piece === null &&
        board[jumpIndex - 14]?.playable &&
        board[jumpIndex - 14]?.piece === null &&
        board[jumpIndex - 21]?.playable &&
        board[jumpIndex - 21]?.piece === null &&
        board[jumpIndex - 28]?.playable &&
        board[jumpIndex - 28]?.piece === null &&
        board[jumpIndex - 35]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 35]?.piece !== null &&
        board[jumpIndex - 42]?.playable &&
        board[jumpIndex - 42]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top right')
        doubleTakeLanding.push(board[jumpIndex - 42])
      }
    }
    // top left
    function topLeft() {
      if (
        jumpDirection[index] !== 'bot right' &&
        board[jumpIndex - 9]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 9]?.piece !== null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top left')
        doubleTakeLanding.push(board[jumpIndex - 18])
      }
      if (
        jumpDirection[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 18]?.piece !== null &&
        board[jumpIndex - 27]?.playable &&
        board[jumpIndex - 27]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top left')
        doubleTakeLanding.push(board[jumpIndex - 27])
      }
      if (
        jumpDirection[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null &&
        board[jumpIndex - 27]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 27]?.piece !== null &&
        board[jumpIndex - 36]?.playable &&
        board[jumpIndex - 36]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top left')
        doubleTakeLanding.push(board[jumpIndex - 36])
      }
      if (
        jumpDirection[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null &&
        board[jumpIndex - 27]?.playable &&
        board[jumpIndex - 27]?.piece === null &&
        board[jumpIndex - 36]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 36]?.piece !== null &&
        board[jumpIndex - 45]?.playable &&
        board[jumpIndex - 45]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top left')
        doubleTakeLanding.push(board[jumpIndex - 45])
      }
      if (
        jumpDirection[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null &&
        board[jumpIndex - 27]?.playable &&
        board[jumpIndex - 27]?.piece === null &&
        board[jumpIndex - 36]?.playable &&
        board[jumpIndex - 36]?.piece === null &&
        board[jumpIndex - 45]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 45]?.piece !== null &&
        board[jumpIndex - 54]?.playable &&
        board[jumpIndex - 54]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top left')
        doubleTakeLanding.push(board[jumpIndex - 54])
      }
      if (
        jumpDirection[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null &&
        board[jumpIndex - 27]?.playable &&
        board[jumpIndex - 27]?.piece === null &&
        board[jumpIndex - 36]?.playable &&
        board[jumpIndex - 36]?.piece === null &&
        board[jumpIndex - 45]?.playable &&
        board[jumpIndex - 45]?.piece === null &&
        board[jumpIndex - 54]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 54]?.piece !== null &&
        board[jumpIndex - 63]?.playable &&
        board[jumpIndex - 63]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('top left')
        doubleTakeLanding.push(board[jumpIndex - 63])
      }
    }
    // bot left
    function botLeft() {
      if (
        jumpDirection[index] !== 'top right' &&
        board[jumpIndex + 7]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 7]?.piece !== null &&
        board[jumpIndex + 14]?.playable &&
        board[jumpIndex + 14]?.piece === null
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot left')
        doubleTakeLanding.push(board[jumpIndex + 14])
      }
      if (
        jumpDirection[index] !== 'top right' &&
        board[jumpIndex + 7]?.playable &&
        board[jumpIndex + 7]?.piece === null &&
        board[jumpIndex + 14]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 14]?.piece !== null &&
        board[jumpIndex + 21]?.playable &&
        board[jumpIndex + 21]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot left')
        doubleTakeLanding.push(board[jumpIndex + 21])
      }
      if (
        jumpDirection[index] !== 'top right' &&
        board[jumpIndex + 7]?.playable &&
        board[jumpIndex + 7]?.piece === null &&
        board[jumpIndex + 14]?.playable &&
        board[jumpIndex + 14]?.piece === null &&
        board[jumpIndex + 21]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 21]?.piece !== null &&
        board[jumpIndex + 28]?.playable &&
        board[jumpIndex + 28]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot left')
        doubleTakeLanding.push(board[jumpIndex + 28])
      }
      if (
        jumpDirection[index] !== 'top right' &&
        board[jumpIndex + 7]?.playable &&
        board[jumpIndex + 7]?.piece === null &&
        board[jumpIndex + 14]?.playable &&
        board[jumpIndex + 14]?.piece === null &&
        board[jumpIndex + 21]?.playable &&
        board[jumpIndex + 21]?.piece === null &&
        board[jumpIndex + 28]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 28]?.piece !== null &&
        board[jumpIndex + 35]?.playable &&
        board[jumpIndex + 35]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot left')
        doubleTakeLanding.push(board[jumpIndex + 35])
      }
      if (
        jumpDirection[index] !== 'top right' &&
        board[jumpIndex + 7]?.playable &&
        board[jumpIndex + 7]?.piece === null &&
        board[jumpIndex + 14]?.playable &&
        board[jumpIndex + 14]?.piece === null &&
        board[jumpIndex + 21]?.playable &&
        board[jumpIndex + 21]?.piece === null &&
        board[jumpIndex + 28]?.playable &&
        board[jumpIndex + 28]?.piece === null &&
        board[jumpIndex + 35]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 35]?.piece !== null &&
        board[jumpIndex + 42]?.playable &&
        board[jumpIndex + 42]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot left')
        doubleTakeLanding.push(board[jumpIndex + 42])
      }
    }
    // bot right
    function botRight() {
      if (
        jumpDirection[index] !== 'top left' &&
        board[jumpIndex + 9]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 9]?.piece !== null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot right')
        doubleTakeLanding.push(board[jumpIndex + 18])
        
      }
      if (
        jumpDirection[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 18]?.piece !== null &&
        board[jumpIndex + 27]?.playable &&
        board[jumpIndex + 27]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot right')
        doubleTakeLanding.push(board[jumpIndex + 27])
      }
      if (
        jumpDirection[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null &&
        board[jumpIndex + 27]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 27]?.piece !== null &&
        board[jumpIndex + 36]?.playable &&
        board[jumpIndex + 36]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot right')
        doubleTakeLanding.push(board[jumpIndex + 36])
      }
      if (
        jumpDirection[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null &&
        board[jumpIndex + 27]?.playable &&
        board[jumpIndex + 27]?.piece === null &&
        board[jumpIndex + 36]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 36]?.piece !== null &&
        board[jumpIndex + 45]?.playable &&
        board[jumpIndex + 45]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot right')
        doubleTakeLanding.push(board[jumpIndex + 45])
      }
      if (
        jumpDirection[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null &&
        board[jumpIndex + 27]?.playable &&
        board[jumpIndex + 27]?.piece === null &&
        board[jumpIndex + 36]?.playable &&
        board[jumpIndex + 36]?.piece === null &&
        board[jumpIndex + 45]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 45]?.piece !== null &&
        board[jumpIndex + 54]?.playable &&
        board[jumpIndex + 54]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot right')
        doubleTakeLanding.push(board[jumpIndex + 54])
      }
      if (
        jumpDirection[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null &&
        board[jumpIndex + 27]?.playable &&
        board[jumpIndex + 27]?.piece === null &&
        board[jumpIndex + 36]?.playable &&
        board[jumpIndex + 36]?.piece === null &&
        board[jumpIndex + 45]?.playable &&
        board[jumpIndex + 45]?.piece === null &&
        board[jumpIndex + 54]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 54]?.piece !== null &&
        board[jumpIndex + 63]?.playable &&
        board[jumpIndex + 63]?.piece === null 
      ) {
        doubleTakeArr.push(tempArrForJumps[index])
        jumpDirection2nd.push('bot right')
        doubleTakeLanding.push(board[jumpIndex + 63])
      }
    }
    topRight();topLeft();botLeft();botRight()
  })
  // console.log(doubleTakeArr, 'doubletakearr')

}

doubleTake()
// ----------------------------------------------------
// triple take checker
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
      function topLeft() {
      
      if (
        jumpDirection2nd[index] !== 'bot right' &&
        board[jumpIndex - 9]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 9]?.piece !== null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 18]?.piece !== null &&
        board[jumpIndex - 27]?.playable &&
        board[jumpIndex - 27]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null &&
        board[jumpIndex - 27]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 27]?.piece !== null &&
        board[jumpIndex - 36]?.playable &&
        board[jumpIndex - 36]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null &&
        board[jumpIndex - 27]?.playable &&
        board[jumpIndex - 27]?.piece === null &&
        board[jumpIndex - 36]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 36]?.piece !== null &&
        board[jumpIndex - 45]?.playable &&
        board[jumpIndex - 45]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null &&
        board[jumpIndex - 27]?.playable &&
        board[jumpIndex - 27]?.piece === null &&
        board[jumpIndex - 36]?.playable &&
        board[jumpIndex - 36]?.piece === null &&
        board[jumpIndex - 45]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 45]?.piece !== null &&
        board[jumpIndex - 54]?.playable &&
        board[jumpIndex - 54]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'bot right' &&
        board[jumpIndex - 9]?.playable &&
        board[jumpIndex - 9]?.piece === null &&
        board[jumpIndex - 18]?.playable &&
        board[jumpIndex - 18]?.piece === null &&
        board[jumpIndex - 27]?.playable &&
        board[jumpIndex - 27]?.piece === null &&
        board[jumpIndex - 36]?.playable &&
        board[jumpIndex - 36]?.piece === null &&
        board[jumpIndex - 45]?.playable &&
        board[jumpIndex - 45]?.piece === null &&
        board[jumpIndex - 54]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 54]?.piece !== null &&
        board[jumpIndex - 63]?.playable &&
        board[jumpIndex - 63]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      }
      function topRight() {
      if (
        jumpDirection2nd[index] !== 'bot left' &&
        board[jumpIndex - 7]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 7]?.piece !== null &&
        board[jumpIndex - 14]?.playable &&
        board[jumpIndex - 14]?.piece === null
      ) {

        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'bot left' &&
        board[jumpIndex - 7]?.playable &&
        board[jumpIndex - 7]?.piece === null &&
        board[jumpIndex - 14]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 14]?.piece !== null &&
        board[jumpIndex - 21]?.playable &&
        board[jumpIndex - 21]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'bot left' &&
        board[jumpIndex - 7]?.playable &&
        board[jumpIndex - 7]?.piece === null &&
        board[jumpIndex - 14]?.playable &&
        board[jumpIndex - 14]?.piece === null &&
        board[jumpIndex - 21]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 21]?.piece !== null &&
        board[jumpIndex - 28]?.playable &&
        board[jumpIndex - 28]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'bot left' &&
        board[jumpIndex - 7]?.playable &&
        board[jumpIndex - 7]?.piece === null &&
        board[jumpIndex - 14]?.playable &&
        board[jumpIndex - 14]?.piece === null &&
        board[jumpIndex - 21]?.playable &&
        board[jumpIndex - 21]?.piece === null &&
        board[jumpIndex - 28]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 28]?.piece !== null &&
        board[jumpIndex - 35]?.playable &&
        board[jumpIndex - 35]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'bot left' &&
        board[jumpIndex - 7]?.playable &&
        board[jumpIndex - 7]?.piece === null &&
        board[jumpIndex - 14]?.playable &&
        board[jumpIndex - 14]?.piece === null &&
        board[jumpIndex - 21]?.playable &&
        board[jumpIndex - 21]?.piece === null &&
        board[jumpIndex - 28]?.playable &&
        board[jumpIndex - 28]?.piece === null &&
        board[jumpIndex - 35]?.piece !== itemToMove?.piece &&
        board[jumpIndex - 35]?.piece !== null &&
        board[jumpIndex - 42]?.playable &&
        board[jumpIndex - 42]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      }
      function botLeft () {
      if (
        jumpDirection2nd[index] !== 'top right' &&
        board[jumpIndex + 7]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 7]?.piece !== null &&
        board[jumpIndex + 14]?.playable &&
        board[jumpIndex + 14]?.piece === null
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'top right' &&
        board[jumpIndex + 7]?.playable &&
        board[jumpIndex + 7]?.piece === null &&
        board[jumpIndex + 14]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 14]?.piece !== null &&
        board[jumpIndex + 21]?.playable &&
        board[jumpIndex + 21]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'top right' &&
        board[jumpIndex + 7]?.playable &&
        board[jumpIndex + 7]?.piece === null &&
        board[jumpIndex + 14]?.playable &&
        board[jumpIndex + 14]?.piece === null &&
        board[jumpIndex + 21]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 21]?.piece !== null &&
        board[jumpIndex + 28]?.playable &&
        board[jumpIndex + 28]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'top right' &&
        board[jumpIndex + 7]?.playable &&
        board[jumpIndex + 7]?.piece === null &&
        board[jumpIndex + 14]?.playable &&
        board[jumpIndex + 14]?.piece === null &&
        board[jumpIndex + 21]?.playable &&
        board[jumpIndex + 21]?.piece === null &&
        board[jumpIndex + 28]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 28]?.piece !== null &&
        board[jumpIndex + 35]?.playable &&
        board[jumpIndex + 35]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'top right' &&
        board[jumpIndex + 7]?.playable &&
        board[jumpIndex + 7]?.piece === null &&
        board[jumpIndex + 14]?.playable &&
        board[jumpIndex + 14]?.piece === null &&
        board[jumpIndex + 21]?.playable &&
        board[jumpIndex + 21]?.piece === null &&
        board[jumpIndex + 28]?.playable &&
        board[jumpIndex + 28]?.piece === null &&
        board[jumpIndex + 35]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 35]?.piece !== null &&
        board[jumpIndex + 42]?.playable &&
        board[jumpIndex + 42]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      }
      
      function botRight() {
      if (
        jumpDirection2nd[index] !== 'top left' &&
        board[jumpIndex + 9]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 9]?.piece !== null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 18]?.piece !== null &&
        board[jumpIndex + 27]?.playable &&
        board[jumpIndex + 27]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null &&
        board[jumpIndex + 27]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 27]?.piece !== null &&
        board[jumpIndex + 36]?.playable &&
        board[jumpIndex + 36]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null &&
        board[jumpIndex + 27]?.playable &&
        board[jumpIndex + 27]?.piece === null &&
        board[jumpIndex + 36]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 36]?.piece !== null &&
        board[jumpIndex + 45]?.playable &&
        board[jumpIndex + 45]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null &&
        board[jumpIndex + 27]?.playable &&
        board[jumpIndex + 27]?.piece === null &&
        board[jumpIndex + 36]?.playable &&
        board[jumpIndex + 36]?.piece === null &&
        board[jumpIndex + 45]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 45]?.piece !== null &&
        board[jumpIndex + 54]?.playable &&
        board[jumpIndex + 54]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      if (
        jumpDirection2nd[index] !== 'top left' &&
        board[jumpIndex + 9]?.playable &&
        board[jumpIndex + 9]?.piece === null &&
        board[jumpIndex + 18]?.playable &&
        board[jumpIndex + 18]?.piece === null &&
        board[jumpIndex + 27]?.playable &&
        board[jumpIndex + 27]?.piece === null &&
        board[jumpIndex + 36]?.playable &&
        board[jumpIndex + 36]?.piece === null &&
        board[jumpIndex + 45]?.playable &&
        board[jumpIndex + 45]?.piece === null &&
        board[jumpIndex + 54]?.piece !== itemToMove?.piece &&
        board[jumpIndex + 54]?.piece !== null &&
        board[jumpIndex + 63]?.playable &&
        board[jumpIndex + 63]?.piece === null 
      ) {
        tripleTakeArr.push(tempArrForJumps[index])
        
      }
      }
      
      
      
      
      
    topRight()
    botLeft()
    topLeft()
    botRight()
    }
  })


}



tripleTake()
// ----------------------------------------------------
if (doubleTakeArr.length) tempArrForJumps = doubleTakeArr
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

    // console.log(tempArrForMoves)
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
    let additionalEat = false

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
              console.log('bot left')
              setKingJumpDirection('bot left')
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
              console.log('top right')
              setKingJumpDirection('top right')
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
              console.log('bot right')
              setKingJumpDirection('bot right')
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
    function eatMoreChips(pieceToJump, index: number, board, pieceJumped: boolean) {
      if (!pieceJumped) return // only when a piece do a capture that this will run
      forceFeed = []
      if (!pieceToJump.king) {
        // top right
        if (
        pieceToJump.piece !== null &&
        board[index - 14]?.playable &&
        board[index - 7]?.piece !== null &&
        board[index - 7]?.piece !== pieceToJump.piece &&
        board[index - 14]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
      // top left jump
      if (
        pieceToJump.piece !== null &&
        board[index - 18]?.playable &&
        board[index - 9]?.piece !== null &&
        board[index - 9]?.piece !== pieceToJump.piece &&
        board[index - 18]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
      // bot left jump
      if (
        pieceToJump.piece !== null &&
        board[index + 14]?.playable &&
        board[index + 7]?.piece !== null &&
        board[index + 7]?.piece !== pieceToJump.piece &&
        board[index + 14]?.piece === null
        ) {
          forceFeed.push(pieceToJump)

        }
      // bot right jump
      if (
        pieceToJump.piece !== null &&
        board[index + 18]?.playable &&
        board[index + 9]?.piece !== null &&
        board[index + 9]?.piece !== pieceToJump.piece &&
        board[index + 18]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
      }
      if (pieceToJump.king) {
        // top right
        function topRight() {
          if (
        pieceToJump.piece !== null &&
        board[index - 7]?.piece !== null && board[index - 7]?.piece !== pieceToJump.piece &&
        board[index - 14]?.playable && board[index - 14]?.piece === null
        && kingJumpDirection !== 'bot left'
        ) {
          forceFeed.push(pieceToJump)

        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 7]?.playable && board[index - 7]?.piece === null &&
        board[index - 14]?.piece !== null && board[index - 14]?.piece !== pieceToJump.piece &&
        board[index - 21]?.playable && board[index - 21]?.piece === null
        && kingJumpDirection !== 'bot left'
        ) {
          forceFeed.push(pieceToJump)

        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 7]?.playable && board[index - 7]?.piece === null &&
        board[index - 14]?.playable && board[index - 14]?.piece === null &&
        board[index - 21]?.piece !== null && board[index - 21]?.piece !== pieceToJump.piece &&
        board[index - 28]?.playable && board[index - 28]?.piece === null
        && kingJumpDirection !== 'bot left'
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 7]?.playable && board[index - 7]?.piece === null &&
        board[index - 14]?.playable && board[index - 14]?.piece === null &&
        board[index - 21]?.playable && board[index - 21]?.piece === null &&
        board[index - 28]?.piece !== null && board[index - 28]?.piece !== pieceToJump.piece &&
        board[index - 35]?.playable && board[index - 35]?.piece === null
        && kingJumpDirection !== 'bot left'
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 7]?.playable && board[index - 7]?.piece === null &&
        board[index - 14]?.playable && board[index - 14]?.piece === null &&
        board[index - 21]?.playable && board[index - 21]?.piece === null &&
        board[index - 28]?.playable && board[index - 28]?.piece === null &&
        board[index - 35]?.piece !== null && board[index - 35]?.piece !== pieceToJump.piece &&
        board[index - 42]?.playable && board[index - 42]?.piece === null
        && kingJumpDirection !== 'bot left'
        ) {
          forceFeed.push(pieceToJump)
        }
        }
        topRight()
        function botLeft() {
          // bot left
          if (
        pieceToJump.piece !== null &&
        board[index + 7]?.piece !== null && board[index + 7]?.piece !== pieceToJump.piece &&
        board[index + 14]?.playable && board[index + 14]?.piece === null
        && kingJumpDirection !== 'top right'
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 7]?.playable && board[index + 7]?.piece === null &&
        board[index + 14]?.piece !== null && board[index + 14]?.piece !== pieceToJump.piece &&
        board[index + 21]?.playable && board[index + 21]?.piece === null
        && kingJumpDirection !== 'top right'
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 7]?.playable && board[index + 7]?.piece === null &&
        board[index + 14]?.playable && board[index + 14]?.piece === null &&
        board[index + 21]?.piece !== null && board[index + 21]?.piece !== pieceToJump.piece &&
        board[index + 28]?.playable && board[index + 28]?.piece === null
        && kingJumpDirection !== 'top right'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 7]?.playable && board[index + 7]?.piece === null &&
        board[index + 14]?.playable && board[index + 14]?.piece === null &&
        board[index + 21]?.playable && board[index + 21]?.piece === null &&
        board[index + 28]?.piece !== null && board[index + 28]?.piece !== pieceToJump.piece &&
        board[index + 35]?.playable && board[index + 35]?.piece === null
        && kingJumpDirection !== 'top right'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 7]?.playable && board[index + 7]?.piece === null &&
        board[index + 14]?.playable && board[index + 14]?.piece === null &&
        board[index + 21]?.playable && board[index + 21]?.piece === null &&
        board[index + 28]?.playable && board[index + 28]?.piece === null &&
        board[index + 35]?.piece !== null && board[index + 35]?.piece !== pieceToJump.piece &&
        board[index + 42]?.playable && board[index + 42]?.piece === null
        && kingJumpDirection !== 'top right'

        ) {
          forceFeed.push(pieceToJump)
        }
        }
        botLeft()
        function topLeft() {
          // top left
        if (
        pieceToJump.piece !== null &&
        board[index - 9]?.piece !== null && board[index - 9]?.piece !== pieceToJump.piece &&
        board[index - 18]?.playable && board[index - 18]?.piece === null
        && kingJumpDirection !== 'bot right'
        
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 9]?.playable && board[index - 9]?.piece === null &&
        board[index - 18]?.piece !== null && board[index - 18]?.piece !== pieceToJump.piece &&        
        board[index - 27]?.playable && board[index - 27]?.piece === null
        && kingJumpDirection !== 'bot right'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 9]?.playable && board[index - 9]?.piece === null &&
        board[index - 18]?.playable && board[index - 18]?.piece === null &&
        board[index - 27]?.piece !== null && board[index - 27]?.piece !== pieceToJump.piece &&
        board[index - 36]?.playable && board[index - 36]?.piece === null
        && kingJumpDirection !== 'bot right'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 9]?.playable && board[index - 9]?.piece === null && 
        board[index - 18]?.playable && board[index - 18]?.piece === null && 
        board[index - 27]?.playable && board[index - 27]?.piece === null && 
        board[index - 36]?.piece !== null && board[index - 36]?.piece !== pieceToJump.piece && 
        board[index - 45]?.playable && board[index - 45]?.piece === null
        && kingJumpDirection !== 'bot right'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 9]?.playable && board[index - 9]?.piece === null &&
        board[index - 18]?.playable && board[index - 18]?.piece === null &&
        board[index - 27]?.playable && board[index - 27]?.piece === null &&
        board[index - 36]?.playable && board[index - 36]?.piece === null &&
        board[index - 45]?.piece !== null && board[index - 45]?.piece !== pieceToJump.piece &&
        board[index - 54]?.playable && board[index - 54]?.piece === null
        && kingJumpDirection !== 'bot right'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 9]?.playable && board[index - 9]?.piece === null &&
        board[index - 18]?.playable && board[index - 18]?.piece === null &&
        board[index - 27]?.playable && board[index - 27]?.piece === null &&
        board[index - 36]?.playable && board[index - 36]?.piece === null &&
        board[index - 45]?.playable && board[index - 45]?.piece === null &&
        board[index - 54]?.piece !== null && board[index - 45]?.piece !== pieceToJump.piece &&        
        board[index - 63]?.playable && board[index - 63]?.piece === null
        && kingJumpDirection !== 'bot right'

        ) {
          forceFeed.push(pieceToJump)
        }
        }
        topLeft()
        function botRight() {
          // bot right
        if (
        pieceToJump.piece !== null &&
        board[index + 9]?.piece !== null && board[index + 9]?.piece !== pieceToJump.piece &&
        board[index + 18]?.playable && board[index + 18]?.piece === null
        && kingJumpDirection !== 'top left'
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 9]?.playable && board[index + 9]?.piece === null &&
        board[index + 18]?.piece !== null && board[index + 18]?.piece !== pieceToJump.piece &&        
        board[index + 27]?.playable && board[index + 27]?.piece === null
        && kingJumpDirection !== 'top left'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 9]?.playable && board[index + 9]?.piece === null &&
        board[index + 18]?.playable && board[index + 18]?.piece === null &&
        board[index + 27]?.piece !== null && board[index + 27]?.piece !== pieceToJump.piece &&
        board[index + 36]?.playable && board[index + 36]?.piece === null
        && kingJumpDirection !== 'top left'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 9]?.playable && board[index + 9]?.piece === null && 
        board[index + 18]?.playable && board[index + 18]?.piece === null && 
        board[index + 27]?.playable && board[index + 27]?.piece === null && 
        board[index + 36]?.piece !== null && board[index + 36]?.piece !== pieceToJump.piece && 
        board[index + 45]?.playable && board[index + 45]?.piece === null
        && kingJumpDirection !== 'top left'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 9]?.playable && board[index + 9]?.piece === null &&
        board[index + 18]?.playable && board[index + 18]?.piece === null &&
        board[index + 27]?.playable && board[index + 27]?.piece === null &&
        board[index + 36]?.playable && board[index + 36]?.piece === null &&
        board[index + 45]?.piece !== null && board[index + 45]?.piece !== pieceToJump.piece &&
        board[index + 54]?.playable && board[index + 54]?.piece === null
        && kingJumpDirection !== 'top left'

        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 9]?.playable && board[index + 9]?.piece === null &&
        board[index + 18]?.playable && board[index + 18]?.piece === null &&
        board[index + 27]?.playable && board[index + 27]?.piece === null &&
        board[index + 36]?.playable && board[index + 36]?.piece === null &&
        board[index + 45]?.playable && board[index + 45]?.piece === null &&
        board[index + 54]?.piece !== null && board[index + 45]?.piece !== pieceToJump.piece &&        
        board[index + 63]?.playable && board[index + 63]?.piece === null
        && kingJumpDirection !== 'top left'

        ) {
          forceFeed.push(pieceToJump)
        }
        }
        botRight()
        
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
      
    // setBoardData([...boardForceEat])
      }
    }
    

    eatMoreChips(multipleJumpSearcher, jumpSearcherIndex, newBoardData, jumped)

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

    boardData.forEach((item, index) => {
      if (!item?.playable) return // black squares
      if (item?.piece === null) return // empty white squares

      if (!item.king) {
        function checkPieceWithMoves() {
        //  top right move
        if (
          playerOneTurn && item.piece === 'z' &&
          boardData[index - 7]?.playable && 
          boardData[index - 7]?.piece === null
        ) {
            playerMoveArr.push(item)
        }
        //  top left move
        if (
          playerOneTurn && item.piece === 'z' &&
          boardData[index - 9]?.playable && 
          boardData[index - 9]?.piece === null
          ) {
            playerMoveArr.push(item)
        }
        // bot left move
        if (
          !playerOneTurn && item.piece === 'x' &&
          boardData[index + 7]?.playable && 
          boardData[index + 7]?.piece === null
          ) {
            playerMoveArr.push(item)
        }
        //  bot left move
          if (
          !playerOneTurn && item.piece === 'x' &&
          boardData[index + 9]?.playable && 
          boardData[index + 9]?.piece === null
          ) {
            playerMoveArr.push(item)
          }
        // top right jump
        if (
          boardData[index - 14]?.playable &&
          boardData[index - 14]?.piece === null &&
          boardData[index - 7]?.piece !== null &&
          boardData[index - 7]?.piece !== item?.piece
          ) {
            playerMoveArr.push(item)
          }
        // top left
        if (
          boardData[index - 18]?.playable &&
          boardData[index - 18]?.piece === null &&
          boardData[index - 9]?.piece !== null &&
          boardData[index - 9]?.piece !== item?.piece
          ) {
            playerMoveArr.push(item)
          }
        // bot left
        if (
          boardData[index + 14]?.playable &&
          boardData[index + 14]?.piece === null &&
          boardData[index + 7]?.piece !== null &&
          boardData[index + 7]?.piece !== item?.piece
          ) {
            playerMoveArr.push(item)
          }
        // bot right
        if (
          boardData[index + 18]?.playable &&
          boardData[index + 18]?.piece === null &&
          boardData[index + 9]?.piece !== null &&
          boardData[index + 9]?.piece !== item?.piece
          ) {
            playerMoveArr.push(item)
          }

        }
      if (item.king) {

      }
        checkPieceWithMoves()
      }
      if (item.king) {
        function topRightJumpKing() {
          // top right ----------------------
        if (
        item.piece !== null &&
        boardData[index - 7]?.piece !== null && boardData[index - 7]?.piece !== item.piece &&
        boardData[index - 14]?.playable && boardData[index - 14]?.piece === null
        ) {
          playerMoveArr.push(item)
          
        }
        else if (
        item.piece !== null &&
        boardData[index - 7]?.playable && boardData[index - 7]?.piece === null &&
        boardData[index - 14]?.piece !== null && boardData[index - 14]?.piece !== item.piece &&
        boardData[index - 21]?.playable && boardData[index - 21]?.piece === null
        ) {
          playerMoveArr.push(item)

        }
        else if (
        item.piece !== null &&
        boardData[index - 7]?.playable && boardData[index - 7]?.piece === null &&
        boardData[index - 14]?.playable && boardData[index - 14]?.piece === null &&
        boardData[index - 21]?.piece !== null && boardData[index - 21]?.piece !== item.piece &&
        boardData[index - 28]?.playable && boardData[index - 28]?.piece === null
        ) {
          playerMoveArr.push(item)

        }
        else if (
        item.piece !== null &&
        boardData[index - 7]?.playable && boardData[index - 7]?.piece === null &&
        boardData[index - 14]?.playable && boardData[index - 14]?.piece === null &&
        boardData[index - 21]?.playable && boardData[index - 21]?.piece === null &&
        boardData[index - 28]?.piece !== null && boardData[index - 28]?.piece !== item.piece &&
        boardData[index - 35]?.playable && boardData[index - 35]?.piece === null
        ) {
          playerMoveArr.push(item)

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
          playerMoveArr.push(item)

        }
        }
        function botLeftJumpKing() {
          // bot left -----------------------------
        if (
        item.piece !== null &&
        boardData[index + 7]?.piece !== null && boardData[index + 7]?.piece !== item.piece &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null
        ) {
          playerMoveArr.push(item)
          
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.piece !== null && boardData[index + 14]?.piece !== item.piece &&
        boardData[index + 21]?.playable && boardData[index + 21]?.piece === null
        ) {
          playerMoveArr.push(item)
          
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null &&
        boardData[index + 21]?.piece !== null && boardData[index + 21]?.piece !== item.piece &&
        boardData[index + 28]?.playable && boardData[index + 28]?.piece === null
        ) {
          playerMoveArr.push(item)
          
        }
        else if (
        item.piece !== null &&
        boardData[index + 7]?.playable && boardData[index + 7]?.piece === null &&
        boardData[index + 14]?.playable && boardData[index + 14]?.piece === null &&
        boardData[index + 21]?.playable && boardData[index + 21]?.piece === null &&
        boardData[index + 28]?.piece !== null && boardData[index + 28]?.piece !== item.piece &&
        boardData[index + 35]?.playable && boardData[index + 35]?.piece === null
        ) {
          playerMoveArr.push(item)
          
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
          playerMoveArr.push(item)
          
        }
        }
        function topLeftJumpKing() {
           // top left ----------------------------
        if (
        item.piece !== null &&
        boardData[index - 9]?.piece !== null && boardData[index - 9]?.piece !== item.piece &&
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null
        ) {
          playerMoveArr.push(item)
        
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null &&
        boardData[index - 18]?.piece !== null && boardData[index - 18]?.piece !== item.piece &&        
        boardData[index - 27]?.playable && boardData[index - 27]?.piece === null
        ) {
          playerMoveArr.push(item)
        
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null &&
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null &&
        boardData[index - 27]?.piece !== null && boardData[index - 27]?.piece !== item.piece &&
        boardData[index - 36]?.playable && boardData[index - 36]?.piece === null
        ) {
          playerMoveArr.push(item)
        
        }
        else if (
        item.piece !== null &&
        boardData[index - 9]?.playable && boardData[index - 9]?.piece === null && 
        boardData[index - 18]?.playable && boardData[index - 18]?.piece === null && 
        boardData[index - 27]?.playable && boardData[index - 27]?.piece === null && 
        boardData[index - 36]?.piece !== null && boardData[index - 36]?.piece !== item.piece && 
        boardData[index - 45]?.playable && boardData[index - 45]?.piece === null
        ) {
          playerMoveArr.push(item)
        
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
          playerMoveArr.push(item)
        
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
          playerMoveArr.push(item)
        
        }
        }
        function botRightJumpKing() {
          // bot right
        if (
        item.piece !== null &&
        boardData[index + 9]?.piece !== null && boardData[index + 9]?.piece !== item.piece &&
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null
        ) {
          playerMoveArr.push(item)
          
          
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null &&
        boardData[index + 18]?.piece !== null && boardData[index + 18]?.piece !== item.piece &&        
        boardData[index + 27]?.playable && boardData[index + 27]?.piece === null
        ) {
          playerMoveArr.push(item)
          
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null &&
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null &&
        boardData[index + 27]?.piece !== null && boardData[index + 27]?.piece !== item.piece &&
        boardData[index + 36]?.playable && boardData[index + 36]?.piece === null
        ) {
          playerMoveArr.push(item)
          
        }
        else if (
        item.piece !== null &&
        boardData[index + 9]?.playable && boardData[index + 9]?.piece === null && 
        boardData[index + 18]?.playable && boardData[index + 18]?.piece === null && 
        boardData[index + 27]?.playable && boardData[index + 27]?.piece === null && 
        boardData[index + 36]?.piece !== null && boardData[index + 36]?.piece !== item.piece && 
        boardData[index + 45]?.playable && boardData[index + 45]?.piece === null
        ) {
          playerMoveArr.push(item)
          
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
          playerMoveArr.push(item)
          
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
          playerMoveArr.push(item)
          
        }
        }
        function topRightMoveKing() {
        if (boardData[index - 7]?.piece === null && boardData[index - 7].playable === true) {
      playerMoveArr.push(item)

      if (boardData[index - 14]?.piece === null && boardData[index - 14].playable === true) {
        playerMoveArr.push(item)

        if (boardData[index - 21]?.piece === null && boardData[index - 21].playable === true) {
          playerMoveArr.push(item)

          if (boardData[index - 28]?.piece === null && boardData[index - 28].playable === true) {
            playerMoveArr.push(item)

            if (boardData[index - 35]?.piece === null && boardData[index - 35].playable === true) {
              playerMoveArr.push(item)

              if (boardData[index - 42]?.piece === null && boardData[index - 42].playable === true) {
                playerMoveArr.push(item)

                if (boardData[index - 49]?.piece === null && boardData[index - 49].playable === true) {
                  playerMoveArr.push(item)

                }
              } 
            }
          } 
        } 
      } 
    } 
        }    
        function topLeftMoveKing() {
      if (boardData[index - 9]?.piece === null && boardData[index - 9].playable === true) {
      playerMoveArr.push(item)
  
      if (boardData[index - 18]?.piece === null && boardData[index - 18].playable === true) {
        playerMoveArr.push(item)
  
        if (boardData[index - 27]?.piece === null && boardData[index - 27].playable === true) {
          playerMoveArr.push(item)
  
          if (boardData[index - 36]?.piece === null && boardData[index - 36].playable === true) {
            playerMoveArr.push(item)
  
            if (boardData[index - 45]?.piece === null && boardData[index - 45].playable === true) {
              playerMoveArr.push(item)
  
              if (boardData[index - 54]?.piece === null && boardData[index - 54].playable === true) {
                playerMoveArr.push(item)
  
                if (boardData[index - 63]?.piece === null && boardData[index - 63].playable === true) {
                playerMoveArr.push(item)
  
                }
              } 
            }
          } 
        } 
      } 
    } 
        }
        function botRightMoveKing() {
      if (boardData[index + 9]?.piece === null && boardData[index + 9].playable === true) {
      playerMoveArr.push(item)
  
      if (boardData[index + 18]?.piece === null && boardData[index + 18].playable === true) {
        playerMoveArr.push(item)
  
        if (boardData[index + 27]?.piece === null && boardData[index + 27].playable === true) {
          playerMoveArr.push(item)
  
          if (boardData[index + 36]?.piece === null && boardData[index + 36].playable === true) {
           playerMoveArr.push(item)
  
            if (boardData[index + 45]?.piece === null && boardData[index + 45].playable === true) {
              playerMoveArr.push(item)
  
              if (boardData[index + 54]?.piece === null && boardData[index + 54].playable === true) {
                playerMoveArr.push(item)
  
                if (boardData[index + 63]?.piece === null && boardData[index + 63].playable === true) {
                  playerMoveArr.push(item)
  
                }
              } 
            }   
          } 
        } 
      } 
    } 
        }
        function botLeftMoveKing() {
      if (boardData[index + 7]?.piece === null && boardData[index + 7].playable === true) {
      playerMoveArr.push(item)
  
      if (boardData[index + 14]?.piece === null && boardData[index + 14].playable === true) {
        playerMoveArr.push(item)
  
        if (boardData[index + 21]?.piece === null && boardData[index + 21].playable === true) {
          playerMoveArr.push(item)
  
          if (boardData[index + 28]?.piece === null && boardData[index + 28].playable === true) {
            playerMoveArr.push(item)
  
            if (boardData[index + 35]?.piece === null && boardData[index + 35].playable === true) {
              playerMoveArr.push(item)
  
              if (boardData[index + 42]?.piece === null && boardData[index + 42].playable === true) {
               playerMoveArr.push(item)
  
                if (boardData[index + 49]?.piece === null && boardData[index + 49].playable === true) {
                  playerMoveArr.push(item)
  
                }
              } 
            } 
          } 
        } 
      } 
    } 
        }
        topRightMoveKing()
        topLeftMoveKing()
        botRightMoveKing()
        botLeftMoveKing()
        topRightJumpKing()
        botLeftJumpKing()
        topLeftJumpKing()
        botRightJumpKing()
      }
      
    })
    playerMoveArr = playerMoveArr.filter((item) => {
      return playerOneTurn && item?.piece === 'z' || !playerOneTurn && item?.piece === 'x'
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
      handleReset
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
