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
  const [forceCapture, setForceCapture] = useState([])

  

  function highlightMoves(itemToMove, position: number, playerTurn) {
    const { x: xPosition, y: yPosition, piece, player, selected } = itemToMove;
    const tempArrForMoves = []
    // const tempArrForJumps = []

    
    if (piece === null) return
    if (itemToMove.king) return
    // if p1 try to access p2 chips it will immediately return and vice versa for player 2
    if (playerTurn === true && player === 2 || !playerTurn && player === 1) return
    

    
    const newBoardData = boardData.map((item, index) => {
      if (!item.playable) return item
    

        // find the selected chip
        if (position === index) {
          return {...item, selected: true}
        }

        //  p1 move
        if (
          item.piece === null &&
          itemToMove.piece === 'z' &&
          (index + 7 === position||
          index + 9 === position)
          ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true, selected: false}
          }

        // p2 move
        else if (
          item.piece === null &&
          itemToMove.piece === 'x' &&
          (index - 7 === position||
          index - 9 === position)
          ) {
            tempArrForMoves.push(item)
            return {...item, highlighted: true, selected: false}
          }

          // top right jump
        else if (
          item.piece === null &&
          boardData[index + 7]?.piece !== null &&
          boardData[index + 7]?.piece !== boardData[index + 14]?.piece &&
          index + 14 === position
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true, selected: false}
        }
          // top left jump
        else if (
          item.piece === null &&
          boardData[index + 9]?.piece !== null &&
          boardData[index + 9]?.piece !== boardData[index + 18]?.piece &&
          index + 18 === position
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true, selected: false}
        }

        // bottom right
        else if (
          item.piece === null &&
          boardData[index - 9]?.piece !== null &&
          boardData[index - 9]?.piece !== boardData[index - 18]?.piece &&
          index - 18 === position
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true, selected: false}
        }

        // bottom left
        else if (
          item.piece === null &&
          boardData[index - 7]?.piece !== null &&
          boardData[index - 7]?.piece !== boardData[index - 14]?.piece &&
          index - 14 === position
        ) {
          tempArrForMoves.push(item)
          return {...item, highlighted: true, selected: false}
        }


        
      
          

          

          



        return {...item, highlighted: false, selected: false}
      })
    


    
    
    console.log(tempArrForMoves)
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
    // if p1 try to access p2 chips it will immediately return and vice versa for player 2
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
        item.x === placeToLand.x &&
        item.y ===  placeToLand.y
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



    const newArr =  newBoardData.map((item, index) => {
      if (item.x === chipToBeTaken.x && item.y === chipToBeTaken.y) {
        console.log('captured', item)
        return {
          ...item, 
          player: null,
          piece: null, 
          king: false, 
          selected: false, 
          highlighted: false}
      }
      
      if (item.y === 7 && item.piece === 'z' && item.king === false) {
        console.log('player 1 king awakened!')
        return {...item, king: true}
      }

      // checks for player 2 new king
      if (item.y === 0 && item.piece == 'x' && item.king === false) {
        console.log('player 2 king awakened!')
        return {...item, king: true}
      }


        return item
      
    })
    setBoardData([...newArr])
    setPieceToMove(null)
  }



  // player turn handler
  useEffect(() => {
    if (pieceToMove === null) {
      setPlayerOneTurn(!playerOneTurn)
    }
  }, [pieceToMove])

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





  return (
    <GlobalContext.Provider value={{
      boardData, 
      setBoardData,
      highlightMoves,
      highlightMovesKing,
      movePiece, 
      pieceToMove,
      playerOneTurn,
      setPlayerOneTurn,
      gameOver,
      setGameOver,
      playerChipsCount,
      setPossibleMoves,
      jumpedChip,
      setJumpedChip,
      multipleCapture,
      setMultipleCapture
    }}
    >
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}
