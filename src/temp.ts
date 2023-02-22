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