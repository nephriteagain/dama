export function forceKingCapture(
  item,
  index,
  boardData,
  forceFeed,
  jumpDirection,
  jumpedArr,
  number
) {
  if (!item.king) return

        const moveOne = boardData[index + number]
        const moveTwo = boardData[index + (number * 2)]
        const moveThree = boardData[index + (number * 3)]
        const moveFour = boardData[index + (number * 4)]
        const moveFive = boardData[index + (number * 5)]
        const moveSix = boardData[index + (number * 6)]
        const moveSeven = boardData[index + (number * 7)]

          // top right ----------------------
        if (
        item.piece !== null &&
        moveOne?.piece !== null && moveOne?.piece !== item.piece &&
        moveTwo?.playable && moveTwo?.piece === null
        ) {
          forceFeed.push(item)
          jumpedArr.push(moveTwo)
          number === -7 && jumpDirection.push('top right')
          number === -9  && jumpDirection.push('top left')
          number === 7  && jumpDirection.push('bot left')
          number === 9  && jumpDirection.push('bot right')
        }
        if (
        item.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.piece !== null && moveTwo?.piece !== item.piece &&
        moveThree?.playable && moveThree?.piece === null
        ) {
          forceFeed.push(item)
          jumpedArr.push(moveThree)
          number === -7 && jumpDirection.push('top right')
          number === -9  && jumpDirection.push('top left')
          number === 7  && jumpDirection.push('bot left')
          number === 9  && jumpDirection.push('bot right')
        }
        if (
        item.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.playable && moveTwo?.piece === null &&
        moveThree?.piece !== null && moveThree?.piece !== item.piece &&
        moveFour?.playable && moveFour?.piece === null
        ) {
          forceFeed.push(item)
          jumpedArr.push(moveFour)
          number === -7 && jumpDirection.push('top right')
          number === -9  && jumpDirection.push('top left')
          number === 7  && jumpDirection.push('bot left')
          number === 9  && jumpDirection.push('bot right')
        }
        if (
        item.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.playable && moveTwo?.piece === null &&
        moveThree?.playable && moveThree?.piece === null &&
        moveFour?.piece !== null && moveFour?.piece !== item.piece &&
        moveFive?.playable && moveFive?.piece === null
        ) {
          forceFeed.push(item)
          jumpedArr.push(moveFive)
          number === -7 && jumpDirection.push('top right')
          number === -9  && jumpDirection.push('top left')
          number === 7  && jumpDirection.push('bot left')
          number === 9  && jumpDirection.push('bot right')
        }
        if (
        item.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.playable && moveTwo?.piece === null &&
        moveThree?.playable && moveThree?.piece === null &&
        moveFour?.playable && moveFour?.piece === null &&
        moveFive?.piece !== null && moveFive?.piece !== item.piece &&
        moveSix?.playable && moveSix?.piece === null
        ) {
          forceFeed.push(item)
          jumpedArr.push(moveSix)
          number === -7 && jumpDirection.push('top right')
          number === -9  && jumpDirection.push('top left')
          number === 7  && jumpDirection.push('bot left')
          number === 9  && jumpDirection.push('bot right')
        }
        if (
        item.piece !== null &&
        moveOne?.playable && moveOne?.piece === null &&
        moveTwo?.playable && moveTwo?.piece === null &&
        moveThree?.playable && moveThree?.piece === null &&
        moveFour?.playable && moveFour?.piece === null &&
        moveFive?.playable && moveFive?.piece === null &&
        moveSix?.piece !== null && moveSix?.piece !== item.piece &&
        moveSeven?.playable && moveSeven?.piece === null
        ) {
          forceFeed.push(item)
          jumpedArr.push(moveSeven)
          number === -7 && jumpDirection.push('top right')
          number === -9  && jumpDirection.push('top left')
          number === 7  && jumpDirection.push('bot left')
          number === 9  && jumpDirection.push('bot right')
        }
        }