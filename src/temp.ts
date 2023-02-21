function topRight() {
            if (
          boardData[jumpIndex - 7]?.piece !== null && boardData[jumpIndex - 7]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 14]?.playable && boardData[jumpIndex - 14]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 14)
          } else {
            path[jumpIndex] = [jumpIndex - 14]
          }
          
        }
        if (
          boardData[jumpIndex - 7]?.playable && boardData[jumpIndex - 7]?.piece === null &&
          boardData[jumpIndex - 14]?.piece !== null && boardData[jumpIndex - 14]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 21]?.playable && boardData[jumpIndex - 21]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 21)
          } else {
            path[jumpIndex] = [jumpIndex - 21]
          }
          
        }
        if (
          boardData[jumpIndex - 7]?.playable && boardData[jumpIndex - 7]?.piece === null &&
          boardData[jumpIndex - 14]?.playable && boardData[jumpIndex - 14]?.piece === null &&
          boardData[jumpIndex - 21]?.piece !== null && boardData[jumpIndex - 21]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 28]?.playable && boardData[jumpIndex - 28]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 28)
          } else {
            path[jumpIndex] = [jumpIndex - 28]
          }
          
        }
        if (
          boardData[jumpIndex - 7]?.playable && boardData[jumpIndex - 7]?.piece === null &&
          boardData[jumpIndex - 14]?.playable && boardData[jumpIndex - 14]?.piece === null &&
          boardData[jumpIndex - 21]?.playable && boardData[jumpIndex - 21]?.piece === null &&
          boardData[jumpIndex - 28]?.piece !== null && boardData[jumpIndex - 28]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 35]?.playable && boardData[jumpIndex - 35]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 35)
          } else {
            path[jumpIndex] = [jumpIndex - 35]
          }
          
        }
        if (
          boardData[jumpIndex - 7]?.playable && boardData[jumpIndex - 7]?.piece === null &&
          boardData[jumpIndex - 14]?.playable && boardData[jumpIndex - 14]?.piece === null &&
          boardData[jumpIndex - 21]?.playable && boardData[jumpIndex - 21]?.piece === null &&
          boardData[jumpIndex - 28]?.playable && boardData[jumpIndex - 28]?.piece === null &&
          boardData[jumpIndex - 35]?.piece !== null && boardData[jumpIndex - 35]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 42]?.playable && boardData[jumpIndex - 42]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 42)
          } else {
            path[jumpIndex] = [jumpIndex - 42]
          }
          
        }
          }
          // bot left -------------------
          function botLeft() {
            if (
          boardData[jumpIndex + 7]?.piece !== null && boardData[jumpIndex + 7]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 14]?.playable && boardData[jumpIndex + 14]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 14)
          } else {
            path[jumpIndex] = [jumpIndex + 14]
          }
          
        }
        if (
          boardData[jumpIndex + 7]?.playable && boardData[jumpIndex + 7]?.piece === null &&
          boardData[jumpIndex + 14]?.piece !== null && boardData[jumpIndex + 14]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 21]?.playable && boardData[jumpIndex + 21]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 21)
          } else {
            path[jumpIndex] = [jumpIndex + 21]
          }
          
        }
        if (
          boardData[jumpIndex + 7]?.playable && boardData[jumpIndex + 7]?.piece === null &&
          boardData[jumpIndex + 14]?.playable && boardData[jumpIndex + 14]?.piece === null &&
          boardData[jumpIndex + 21]?.piece !== null && boardData[jumpIndex + 21]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 28]?.playable && boardData[jumpIndex + 28]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 28)
          } else {
            path[jumpIndex] = [jumpIndex + 28]
          }
          
        }
        if (
          boardData[jumpIndex + 7]?.playable && boardData[jumpIndex + 7]?.piece === null &&
          boardData[jumpIndex + 14]?.playable && boardData[jumpIndex + 14]?.piece === null &&
          boardData[jumpIndex + 21]?.playable && boardData[jumpIndex + 21]?.piece === null &&
          boardData[jumpIndex + 28]?.piece !== null && boardData[jumpIndex + 28]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 35]?.playable && boardData[jumpIndex + 35]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 35)
          } else {
            path[jumpIndex] = [jumpIndex + 35]
          }
          
        }
        if (
          boardData[jumpIndex + 7]?.playable && boardData[jumpIndex + 7]?.piece === null &&
          boardData[jumpIndex + 14]?.playable && boardData[jumpIndex + 14]?.piece === null &&
          boardData[jumpIndex + 21]?.playable && boardData[jumpIndex + 21]?.piece === null &&
          boardData[jumpIndex + 28]?.playable && boardData[jumpIndex + 28]?.piece === null &&
          boardData[jumpIndex + 35]?.piece !== null && boardData[jumpIndex + 35]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 42]?.playable && boardData[jumpIndex + 42]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 42)
          } else {
            path[jumpIndex] = [jumpIndex + 42]
          }
          
        }
          }
        // top left
          function topLeft() {
          if (
          boardData[jumpIndex - 9]?.piece !== null && boardData[jumpIndex - 9]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 18]?.playable && boardData[jumpIndex - 18]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 18)
          } else {
            path[jumpIndex] = [jumpIndex - 18]
          }
          
        }
        if (
          boardData[jumpIndex - 9]?.playable && boardData[jumpIndex - 9]?.piece === null &&
          boardData[jumpIndex - 18]?.piece !== null && boardData[jumpIndex - 18]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 27]?.playable && boardData[jumpIndex - 27]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 27)
          } else {
            path[jumpIndex] = [jumpIndex - 27]
          }
          
        }
        if (
          boardData[jumpIndex - 9]?.playable && boardData[jumpIndex - 9]?.piece === null &&
          boardData[jumpIndex - 18]?.playable && boardData[jumpIndex - 18]?.piece === null &&
          boardData[jumpIndex - 27]?.piece !== null && boardData[jumpIndex - 27]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 36]?.playable && boardData[jumpIndex - 36]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 36)
          } else {
            path[jumpIndex] = [jumpIndex - 36]
          }
          
        }
        if (
          boardData[jumpIndex - 9]?.playable && boardData[jumpIndex - 9]?.piece === null &&
          boardData[jumpIndex - 18]?.playable && boardData[jumpIndex - 18]?.piece === null &&
          boardData[jumpIndex - 27]?.playable && boardData[jumpIndex - 27]?.piece === null &&
          boardData[jumpIndex - 36]?.piece !== null && boardData[jumpIndex - 36]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 45]?.playable && boardData[jumpIndex - 45]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 45)
          } else {
            path[jumpIndex] = [jumpIndex - 45]
          }
          
        }
        if (
          boardData[jumpIndex - 9]?.playable && boardData[jumpIndex - 9]?.piece === null &&
          boardData[jumpIndex - 18]?.playable && boardData[jumpIndex - 18]?.piece === null &&
          boardData[jumpIndex - 27]?.playable && boardData[jumpIndex - 27]?.piece === null &&
          boardData[jumpIndex - 36]?.playable && boardData[jumpIndex - 36]?.piece === null &&
          boardData[jumpIndex - 45]?.piece !== null && boardData[jumpIndex - 45]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 54]?.playable && boardData[jumpIndex - 54]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 54)
          } else {
            path[jumpIndex] = [jumpIndex - 54]
          }
          
        }
        if (
          boardData[jumpIndex - 9]?.playable && boardData[jumpIndex - 9]?.piece === null &&
          boardData[jumpIndex - 18]?.playable && boardData[jumpIndex - 18]?.piece === null &&
          boardData[jumpIndex - 27]?.playable && boardData[jumpIndex - 27]?.piece === null &&
          boardData[jumpIndex - 36]?.playable && boardData[jumpIndex - 36]?.piece === null &&
          boardData[jumpIndex - 45]?.playable && boardData[jumpIndex - 45]?.piece === null &&
          boardData[jumpIndex - 54]?.piece !== null && boardData[jumpIndex - 54]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex - 63]?.playable && boardData[jumpIndex - 63]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex - 63)
          } else {
            path[jumpIndex] = [jumpIndex - 63]
          }
          
        }
          }      
        // bot right
          function botRight() {
            if (
          boardData[jumpIndex + 9]?.piece !== null && boardData[jumpIndex + 9]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 18]?.playable && boardData[jumpIndex + 18]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 18)
          } else {
            path[jumpIndex] = [jumpIndex + 18]
          }
          
        }
        if (
          boardData[jumpIndex + 9]?.playable && boardData[jumpIndex + 9]?.piece === null &&
          boardData[jumpIndex + 18]?.piece !== null && boardData[jumpIndex + 18]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 27]?.playable && boardData[jumpIndex + 27]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 27)
          } else {
            path[jumpIndex] = [jumpIndex + 27]
          }
          
        }
        if (
          boardData[jumpIndex + 9]?.playable && boardData[jumpIndex + 9]?.piece === null &&
          boardData[jumpIndex + 18]?.playable && boardData[jumpIndex + 18]?.piece === null &&
          boardData[jumpIndex + 27]?.piece !== null && boardData[jumpIndex + 27]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 36]?.playable && boardData[jumpIndex + 36]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 36)
          } else {
            path[jumpIndex] = [jumpIndex + 36]
          }
          
        }
        if (
          boardData[jumpIndex + 9]?.playable && boardData[jumpIndex + 9]?.piece === null &&
          boardData[jumpIndex + 18]?.playable && boardData[jumpIndex + 18]?.piece === null &&
          boardData[jumpIndex + 27]?.playable && boardData[jumpIndex + 27]?.piece === null &&
          boardData[jumpIndex + 36]?.piece !== null && boardData[jumpIndex + 36]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 45]?.playable && boardData[jumpIndex + 45]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 45)
          } else {
            path[jumpIndex] = [jumpIndex + 45]
          }
          
        }
        if (
          boardData[jumpIndex + 9]?.playable && boardData[jumpIndex + 9]?.piece === null &&
          boardData[jumpIndex + 18]?.playable && boardData[jumpIndex + 18]?.piece === null &&
          boardData[jumpIndex + 27]?.playable && boardData[jumpIndex + 27]?.piece === null &&
          boardData[jumpIndex + 36]?.playable && boardData[jumpIndex + 36]?.piece === null &&
          boardData[jumpIndex + 45]?.piece !== null && boardData[jumpIndex + 45]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 54]?.playable && boardData[jumpIndex + 54]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 54)
          } else {
            path[jumpIndex] = [jumpIndex + 54]
          }
          
        }
        if (
          boardData[jumpIndex + 9]?.playable && boardData[jumpIndex + 9]?.piece === null &&
          boardData[jumpIndex + 18]?.playable && boardData[jumpIndex + 18]?.piece === null &&
          boardData[jumpIndex + 27]?.playable && boardData[jumpIndex + 27]?.piece === null &&
          boardData[jumpIndex + 36]?.playable && boardData[jumpIndex + 36]?.piece === null &&
          boardData[jumpIndex + 45]?.playable && boardData[jumpIndex + 45]?.piece === null &&
          boardData[jumpIndex + 54]?.piece !== null && boardData[jumpIndex + 54]?.piece !== arrThatJumped[index].piece &&
          boardData[jumpIndex + 63]?.playable && boardData[jumpIndex + 63]?.piece === null
        ) {
          if (path.hasOwnProperty(jumpIndex)) {
            path[jumpIndex].push(jumpIndex + 63)
          } else {
            path[jumpIndex] = [jumpIndex + 63]
          }
          
        }
          }