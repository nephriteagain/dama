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

  const [ playerOneTurn, setPlayerOneTurn ] = useState(false) // player one will still be first to move regardless
  const [ playerChipsCount, setPlayerChipsCount ] = useState({p1: 12, p2: 12})
  const [ gameOver, setGameOver ] = useState(false)
  const [ jumpedChip, setJumpedChip ] = useState(null)
  const [multipleCapture, setMultipleCapture] = useState(false)
  const [forceCapture, setForceCapture] = useState(false)


 function highlightMoves(itemToMove, position: number, playerTurn: boolean, board) {
    const { x: xPosition, y: yPosition, piece, player, selected } = itemToMove;
    let tempArrForMoves = []
    let tempArrForJumps = []

    
    if (piece === null) return
    if (itemToMove.king) return
    // if p1 try to access p2 chips it will immediately return and vice versa for player 2
    if (playerTurn === true && player === 2 || !playerTurn && player === 1) return
    // console.log(position)   

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

      }
    // top left
    if (
      board[position - 18]?.playable &&
      board[position - 18]?.piece === null &&
      board[position - 9]?.piece !== null &&
      board[position - 9]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position - 18])

      }
    // bot right
    if (
      board[position + 14]?.playable &&
      board[position + 14]?.piece === null &&
      board[position + 7]?.piece !== null &&
      board[position + 7]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position + 14])

      }
    // bot left
    if (
      board[position + 18]?.playable &&
      board[position + 18]?.piece === null &&
      board[position + 9]?.piece !== null &&
      board[position + 9]?.piece !== itemToMove?.piece
      ) {
        tempArrForJumps.push(board[position + 18])

      }



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


    if (piece === null) return
    if (!itemToMove.king) return
    // if p1 try to access p2 chips it will immediately return and vice versa for player 2
    if (playerTurn === true && player === 2 || !playerTurn && player === 1) return

    // top right move
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
                }

            }  else if (
      board[position - 35]?.piece !== null &&
      board[position - 35]?.piece !== itemToMove.piece &&
      board[position - 42]?.playable &&
      board[position - 42]?.piece === null
    ) {
                tempArrForJumps.push(board[position - 42])
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
                }
              }

          } else if (
      board[position - 28]?.piece !== null &&
      board[position - 28]?.piece !== itemToMove.piece &&
      board[position - 35]?.playable &&
      board[position - 35]?.piece === null
    ) {
              tempArrForJumps.push(board[position - 35])
              if (board[position - 42]?.piece === null && board[position - 42].playable === true) {
                tempArrForJumps.push(board[position - 42])
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
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
            if (board[position - 35]?.piece === null && board[position - 35].playable === true) {
              tempArrForJumps.push(board[position - 35])
              if (board[position - 42]?.piece === null && board[position - 42].playable === true) {
                tempArrForJumps.push(board[position - 42])
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
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
          if (board[position - 28]?.piece === null && board[position - 28].playable === true) {
            tempArrForJumps.push(board[position - 28])
            if (board[position - 35]?.piece === null && board[position - 35].playable === true) {
              tempArrForJumps.push(board[position - 35])
              if (board[position - 42]?.piece === null && board[position - 42].playable === true) {
                tempArrForJumps.push(board[position - 42])
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
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
        if (board[position - 21]?.piece === null && board[position - 21].playable === true) {
          tempArrForJumps.push(board[position - 21])
          if (board[position - 28]?.piece === null && board[position - 28].playable === true) {
            tempArrForJumps.push(board[position - 28])
            if (board[position - 35]?.piece === null && board[position - 35].playable === true) {
              tempArrForJumps.push(board[position - 35])
              if (board[position - 42]?.piece === null && board[position - 42].playable === true) {
                tempArrForJumps.push(board[position - 42])
                if (board[position - 49]?.piece === null && board[position - 49].playable === true) {
                  tempArrForJumps.push(board[position - 49])
                }
              }
            }
          }
        }
      }

    // top left move
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
              }
            } else if (
      board[position - 45]?.piece !== null &&
      board[position - 45]?.piece !== itemToMove.piece &&
      board[position - 54]?.playable &&
      board[position - 54]?.piece === null
    ) {
                tempArrForJumps.push(board[position - 54])
                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
                }
              }
            
          } else if (
      board[position - 36]?.piece !== null &&
      board[position - 36]?.piece !== itemToMove.piece &&
      board[position - 45]?.playable &&
      board[position - 45]?.piece === null
    ) {
              tempArrForJumps.push(board[position - 45])
              if (board[position - 54]?.piece === null && board[position - 54].playable === true) {
                tempArrForJumps.push(board[position - 54])
                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
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
            if (board[position - 45]?.piece === null && board[position - 45].playable === true) {
              tempArrForJumps.push(board[position - 45])
              if (board[position - 54]?.piece === null && board[position - 54].playable === true) {
                tempArrForJumps.push(board[position - 54])
                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
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
          if (board[position - 36]?.piece === null && board[position - 36].playable === true) {
            tempArrForJumps.push(board[position - 36])
            if (board[position - 45]?.piece === null && board[position - 45].playable === true) {
              tempArrForJumps.push(board[position - 45])
              if (board[position - 54]?.piece === null && board[position - 54].playable === true) {
                tempArrForJumps.push(board[position - 54])
                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
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
        if (board[position - 27]?.piece === null && board[position - 27].playable === true) {
          tempArrForJumps.push(board[position - 27])
          if (board[position - 36]?.piece === null && board[position - 36].playable === true) {
            tempArrForJumps.push(board[position - 36])
            if (board[position - 45]?.piece === null && board[position - 45].playable === true) {
              tempArrForJumps.push(board[position - 45])
              if (board[position - 54]?.piece === null && board[position - 54].playable === true) {
                tempArrForJumps.push(board[position - 54])
                if (board[position - 63]?.piece === null && board[position - 63].playable === true) {
                tempArrForJumps.push(board[position - 63])
                }
              }
            }
          }
        }
      }

    // bottom right move
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
              }
            } else if (
      board[position + 45]?.piece !== null &&
      board[position + 45]?.piece !== itemToMove.piece &&
      board[position + 54]?.playable &&
      board[position + 54]?.piece === null
    ) {
                tempArrForJumps.push(board[position + 54])
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
                }
              }
            
          } else if (
      board[position + 36]?.piece !== null &&
      board[position + 36]?.piece !== itemToMove.piece &&
      board[position + 45]?.playable &&
      board[position + 45]?.piece === null
    ) {
              tempArrForJumps.push(board[position + 45])
              if (board[position + 54]?.piece === null && board[position + 54].playable === true) {
                tempArrForJumps.push(board[position + 54])
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
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
            if (board[position + 45]?.piece === null && board[position + 45].playable === true) {
              tempArrForJumps.push(board[position + 45])
              if (board[position + 54]?.piece === null && board[position + 54].playable === true) {
                tempArrForJumps.push(board[position + 54])
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
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
          if (board[position + 36]?.piece === null && board[position + 36].playable === true) {
            tempArrForJumps.push(board[position + 36])
            if (board[position + 45]?.piece === null && board[position + 45].playable === true) {
              tempArrForJumps.push(board[position + 45])
              if (board[position + 54]?.piece === null && board[position + 54].playable === true) {
                tempArrForJumps.push(board[position + 54])
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
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
        if (board[position + 27]?.piece === null && board[position + 27].playable === true) {
          tempArrForJumps.push(board[position + 27])
          if (board[position + 36]?.piece === null && board[position + 36].playable === true) {
            tempArrForJumps.push(board[position + 36])
            if (board[position + 45]?.piece === null && board[position + 45].playable === true) {
              tempArrForJumps.push(board[position + 45])
              if (board[position + 54]?.piece === null && board[position + 54].playable === true) {
                tempArrForJumps.push(board[position + 54])
                if (board[position + 63]?.piece === null && board[position + 63].playable === true) {
                tempArrForJumps.push(board[position + 63])
                }
              }
            }
          }
        }
      }
    
    // bottom left move
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
                }

            }  else if (
      board[position + 35]?.piece !== null &&
      board[position + 35]?.piece !== itemToMove.piece &&
      board[position + 42]?.playable &&
      board[position + 42]?.piece === null
    ) {
                tempArrForJumps.push(board[position + 42])
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
                }
              }

          } else if (
      board[position + 28]?.piece !== null &&
      board[position + 28]?.piece !== itemToMove.piece &&
      board[position + 35]?.playable &&
      board[position + 35]?.piece === null
    ) {
              tempArrForJumps.push(board[position + 35])
              if (board[position + 42]?.piece === null && board[position + 42].playable === true) {
                tempArrForJumps.push(board[position + 42])
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
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
            if (board[position + 35]?.piece === null && board[position + 35].playable === true) {
              tempArrForJumps.push(board[position + 35])
              if (board[position + 42]?.piece === null && board[position + 42].playable === true) {
                tempArrForJumps.push(board[position + 42])
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
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
          if (board[position + 28]?.piece === null && board[position + 28].playable === true) {
            tempArrForJumps.push(board[position + 28])
            if (board[position + 35]?.piece === null && board[position + 35].playable === true) {
              tempArrForJumps.push(board[position + 35])
              if (board[position + 42]?.piece === null && board[position + 42].playable === true) {
                tempArrForJumps.push(board[position + 42])
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
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
        if (board[position + 21]?.piece === null && board[position + 21].playable === true) {
          tempArrForJumps.push(board[position + 21])
          if (board[position + 28]?.piece === null && board[position + 28].playable === true) {
            tempArrForJumps.push(board[position + 28])
            if (board[position + 35]?.piece === null && board[position + 35].playable === true) {
              tempArrForJumps.push(board[position + 35])
              if (board[position + 42]?.piece === null && board[position + 42].playable === true) {
                tempArrForJumps.push(board[position + 42])
                if (board[position + 49]?.piece === null && board[position + 49].playable === true) {
                  tempArrForJumps.push(board[position + 49])
                }
              }
            }
          }
        }
      }




    console.log(tempArrForJumps, 'jumps')
    console.log(tempArrForMoves, 'moves')
    
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
        return {...item, piece: null, player: null, selected: false, king:false}
      }

      if (
        item.x === placeToLand.x &&
        item.y ===  placeToLand.y
      ) {
        multipleJumpSearcher = {
          ...item,
          piece: pieceToMove.piece,
          highlighted: false, 
          player: pieceToMove.player, 
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
          player: null,
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
        console.log(forceFeed, 'you must eat this again')
        setPieceToMove(pieceToJump)
        setMultipleCapture(true)
        
    //     forceFeed = forceFeed.filter((force) => {
    //   if (playerOneTurn) return force.piece === 'x'
    //   if (!playerOneTurn) return force.piece === 'z'
    // })
        const boardForceEat = board.map((item, sameIndex) => {
          if (!item.playable) return item
          if (!item === null) return item
          if (playerOneTurn && item?.piece === 'x') return item
          if (!playerOneTurn && item?.piece === 'z') return item
          else if (sameIndex === index) {
          console.log('matched')
          return {...item, movable: true}
        }


        return {...item, movable: false}
        })

    console.log(forceFeed, 'forcefeed')
    setBoardData([...boardForceEat])
      }
    }

    eatMoreChips(multipleJumpSearcher, jumpSearcherIndex, newArr, jumped)

    // if no additional piece to be take this will end the turn of the player
    if (!forceFeed.length) {
      'tihs worked piece to move is now null'
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


  useEffect(() => {
    playerOneTurn ? 
    console.log('p1'):
    console.log('p2')
  }, [boardData])


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
