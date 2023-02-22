import { useContext, createContext, useState, useEffect, ReactNode } from "react"
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

  const [ playerOneTurn, setPlayerOneTurn ] = useState(true) // player one will still be first to move regardless
  const [ playerChipsCount, setPlayerChipsCount ] = useState({p1: 12, p2: 12})
  const [ gameOver, setGameOver ] = useState(false)
  const [ jumpedChip, setJumpedChip ] = useState(null)
  const [multipleCapture, setMultipleCapture] = useState(false)
  const [forceCapture, setForceCapture] = useState(false)


  function highlightMoves(itemToMove, position: number, playerTurn: boolean, board) {
    const { x: xPosition, y: yPosition, piece, player, selected } = itemToMove;
    let tempArrForMoves = [] // stores non capturing moves
    let tempArrForJumps = [] // stores capturing moves
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
    // bot right
    if (
      board[position + 14]?.playable &&
      board[position + 14]?.piece === null &&
      board[position + 7]?.piece !== null &&
      board[position + 7]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position + 14])
        jumpDirection.push('bot right')

      }
    // bot left
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
            }
          // bot right
          if (
            board[jumpIndex + 14]?.playable &&
            board[jumpIndex + 14]?.piece === null &&
            board[jumpIndex + 7]?.piece !== null &&
            board[jumpIndex + 7]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top left'
            ) {
              doubleTakeArr.push(board[tempArrForJumps[index]])
              jumpDirection2nd.push('bot right')
            } 
          // bot left
          if (
            board[jumpIndex + 18]?.playable &&
            board[jumpIndex + 18]?.piece === null &&
            board[jumpIndex + 9]?.piece !== null &&
            board[jumpIndex + 9]?.piece !== itemToMove?.piece &&
            jumpDirection[index] !== 'top right'
            ) {
              doubleTakeArr.push(tempArrForJumps[index])
              jumpDirection2nd.push('bot left')
            }
      }
      })
    }
    doubleTake()
    
    
    
    // transformed jumped arr
    // console.log(doubleTakeArr, 'double take')
    // ----------------------------------------------------------------------------------
    
    // tripleTake------------------------------------------
    
    function tripleTake() {
      if (!doubleTakeArr.length) return
      const jumpIndices = doubleTakeArr.map((item, index) => {
        if (
          jumpDirection2nd[index] === 'top right' &&
          board[board.indexOf(item) - 14]?.playable &&
          board[board.indexOf(item) - 14]?.piece === null
        ) return board.indexOf(item) - 14
        else if (
          jumpDirection2nd[index] === 'top left' &&
          board[board.indexOf(item) - 18]?.playable &&
          board[board.indexOf(item) - 18]?.piece === null
        ) return board.indexOf(item) - 18
        else if (
          jumpDirection2nd[index] === 'bot right' &&
          board[board.indexOf(item) + 18]?.playable &&
          board[board.indexOf(item) + 18]?.piece === null
        ) return board.indexOf(item) + 18
        else if (
          jumpDirection2nd[index] === 'bot left' &&
          board[board.indexOf(item) + 14]?.playable &&
          board[board.indexOf(item) + 14]?.piece === null
        ) return board.indexOf(item) + 14
      })
      const arrToJump = doubleTakeArr.map((item, index) => {
        return {
          ...item,
          piece: itemToMove.piece,
          king: itemToMove.king,
          highlighted: false,

        }
      })
    

    // console.log(arrToJump, 'arrToJumps')
    // console.log(jumpIndices, 'triple')
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
          // bot right
          if (
            board[jumpIndices[index] + 14]?.playable &&
            board[jumpIndices[index] + 14]?.piece === null &&
            board[jumpIndices[index] + 7]?.piece !== null &&
            board[jumpIndices[index] + 7]?.piece !== itemToMove?.piece &&
            jumpDirection2nd[index] !== 'top left'
            ) {
              tripleTakeArr.push(board[tempArrForJumps[index]])
            } 
          // bot left
          if (
            board[jumpIndices[index] + 18]?.playable &&
            board[jumpIndices[index] + 18]?.piece === null &&
            board[jumpIndices[index] + 9]?.piece !== null &&
            board[jumpIndices[index] + 9]?.piece !== itemToMove?.piece &&
            jumpDirection2nd[index] !== 'top right'
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
    // console.log(doubleTakeArr, 'double take')
    // console.log(tripleTakeArr, 'triple take')


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
    if (playerTurn === true && player === 2 || !playerTurn && player === 1) return

    if (itemToMove.king) {
      // top right move
      function topRight() {
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
  
// console.log(jumpIndices, 'jump indices')
// console.log(arrToJump, 'arrTojump')
// console.log(jumpDirection2nd, 'jump direction 2nd')
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

  // console.log(tripleTakeArr, 'tripleTakeArr')
}

// console.log(doubleTakeLanding, 'landing')

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
    
    let chipToBeTaken = {}
    let multipleJumpSearcher = {}
    let jumpSearcherIndex = -1000
    let jumped = false

    // find the selected chip
    const chipToMove = boardData.find((item) => {
      if (item.x === pieceToMove.x && item.y === pieceToMove.y) {
        return item
      }
    })

    let newBoardData = boardData.map((item, index) => {
      if (!item.playable) return item

      const indexStart = boardData.indexOf(chipToMove)
      const indexLand = boardData.indexOf(placeToLand)

      
            

      if (item === chipToMove) {
        return {...item, piece: null, selected: false, king:false}
      }

      if (
        item.x === placeToLand.x &&
        item.y ===  placeToLand.y
      ) {
        multipleJumpSearcher = {
          ...item,
          piece: pieceToMove.piece,
          highlighted: false, 
          king: pieceToMove.king, 
          selected: false
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
          
          
        }
        
      })

    
      
      return {...item, highlighted: false, selected: false,}

    })



  
    let newArr =  newBoardData.map((item, index) => {
      if (item.x === chipToBeTaken.x && item.y === chipToBeTaken.y) {
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
      
      if (item.y === 7 && item.piece === 'z' && item.king === false) {
        console.log('player 1 king awakened!')
        return {...item, king: true, movable: true}
      }

      // checks for player 2 new king
      if (item.y === 0 && item.piece == 'x' && item.king === false) {
        console.log('player 2 king awakened!')
        return {...item, king: true, movable: true}
      }


        return {...item, movable: true}
      
    })
    setBoardData([...newArr])
    
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
        if (
        pieceToJump.piece !== null &&
        board[index - 7]?.piece !== null && board[index - 7]?.piece !== pieceToJump.piece &&
        board[index - 14]?.playable && board[index - 14]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 7]?.playable && board[index - 7]?.piece === null &&
        board[index - 14]?.piece !== null && board[index - 14]?.piece !== pieceToJump.piece &&
        board[index - 21]?.playable && board[index - 21]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 7]?.playable && board[index - 7]?.piece === null &&
        board[index - 14]?.playable && board[index - 14]?.piece === null &&
        board[index - 21]?.piece !== null && board[index - 21]?.piece !== pieceToJump.piece &&
        board[index - 28]?.playable && board[index - 28]?.piece === null
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
        ) {
          forceFeed.push(pieceToJump)
        }

        // bot left
        if (
        pieceToJump.piece !== null &&
        board[index + 7]?.piece !== null && board[index + 7]?.piece !== pieceToJump.piece &&
        board[index + 14]?.playable && board[index + 14]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 7]?.playable && board[index + 7]?.piece === null &&
        board[index + 14]?.piece !== null && board[index + 14]?.piece !== pieceToJump.piece &&
        board[index + 21]?.playable && board[index + 21]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 7]?.playable && board[index + 7]?.piece === null &&
        board[index + 14]?.playable && board[index + 14]?.piece === null &&
        board[index + 21]?.piece !== null && board[index + 21]?.piece !== pieceToJump.piece &&
        board[index + 28]?.playable && board[index + 28]?.piece === null
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
        ) {
          forceFeed.push(pieceToJump)
        }

        // top left
        if (
        pieceToJump.piece !== null &&
        board[index - 9]?.piece !== null && board[index - 9]?.piece !== pieceToJump.piece &&
        board[index - 18]?.playable && board[index - 18]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 9]?.playable && board[index - 9]?.piece === null &&
        board[index - 18]?.piece !== null && board[index - 18]?.piece !== pieceToJump.piece &&        
        board[index - 27]?.playable && board[index - 27]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index - 9]?.playable && board[index - 9]?.piece === null &&
        board[index - 18]?.playable && board[index - 18]?.piece === null &&
        board[index - 27]?.piece !== null && board[index - 27]?.piece !== pieceToJump.piece &&
        board[index - 36]?.playable && board[index - 36]?.piece === null
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
        ) {
          forceFeed.push(pieceToJump)
        }

        // bottom right
        if (
        pieceToJump.piece !== null &&
        board[index + 7]?.piece !== null && board[index + 7]?.piece !== pieceToJump.piece &&
        board[index + 14]?.playable && board[index + 14]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 7]?.playable && board[index + 7]?.piece === null &&
        board[index + 14]?.piece !== null && board[index + 14]?.piece !== pieceToJump.piece &&
        board[index + 21]?.playable && board[index + 21]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 7]?.playable && board[index + 7]?.piece === null &&
        board[index + 14]?.playable && board[index + 14]?.piece === null &&
        board[index + 21]?.piece !== null && board[index + 21]?.piece !== pieceToJump.piece &&
        board[index + 28]?.playable && board[index + 28]?.piece === null
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
        ) {
          forceFeed.push(pieceToJump)
        }

        // top left
        if (
        pieceToJump.piece !== null &&
        board[index + 9]?.piece !== null && board[index + 9]?.piece !== pieceToJump.piece &&
        board[index + 18]?.playable && board[index + 18]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 9]?.playable && board[index + 9]?.piece === null &&
        board[index + 18]?.piece !== null && board[index + 18]?.piece !== pieceToJump.piece &&        
        board[index + 27]?.playable && board[index + 27]?.piece === null
        ) {
          forceFeed.push(pieceToJump)
        }
        else if (
        pieceToJump.piece !== null &&
        board[index + 9]?.playable && board[index + 9]?.piece === null &&
        board[index + 18]?.playable && board[index + 18]?.piece === null &&
        board[index + 27]?.piece !== null && board[index + 27]?.piece !== pieceToJump.piece &&
        board[index + 36]?.playable && board[index + 36]?.piece === null
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
        ) {
          forceFeed.push(pieceToJump)
        }
      }
      if (forceFeed.length) {
        // console.log(forceFeed, 'you must eat this again')
        setPieceToMove(pieceToJump)
        setMultipleCapture(true)
        
        forceFeed = forceFeed.filter((force) => {
      if (playerOneTurn) return force.piece === 'x'
      if (!playerOneTurn) return force.piece === 'z'
    })

        const boardForceEat = board.map((item, sameIndex) => {
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

    // console.log(forceFeed, 'forcefeed')
    setBoardData([...boardForceEat])
      }
    }

    eatMoreChips(multipleJumpSearcher, jumpSearcherIndex, newArr, jumped)

    // if no additional piece to be take this will end the turn of the player
    if (!forceFeed.length) {
  
    }
    setPieceToMove(null)
    // setPlayerOneTurn(!playerOneTurn)
    setForceCapture(false)
  }



  // player chips counter
  useEffect(() => {
    let p1ChipCounter = 0;
    let p2ChipCounter = 0;
    const gameState = boardData.forEach((item) => {
      if (item?.piece === 'z') p1ChipCounter ++
      if (item?.piece === 'x') p2ChipCounter ++
    })
    setPlayerChipsCount({p1: p1ChipCounter, p2: p2ChipCounter})
  }, [playerOneTurn])

  // gameover checker
  useEffect(() => {
    const {p1, p2} = playerChipsCount
    if (p1 === 0 || p2 === 0) setGameOver(true)
  })


  // useEffect(() => {
  //   playerOneTurn ? 
  //   console.log('p1'):
  //   console.log('p2')
  // }, [boardData])


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
      setForceCapture
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
