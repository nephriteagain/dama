if (itemToMove.king) {
      // top right move
      function topRight() {
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

    // top left move
    function topLeft() {
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
    
    // bottom right move
    function botRight() {
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
    
    // bottom left move
    function botLeft() {
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
    
    topRight();topLeft();botRight();botLeft()
    }