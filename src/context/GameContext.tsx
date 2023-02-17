import { useContext, createContext, useState, useEffect, ReactNode } from "react"

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
  // const [ possibleJumps, setPossibleJumps ] = useState([])

  function highlightMoves(itemToMove, position: number, playerTurn) {
    const { x: xPosition, y: yPosition, piece, player, selected } = itemToMove;
    const tempArrForMoves = []
    const tempArrForJumps = []

    
    if (piece === null) return
    if (itemToMove.king) return
    const newBoardData = boardData.map((item, index) => {
      if (!item.playable) return item
        // find the selected chip
        if (xPosition === item.x && yPosition === item.y) {
          return {...item, selected: true}
        }


        // p1  right move
        if (
            item.x === xPosition + 1 && 
            item.y === yPosition - 1 &&
            item?.piece === null &&
            player === 1 &&
            playerOneTurn
          ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true, selected: false}
        }
        // p1 left move
        if (
          item.x === xPosition - 1 &&
          item.y === yPosition - 1 &&
          item?.piece === null &&
          player === 1 &&
          playerOneTurn === true
        ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true, selected: false}
        }
        // p2 right move
        if (
            item.x === xPosition + 1 && 
            item.y === yPosition + 1 &&
            item?.piece === null &&
            player === 2 &&
            playerOneTurn === false
          ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true, selected: false}
        }
        // p2 left move
        if (
          item.x === xPosition - 1 &&
          item.y === yPosition + 1 &&
          item?.piece === null &&
          player === 2 &&
          playerOneTurn === false
        ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true, selected: false}
        }
        
        // top right take
        if (
          item.x === xPosition + 2 &&
          item.y === yPosition - 2 &&
          item?.piece === null &&
          (boardData[index + 7].piece === 'x' && player === 1 && playerOneTurn === true||
          boardData[index + 7].piece === 'z' && player === 2 && playerOneTurn === false)
          ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true, selected: false}
        }
        // top left take
        if (          
          item.x === xPosition - 2 &&
          item.y === yPosition - 2 &&
          item?.piece === null &&
          (boardData[index + 9].piece === 'x' && player === 1 && playerOneTurn === true||
          boardData[index + 9].piece === 'z' && player === 2 && playerOneTurn === false)
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true, selected: false}
        }
        // bottom right take
        if (
          item.x === xPosition + 2 &&
          item.y === yPosition + 2 &&
          item?.piece === null &&
          (boardData[index - 9].piece === 'x' && player === 1 && playerOneTurn === true ||
          boardData[index - 9].piece === 'z' && player === 2 && playerOneTurn === false )
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true, selected: false}
        }
        // bottom left take
        if (
          item.x === xPosition - 2 &&
          item.y === yPosition + 2 &&
          item?.piece === null &&
          (boardData[index - 7].piece === 'x' && player === 1 && playerOneTurn === true ||
          boardData[index - 7].piece === 'z' && player === 2 && playerOneTurn === false )
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true, selected: false}
        }


        return {...item, highlighted: false, selected: false}
      })
  setPieceToMove({...itemToMove})
  setPossibleMoves([...tempArrForMoves])
  setBoardData([...newBoardData])
}

  function highlightMovesKing(itemToMove, position: number, playerTurn) {
    const { x: xPosition, y: yPosition, piece, player } = itemToMove;
    let tempArrForMoves = []
    const tempArrForJumps = []

    if (piece === null) return
    if (!itemToMove.king) return
    // if p1 try to access p2 chips it will immeadeatly return and vice versa for player 2
    if (playerTurn === true && player === 2 || !playerTurn && player === 1) return


    // southwest direction
    if (boardData[position + 7]?.piece === null && boardData[position + 7].playable === true) {
      tempArrForMoves.push(boardData[position + 7])
      if (boardData[position + 14]?.piece === null && boardData[position + 14].playable === true) {
        tempArrForMoves.push(boardData[position + 14])
        if (boardData[position + 21]?.piece === null && boardData[position + 21].playable === true) {
          tempArrForMoves.push(boardData[position + 21])
          if (boardData[position + 28]?.piece === null && boardData[position + 28].playable === true) {
            tempArrForMoves.push(boardData[position + 28])
            if (boardData[position + 35]?.piece === null && boardData[position + 35].playable === true) {
              tempArrForMoves.push(boardData[position + 35])
              if (boardData[position + 42]?.piece === null && boardData[position + 42].playable === true) {
                tempArrForMoves.push(boardData[position + 42])
                if (boardData[position + 49]?.piece === null && boardData[position + 49].playable === true) {
                  tempArrForMoves.push(boardData[position + 49])
                }
              } else if (
      boardData[position + 42]?.piece !== null && 
      boardData[position + 42]?.playable === true && 
      itemToMove.piece !== boardData[position + 42]?.piece
      && boardData[position + 49]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position + 49])
    }
            } else if (
      boardData[position + 35]?.piece !== null && 
      boardData[position + 35]?.playable === true && 
      itemToMove.piece !== boardData[position + 35]?.piece
      && boardData[position + 42]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position + 42])
        if (boardData[position + 49]?.piece === null && boardData[position + 49].playable === true) {
          tempArrForMoves.push(boardData[position + 49])
        }
    }
          } else if (
      boardData[position + 28]?.piece !== null && 
      boardData[position + 28]?.playable === true && 
      itemToMove.piece !== boardData[position + 28]?.piece
      && boardData[position + 35]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position + 35])
      if (boardData[position + 42]?.piece === null && boardData[position + 42].playable === true) {
        tempArrForMoves.push(boardData[position + 42])
        if (boardData[position + 49]?.piece === null && boardData[position + 49].playable === true) {
          tempArrForMoves.push(boardData[position + 49])
        }
      }  
    }
        } else if (
      boardData[position + 21]?.piece !== null && 
      boardData[position + 21]?.playable === true && 
      itemToMove.piece !== boardData[position + 21]?.piece
      && boardData[position + 28]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position + 28])
      if (boardData[position + 35]?.piece === null && boardData[position + 35].playable === true) {
        tempArrForMoves.push(boardData[position + 35])
        if (boardData[position + 42]?.piece === null && boardData[position + 42].playable === true) {
          tempArrForMoves.push(boardData[position + 42])
          if (boardData[position + 49]?.piece === null && boardData[position + 49].playable === true) {
            tempArrForMoves.push(boardData[position + 49])
          }
        }
      }   
    }
      } else if (
      boardData[position + 14]?.piece !== null && 
      boardData[position + 14]?.playable === true && 
      itemToMove.piece !== boardData[position + 14]?.piece
      && boardData[position + 21]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position + 21])
      if (boardData[position + 28]?.piece === null && boardData[position + 28].playable === true) {
        tempArrForMoves.push(boardData[position + 28])
        if (boardData[position + 35]?.piece === null && boardData[position + 35].playable === true) {
          tempArrForMoves.push(boardData[position + 35])
          if (boardData[position + 42]?.piece === null && boardData[position + 42].playable === true) {
            tempArrForMoves.push(boardData[position + 42])
            if (boardData[position + 49]?.piece === null && boardData[position + 49].playable === true) {
              tempArrForMoves.push(boardData[position + 49])
            }
          }
        }
      }
        
    }
    } else if (
      boardData[position + 7]?.piece !== null && 
      boardData[position + 7]?.playable === true && 
      itemToMove.piece !== boardData[position + 7]?.piece
      && boardData[position + 14]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position + 14])
      if (boardData[position + 21]?.piece === null && boardData[position + 21].playable === true) {
          tempArrForMoves.push(boardData[position + 21])
          if (boardData[position + 28]?.piece === null && boardData[position + 28].playable === true) {
            tempArrForMoves.push(boardData[position + 28])
            if (boardData[position + 35]?.piece === null && boardData[position + 35].playable === true) {
              tempArrForMoves.push(boardData[position + 35])
              if (boardData[position + 42]?.piece === null && boardData[position + 42].playable === true) {
                tempArrForMoves.push(boardData[position + 42])
                if (boardData[position + 49]?.piece === null && boardData[position + 49].playable === true) {
                  tempArrForMoves.push(boardData[position + 49])
                }
              }
            }
          }
        }
    }

     // northeast
    if (boardData[position - 7]?.piece === null && boardData[position - 7].playable === true) {
      tempArrForMoves.push(boardData[position - 7])
      if (boardData[position - 14]?.piece === null && boardData[position - 14].playable === true) {
        tempArrForMoves.push(boardData[position - 14])
        if (boardData[position - 21]?.piece === null && boardData[position - 21].playable === true) {
          tempArrForMoves.push(boardData[position - 21])
          if (boardData[position - 28]?.piece === null && boardData[position - 28].playable === true) {
            tempArrForMoves.push(boardData[position - 28])
            if (boardData[position - 35]?.piece === null && boardData[position - 35].playable === true) {
              tempArrForMoves.push(boardData[position - 35])
              if (boardData[position - 42]?.piece === null && boardData[position - 42].playable === true) {
                tempArrForMoves.push(boardData[position - 42])
                if (boardData[position - 49]?.piece === null && boardData[position - 49].playable === true) {
                  tempArrForMoves.push(boardData[position - 49])
                }
              } else if (
      boardData[position - 42]?.piece !== null && 
      boardData[position - 42]?.playable === true && 
      itemToMove.piece !== boardData[position - 42]?.piece
      && boardData[position - 49]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position - 49])
    }
            } else if (
      boardData[position - 35]?.piece !== null && 
      boardData[position - 35]?.playable === true && 
      itemToMove.piece !== boardData[position - 35]?.piece
      && boardData[position - 42]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position - 42])
        if (boardData[position - 49]?.piece === null && boardData[position - 49].playable === true) {
          tempArrForMoves.push(boardData[position - 49])
        }
    }
          } else if (
      boardData[position - 28]?.piece !== null && 
      boardData[position - 28]?.playable === true && 
      itemToMove.piece !== boardData[position - 28]?.piece
      && boardData[position - 35]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position - 35])
      if (boardData[position - 42]?.piece === null && boardData[position - 42].playable === true) {
        tempArrForMoves.push(boardData[position - 42])
        if (boardData[position - 49]?.piece === null && boardData[position - 49].playable === true) {
          tempArrForMoves.push(boardData[position - 49])
        }
      }  
    }
        } else if (
      boardData[position - 21]?.piece !== null && 
      boardData[position - 21]?.playable === true && 
      itemToMove.piece !== boardData[position - 21]?.piece
      && boardData[position - 28]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position - 28])
      if (boardData[position - 35]?.piece === null && boardData[position - 35].playable === true) {
        tempArrForMoves.push(boardData[position - 35])
        if (boardData[position - 42]?.piece === null && boardData[position - 42].playable === true) {
          tempArrForMoves.push(boardData[position - 42])
          if (boardData[position - 49]?.piece === null && boardData[position - 49].playable === true) {
            tempArrForMoves.push(boardData[position - 49])
          }
        }
      }   
    }
      } else if (
      boardData[position - 14]?.piece !== null && 
      boardData[position - 14]?.playable === true && 
      itemToMove.piece !== boardData[position - 14]?.piece
      && boardData[position - 21]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position - 21])
      if (boardData[position - 28]?.piece === null && boardData[position - 28].playable === true) {
        tempArrForMoves.push(boardData[position - 28])
        if (boardData[position - 35]?.piece === null && boardData[position - 35].playable === true) {
          tempArrForMoves.push(boardData[position - 35])
          if (boardData[position - 42]?.piece === null && boardData[position - 42].playable === true) {
            tempArrForMoves.push(boardData[position - 42])
            if (boardData[position - 49]?.piece === null && boardData[position - 49].playable === true) {
              tempArrForMoves.push(boardData[position - 49])
            }
          }
        }
      }
        
    }
    } else if (
      boardData[position - 7]?.piece !== null && 
      boardData[position - 7]?.playable === true && 
      itemToMove.piece !== boardData[position - 7]?.piece
      && boardData[position - 14]?.piece === null
    ) {
      tempArrForMoves.push(boardData[position - 14])
      if (boardData[position - 21]?.piece === null && boardData[position - 21].playable === true) {
          tempArrForMoves.push(boardData[position - 21])
          if (boardData[position - 28]?.piece === null && boardData[position - 28].playable === true) {
            tempArrForMoves.push(boardData[position - 28])
            if (boardData[position - 35]?.piece === null && boardData[position - 35].playable === true) {
              tempArrForMoves.push(boardData[position - 35])
              if (boardData[position - 42]?.piece === null && boardData[position - 42].playable === true) {
                tempArrForMoves.push(boardData[position - 42])
                if (boardData[position - 49]?.piece === null && boardData[position - 49].playable === true) {
                  tempArrForMoves.push(boardData[position - 49])
                }
              }
            }
          }
        }
    }

    // southeast direction
    if (boardData[position + 9]?.piece === null && boardData[position + 9].playable === true) {
      tempArrForMoves.push(boardData[position + 9])
      if (boardData[position + 18]?.piece === null && boardData[position + 18].playable === true) {
        tempArrForMoves.push(boardData[position + 18])
        if (boardData[position + 27]?.piece === null && boardData[position + 27].playable === true) {
          tempArrForMoves.push(boardData[position + 27])
          if (boardData[position + 36]?.piece === null && boardData[position + 36].playable === true) {
            tempArrForMoves.push(boardData[position + 36])
            if (boardData[position + 45]?.piece === null && boardData[position + 45].playable === true) {
              tempArrForMoves.push(boardData[position + 45])
              if (boardData[position + 54]?.piece === null && boardData[position + 54].playable === true) {
                tempArrForMoves.push(boardData[position + 54])
              }
            } else if (boardData[position + 45]?.piece !== null &&
              boardData[position + 45]?.playable === true &&
              itemToMove.piece !== boardData[position + 45]?.piece
              && boardData[position + 54]?.piece === null
            ) {
                tempArrForMoves.push(boardData[position + 54])
              }
          } else if (boardData[position + 36]?.piece !== null && 
            boardData[position + 36]?.playable === true && 
            itemToMove.piece !== boardData[position + 36]?.piece
            && boardData[position + 45]?.piece === null
            ) {
              tempArrForMoves.push(boardData[position + 45])
              if (boardData[position + 54]?.piece === null && boardData[position + 54].playable === true) {
                tempArrForMoves.push(boardData[position + 54])
                }    
              }
        } else if (boardData[position + 27]?.piece !== null && 
          boardData[position + 27]?.playable === true && 
          itemToMove.piece !== boardData[position + 27]?.piece
          && boardData[position + 36]?.piece === null
          ) {
            tempArrForMoves.push(boardData[position + 36])
            if (boardData[position + 45]?.piece === null && boardData[position + 45].playable === true) {
              tempArrForMoves.push(boardData[position + 45])
              if (boardData[position + 54]?.piece === null && boardData[position + 54].playable === true) {
                tempArrForMoves.push(boardData[position + 54])
              }
            }
          }
      } else if (boardData[position + 18]?.piece !== null && 
        boardData[position + 18]?.playable === true && 
        itemToMove.piece !== boardData[position + 18]?.piece
        && boardData[position + 27]?.piece === null
        ) {
        tempArrForMoves.push(boardData[position + 27])
          if (boardData[position + 36]?.piece === null && boardData[position + 36].playable === true) {
            tempArrForMoves.push(boardData[position + 36])
            if (boardData[position + 45]?.piece === null && boardData[position + 45].playable === true) {
              tempArrForMoves.push(boardData[position + 45])
              if (boardData[position + 54]?.piece === null && boardData[position + 54].playable === true) {
                tempArrForMoves.push(boardData[position + 54])
              }
            }
          } 
    }
    } else if (boardData[position + 9]?.piece !== null && 
      boardData[position + 9]?.playable === true && 
      itemToMove.piece !== boardData[position + 9]?.piece
      && boardData[position + 18]?.piece === null
      ) {
      tempArrForMoves.push(boardData[position + 18])
       if (boardData[position + 27]?.piece === null && boardData[position + 27].playable === true) {
          tempArrForMoves.push(boardData[position + 27])
          if (boardData[position + 36]?.piece === null && boardData[position + 36].playable === true) {
            tempArrForMoves.push(boardData[position + 36])
            if (boardData[position + 45]?.piece === null && boardData[position + 45].playable === true) {
              tempArrForMoves.push(boardData[position + 45])
              if (boardData[position + 54]?.piece === null && boardData[position + 54].playable === true) {
                tempArrForMoves.push(boardData[position + 54])
              }
            }
          }
        }
    }

    // northwest direction
    if (boardData[position - 9]?.piece === null && boardData[position - 9].playable === true) {
      tempArrForMoves.push(boardData[position - 9])
      if (boardData[position - 18]?.piece === null && boardData[position - 18].playable === true) {
        tempArrForMoves.push(boardData[position - 18])
        if (boardData[position - 27]?.piece === null && boardData[position - 27].playable === true) {
          tempArrForMoves.push(boardData[position - 27])
          if (boardData[position - 36]?.piece === null && boardData[position - 36].playable === true) {
            tempArrForMoves.push(boardData[position - 36])
            if (boardData[position - 45]?.piece === null && boardData[position - 45].playable === true) {
              tempArrForMoves.push(boardData[position - 45])
              if (boardData[position - 54]?.piece === null && boardData[position - 54].playable === true) {
                tempArrForMoves.push(boardData[position - 54])
              }
            } else if (boardData[position - 45]?.piece !== null && 
              boardData[position - 45]?.playable === true && 
              itemToMove.piece !== boardData[position - 45]?.piece
              && boardData[position - 54]?.piece === null
            ) {
      tempArrForMoves.push(boardData[position - 54])
    }
          } else if (boardData[position - 36]?.piece !== null && 
            boardData[position - 36]?.playable === true && 
            itemToMove.piece !== boardData[position - 36]?.piece
            && boardData[position - 45]?.piece === null
            ) {
            tempArrForMoves.push(boardData[position - 45])
              if (boardData[position - 54]?.piece === null && boardData[position - 54].playable === true) {
                tempArrForMoves.push(boardData[position - 54])
              }    
          }
        } else if (boardData[position - 27]?.piece !== null && 
          boardData[position - 27]?.playable === true && 
          itemToMove.piece !== boardData[position - 27]?.piece
          && boardData[position - 36]?.piece === null
          ) {
      tempArrForMoves.push(boardData[position - 36])
            if (boardData[position - 45]?.piece === null && boardData[position - 45].playable === true) {
              tempArrForMoves.push(boardData[position - 45])
              if (boardData[position - 54]?.piece === null && boardData[position - 54].playable === true) {
                tempArrForMoves.push(boardData[position - 54])
              }
            }
    }
      } else if (boardData[position - 18]?.piece !== null && 
        boardData[position - 18]?.playable === true && 
        itemToMove.piece !== boardData[position - 18]?.piece
        && boardData[position - 27]?.piece === null
        ) {
        tempArrForMoves.push(boardData[position - 27])
          if (boardData[position - 36]?.piece === null && boardData[position - 36].playable === true) {
            tempArrForMoves.push(boardData[position - 36])
            if (boardData[position - 45]?.piece === null && boardData[position - 45].playable === true) {
              tempArrForMoves.push(boardData[position - 45])
              if (boardData[position - 54]?.piece === null && boardData[position - 54].playable === true) {
                tempArrForMoves.push(boardData[position - 54])
              }
            }
          } 
      }
    } else if (boardData[position - 9]?.piece !== null && 
      boardData[position - 9]?.playable === true && 
      itemToMove.piece !== boardData[position - 9]?.piece
      && boardData[position - 18]?.piece === null
      ) {
      tempArrForMoves.push(boardData[position - 18])
       if (boardData[position - 27]?.piece === null && boardData[position - 27].playable === true) {
          tempArrForMoves.push(boardData[position - 27])
          if (boardData[position - 36]?.piece === null && boardData[position - 36].playable === true) {
            tempArrForMoves.push(boardData[position - 36])
            if (boardData[position - 45]?.piece === null && boardData[position - 45].playable === true) {
              tempArrForMoves.push(boardData[position - 45])
              if (boardData[position - 54]?.piece === null && boardData[position - 54].playable === true) {
                tempArrForMoves.push(boardData[position - 54])
              }
            }
          }
        }
    }


        // remove falsy items
    tempArrForMoves = tempArrForMoves.filter(item => {
      if (item) return item
    })


    // checks all available moves
    const tempBoardData = boardData.map((item) => {
      const tempItem = tempArrForMoves.find((chip) => {
        if (item.x === chip.x && item.y === chip.y) {
          return chip
        }
      })
      if (tempItem) {
        return {...item, highlighted: true, selected: false}
      
      }
      // check if it is the selected item
      if (xPosition === item.x && yPosition === item.y) {
          return {...item, highlighted: false ,selected: true}
        }
      return {...item, highlighted: false, selected: false}
    })


    // console.log(tempArrForMoves)
    setPossibleMoves([...tempArrForMoves])
    setBoardData([...tempBoardData])
    setPieceToMove({...itemToMove})
  }


  function movePiece(pieceToMove: [], placeToLand: [], index: number) {
    const xPosition : number = placeToLand.x
    const yPosition : number = placeToLand.y
    let chipToBeTaken = {}

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
        item.x === xPosition &&
        item.y ===  yPosition
      ) return {...item, piece: pieceToMove.piece, highlighted: false, player: pieceToMove.player, king: pieceToMove.king, selected: false}
      

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


    const newArr =  newBoardData.map((item) => {
      if (item.x === chipToBeTaken.x && item.y === chipToBeTaken.y) {
        console.log(item)
        return {...item, player: null, piece: null, king: false, selected: false, highlighted: false}
      }
      return item
    })
 
      setBoardData([...newArr])
      setPieceToMove(null)
  }

  useEffect(() => {
    if (pieceToMove === null) {
      setPlayerOneTurn(!playerOneTurn)
    }
  }, [pieceToMove])

  {/*
  how to eat a piece?
  a piece must be on range
  a piece of opposite type right to each other
  the landing area is empty
  after the transaction, the opponent must have fewer piece
  also account if there is a probable multiple possible piece to take
  */}





  return (
    <GlobalContext.Provider value={{
      boardData, 
      setBoardData,
      highlightMoves,
      highlightMovesKing,
      movePiece, 
      pieceToMove,
      playerOneTurn
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
