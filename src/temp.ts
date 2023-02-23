else if (item.king) {
            console.log('test')
            function topRightKing() {
            if (
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.piece !== null &&
            boardData[jumpIndex - 7]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 21]?.playable &&
            boardData[jumpIndex - 21]?.piece === null &&
            boardData[jumpIndex - 14]?.piece !== null &&
            boardData[jumpIndex - 14]?.piece !== item?.piece &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 28]?.playable &&
            boardData[jumpIndex - 28]?.piece === null &&
            boardData[jumpIndex - 21]?.piece !== null &&
            boardData[jumpIndex - 21]?.piece !== item?.piece &&
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 35]?.playable &&
            boardData[jumpIndex - 35]?.piece === null &&
            boardData[jumpIndex - 28]?.piece !== null &&
            boardData[jumpIndex - 28]?.piece !== item?.piece &&
            boardData[jumpIndex - 21]?.playable &&
            boardData[jumpIndex - 21]?.piece === null &&
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 42]?.playable &&
            boardData[jumpIndex - 42]?.piece === null &&
            boardData[jumpIndex - 35]?.piece !== null &&
            boardData[jumpIndex - 35]?.piece !== item?.piece &&
            boardData[jumpIndex - 28]?.playable &&
            boardData[jumpIndex - 28]?.piece === null &&
            boardData[jumpIndex - 21]?.playable &&
            boardData[jumpIndex - 21]?.piece === null &&
            boardData[jumpIndex - 14]?.playable &&
            boardData[jumpIndex - 14]?.piece === null &&
            boardData[jumpIndex - 7]?.playable &&
            boardData[jumpIndex - 7]?.piece === null &&
            jumpDirection2nd[index] !== 'bot left'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            }
            function botLeftKing() {
            if (
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.piece !== null &&
            boardData[jumpIndex + 7]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 21]?.playable &&
            boardData[jumpIndex + 21]?.piece === null &&
            boardData[jumpIndex + 14]?.piece !== null &&
            boardData[jumpIndex + 14]?.piece !== item?.piece &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 28]?.playable &&
            boardData[jumpIndex + 28]?.piece === null &&
            boardData[jumpIndex + 21]?.piece !== null &&
            boardData[jumpIndex + 21]?.piece !== item?.piece &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 35]?.playable &&
            boardData[jumpIndex + 35]?.piece === null &&
            boardData[jumpIndex + 28]?.piece !== null &&
            boardData[jumpIndex + 28]?.piece !== item?.piece &&
            boardData[jumpIndex + 21]?.playable &&
            boardData[jumpIndex + 21]?.piece === null &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 42]?.playable &&
            boardData[jumpIndex + 42]?.piece === null &&
            boardData[jumpIndex + 35]?.piece !== null &&
            boardData[jumpIndex + 35]?.piece !== item?.piece &&
            boardData[jumpIndex + 28]?.playable &&
            boardData[jumpIndex + 28]?.piece === null &&
            boardData[jumpIndex + 21]?.playable &&
            boardData[jumpIndex + 21]?.piece === null &&
            boardData[jumpIndex + 14]?.playable &&
            boardData[jumpIndex + 14]?.piece === null &&
            boardData[jumpIndex + 7]?.playable &&
            boardData[jumpIndex + 7]?.piece === null &&
            jumpDirection2nd[index] !== 'top right'
            ) {
            
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            }
            function topLeftKing() {
            if (
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.piece !== null &&
            boardData[jumpIndex - 9]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.piece !== null &&
            boardData[jumpIndex - 18]?.piece !== item?.piece &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 36]?.playable &&
            boardData[jumpIndex - 36]?.piece === null &&
            boardData[jumpIndex - 27]?.piece !== null &&
            boardData[jumpIndex - 27]?.piece !== item?.piece &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 45]?.playable &&
            boardData[jumpIndex - 45]?.piece === null &&
            boardData[jumpIndex - 36]?.piece !== null &&
            boardData[jumpIndex - 36]?.piece !== item?.piece &&
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 54]?.playable &&
            boardData[jumpIndex - 54]?.piece === null &&
            boardData[jumpIndex - 45]?.piece !== null &&
            boardData[jumpIndex - 45]?.piece !== item?.piece &&
            boardData[jumpIndex - 36]?.playable &&
            boardData[jumpIndex - 36]?.piece === null &&
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex - 63]?.playable &&
            boardData[jumpIndex - 63]?.piece === null &&
            boardData[jumpIndex - 54]?.piece !== null &&
            boardData[jumpIndex - 54]?.piece !== item?.piece &&
            boardData[jumpIndex - 45]?.playable &&
            boardData[jumpIndex - 45]?.piece === null &&
            boardData[jumpIndex - 36]?.playable &&
            boardData[jumpIndex - 36]?.piece === null &&
            boardData[jumpIndex - 27]?.playable &&
            boardData[jumpIndex - 27]?.piece === null &&
            boardData[jumpIndex - 18]?.playable &&
            boardData[jumpIndex - 18]?.piece === null &&
            boardData[jumpIndex - 9]?.playable &&
            boardData[jumpIndex - 9]?.piece === null &&
            jumpDirection2nd[index] !== 'bot right'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            }
            function botRightKing() {
            if (
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.piece !== null &&
            boardData[jumpIndex + 9]?.piece !== item?.piece &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.piece !== null &&
            boardData[jumpIndex + 18]?.piece !== item?.piece &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 36]?.playable &&
            boardData[jumpIndex + 36]?.piece === null &&
            boardData[jumpIndex + 27]?.piece !== null &&
            boardData[jumpIndex + 27]?.piece !== item?.piece &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 45]?.playable &&
            boardData[jumpIndex + 45]?.piece === null &&
            boardData[jumpIndex + 36]?.piece !== null &&
            boardData[jumpIndex + 36]?.piece !== item?.piece &&
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 54]?.playable &&
            boardData[jumpIndex + 54]?.piece === null &&
            boardData[jumpIndex + 45]?.piece !== null &&
            boardData[jumpIndex + 45]?.piece !== item?.piece &&
            boardData[jumpIndex + 36]?.playable &&
            boardData[jumpIndex + 36]?.piece === null &&
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            if (
            boardData[jumpIndex + 63]?.playable &&
            boardData[jumpIndex + 63]?.piece === null &&
            boardData[jumpIndex + 54]?.piece !== null &&
            boardData[jumpIndex + 54]?.piece !== item?.piece &&
            boardData[jumpIndex + 45]?.playable &&
            boardData[jumpIndex + 45]?.piece === null &&
            boardData[jumpIndex + 36]?.playable &&
            boardData[jumpIndex + 36]?.piece === null &&
            boardData[jumpIndex + 27]?.playable &&
            boardData[jumpIndex + 27]?.piece === null &&
            boardData[jumpIndex + 18]?.playable &&
            boardData[jumpIndex + 18]?.piece === null &&
            boardData[jumpIndex + 9]?.playable &&
            boardData[jumpIndex + 9]?.piece === null &&
            jumpDirection2nd[index] !== 'top left'
            ) {
        
              
              forceFeed3rd.push(forceFeed2nd[index])
            }
            }
            
            topRightKing()
            botLeftKing()
            topLeftKing()
            botRightKing()
            botRightKing()
          }