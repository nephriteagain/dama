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
  // const [ possibleJumps, setPossibleJumps ] = useState([])

  function highlightMoves(itemToMove, position: number) {
    const { x: xPosition, y: yPosition, piece, player } = itemToMove;
    const tempArrForMoves = []
    const tempArrForJumps = []

    
    if (piece === null) return
    if (itemToMove.king) return
    const newBoardData = boardData.map((item, index) => {
      if (!item.playable) return item

        // p1  right move
        if (
            item.x === xPosition + 1 && 
            item.y === yPosition - 1 &&
            item?.piece === null &&
            player === 1
          ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true}
        }
        // p1 left move
        if (
          item.x === xPosition - 1 &&
          item.y === yPosition - 1 &&
          item?.piece === null &&
          player === 1
        ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true}
        }
        // p2 right move
        if (
            item.x === xPosition + 1 && 
            item.y === yPosition + 1 &&
            item?.piece === null &&
            player === 2
          ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true}
        }
        // p2 left move
        if (
          item.x === xPosition - 1 &&
          item.y === yPosition + 1 &&
          item?.piece === null &&
          player === 2
        ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true}
        }
        
        // top right take
        if (
          item.x === xPosition + 2 &&
          item.y === yPosition - 2 &&
          item?.piece === null &&
          (boardData[index + 7].piece === 'x' && player === 1 ||
          boardData[index + 7].piece === 'z' && player === 2)
          ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }
        // top left take
        if (          
          item.x === xPosition - 2 &&
          item.y === yPosition - 2 &&
          item?.piece === null &&
          (boardData[index + 9].piece === 'x' && player === 1 ||
          boardData[index + 9].piece === 'z' && player === 2)
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }
        // bottom right take
        if (
          item.x === xPosition + 2 &&
          item.y === yPosition + 2 &&
          item?.piece === null &&
          (boardData[index - 9].piece === 'x' && player === 1 ||
          boardData[index - 9].piece === 'z' && player === 2 )
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true}
        }
        // bottom left take
        if (
          item.x === xPosition - 2 &&
          item.y === yPosition + 2 &&
          item?.piece === null &&
          (boardData[index - 7].piece === 'x' && player === 1 ||
          boardData[index - 7].piece === 'z' && player === 2 )
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

  function highlightMovesKing(itemToMove, position: number) {
    const { x: xPosition, y: yPosition, piece, player } = itemToMove;
    let tempArrForMoves = []
    const tempArrForJumps = []

    if (piece === null) return
    if (!itemToMove.king) return
    console.log(itemToMove, position, 'item to move')


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
    ) {
      tempArrForMoves.push(boardData[position + 49])
    }
            } else if (
      boardData[position + 35]?.piece !== null && 
      boardData[position + 35]?.playable === true && 
      itemToMove.piece !== boardData[position + 35]?.piece
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
    ) {
      tempArrForMoves.push(boardData[position - 49])
    }
            } else if (
      boardData[position - 35]?.piece !== null && 
      boardData[position - 35]?.playable === true && 
      itemToMove.piece !== boardData[position - 35]?.piece
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
            } else if (boardData[position + 45]?.piece !== null && boardData[position + 45]?.playable === true && itemToMove.piece !== boardData[position + 45]?.piece) {
      tempArrForMoves.push(boardData[position + 54])
    }
          } else if (boardData[position + 36]?.piece !== null && boardData[position + 36]?.playable === true && itemToMove.piece !== boardData[position + 36]?.piece) {
      tempArrForMoves.push(boardData[position + 45])
              if (boardData[position + 54]?.piece === null && boardData[position + 54].playable === true) {
                tempArrForMoves.push(boardData[position + 54])
              }    
    }
        } else if (boardData[position + 27]?.piece !== null && boardData[position + 27]?.playable === true && itemToMove.piece !== boardData[position + 27]?.piece) {
      tempArrForMoves.push(boardData[position + 36])
            if (boardData[position + 45]?.piece === null && boardData[position + 45].playable === true) {
              tempArrForMoves.push(boardData[position + 45])
              if (boardData[position + 54]?.piece === null && boardData[position + 54].playable === true) {
                tempArrForMoves.push(boardData[position + 54])
              }
            }
    }
      } else if (boardData[position + 18]?.piece !== null && boardData[position + 18]?.playable === true && itemToMove.piece !== boardData[position + 18]?.piece) {
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
    } else if (boardData[position + 9]?.piece !== null && boardData[position + 9]?.playable === true && itemToMove.piece !== boardData[position + 9]?.piece) {
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
      tempArrForMoves.push(boardData[position + 9])
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
            } else if (boardData[position - 45]?.piece !== null && boardData[position - 45]?.playable === true && itemToMove.piece !== boardData[position - 45]?.piece) {
      tempArrForMoves.push(boardData[position - 54])
    }
          } else if (boardData[position - 36]?.piece !== null && boardData[position - 36]?.playable === true && itemToMove.piece !== boardData[position - 36]?.piece) {
      tempArrForMoves.push(boardData[position - 45])
              if (boardData[position - 54]?.piece === null && boardData[position - 54].playable === true) {
                tempArrForMoves.push(boardData[position - 54])
              }    
    }
        } else if (boardData[position - 27]?.piece !== null && boardData[position - 27]?.playable === true && itemToMove.piece !== boardData[position - 27]?.piece) {
      tempArrForMoves.push(boardData[position - 36])
            if (boardData[position - 45]?.piece === null && boardData[position - 45].playable === true) {
              tempArrForMoves.push(boardData[position - 45])
              if (boardData[position - 54]?.piece === null && boardData[position - 54].playable === true) {
                tempArrForMoves.push(boardData[position - 54])
              }
            }
    }
      } else if (boardData[position - 18]?.piece !== null && boardData[position - 18]?.playable === true && itemToMove.piece !== boardData[position - 18]?.piece) {
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
    } else if (boardData[position - 9]?.piece !== null && boardData[position - 9]?.playable === true && itemToMove.piece !== boardData[position - 9]?.piece) {
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

    console.log(tempArrForMoves)
    // checks all available moves
    const tempBoardData = boardData.map((item) => {
      const tempItem = tempArrForMoves.find((chip) => {
        if (item.x === chip.x && item.y === chip.y) {
          return chip
        }
      })
      if (tempItem) {
        return {...item, highlighted: true,}
      
      }
      return {...item, highlighted: false}
    })


    console.log(tempArrForMoves)
    setPossibleMoves([...tempArrForMoves])
    setBoardData([...tempBoardData])
    setPieceToMove({...itemToMove})
  }


  function movePiece(pieceToMove: [], placeToLand: [], index: number) {
    const xPosition : number = placeToLand.x
    const yPosition : number = placeToLand.y

    const chipToMove = boardData.find((item) => {
      if (item.x === pieceToMove.x && item.y === pieceToMove.y) {
        return item
      }
    })
    let newBoardData = boardData.map((item, index) => {
      if (!item.playable) return item

      if (item === chipToMove) {
        return {...item, piece: null, player: null}
      }

      if (
        item.x === xPosition &&
        item.y ===  yPosition
      ) return {...item, piece: pieceToMove.piece, highlighted: false, player: pieceToMove.player, king: pieceToMove.king}

      return {...item, highlighted: false}
    })

    // check if the move is jump
    //  top right jump
    if (pieceToMove.x + 2 === placeToLand.x &&
      pieceToMove.y - 2 === placeToLand.y ) {
        // find the piece to be taken
      newBoardData = newBoardData.map((item) => {
        if (item.x === boardData[index + 7].x && 
          item.y === boardData[index + 7].y) {
          
          return {...item, player: null, piece: null}
        }
          return item
      })
    }
    //  top left jump
    if (pieceToMove.x -2 === placeToLand.x &&
      pieceToMove.y - 2 === placeToLand.y) {
        newBoardData = newBoardData.map((item) => {
        if (item.x === boardData[index + 9].x && 
          item.y === boardData[index + 9].y) {
          
          return {...item, player: null, piece: null}
        }
          return item
      })
      }
      //  bottom right jump
      if (pieceToMove.x + 2 === placeToLand.x &&
      pieceToMove.y + 2 === placeToLand.y) {
        newBoardData = newBoardData.map((item) => {
        if (item.x === boardData[index - 9].x && 
          item.y === boardData[index - 9].y) {
          
          return {...item, player: null, piece: null}
        }
          return item
      })
      }
      // bottom left jump
      if (pieceToMove.x - 2 === placeToLand.x &&
      pieceToMove.y + 2 === placeToLand.y) {
        newBoardData = newBoardData.map((item) => {
        if (item.x === boardData[index - 7].x && 
          item.y === boardData[index - 7].y) {
          
          return {...item, player: null, piece: null}
        }
          return item
      })
      }

      setBoardData([...newBoardData])
      setPieceToMove(null)
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








  // useEffect(() => {
  //   if (pieceToMove) {
  //     console.log(pieceToMove, 'piece to move')
  //     console.log(possibleMoves, 'possible moves')
  //   }
  //   //  else {
  //   //   console.log(boardData)
  //   // }
  // }, [boardData])







  return (
    <GlobalContext.Provider value={{
      boardData, 
      setBoardData,
      highlightMoves,
      highlightMovesKing,
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
