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
