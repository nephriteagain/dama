import { data } from "../../../../data/arrayData"

export function forceKingThirdTopLeft(
  item : data,
  index : number,
  boardData : data[],
  jumpIndex : number,
  jumpDirection2nd : string[],
  forceFeed3rd : data[],
  forceFeed2nd : data[],
  number : number
) {                                
  if (!item?.king) return

  const moveOne = boardData[jumpIndex + number]
  const moveTwo = boardData[jumpIndex + (number * 2)]
  const moveThree = boardData[jumpIndex + (number * 3)]
  const moveFour = boardData[jumpIndex + (number * 4)]
  const moveFive = boardData[jumpIndex + (number * 5)]
  const moveSix = boardData[jumpIndex + (number * 6)]
  const moveSeven = boardData[jumpIndex + (number * 7)]

  if (number === -9) {
  if (
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.piece !== null &&
  moveOne?.piece !== item?.piece &&
  jumpDirection2nd[index] !== 'bot right'
  ) {

    
    forceFeed3rd.push(forceFeed2nd[index])
  }
  if (
  moveThree?.playable &&
  moveThree?.piece === null &&
  moveTwo?.piece !== null &&
  moveTwo?.piece !== item?.piece &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection2nd[index] !== 'bot right'
  ) {

    
    forceFeed3rd.push(forceFeed2nd[index])
  }
  if (
  moveFour?.playable &&
  moveFour?.piece === null &&
  moveThree?.piece !== null &&
  moveThree?.piece !== item?.piece &&
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection2nd[index] !== 'bot right'
  ) {

    
    forceFeed3rd.push(forceFeed2nd[index])
  }
  if (
  moveFive?.playable &&
  moveFive?.piece === null &&
  moveFour?.piece !== null &&
  moveFour?.piece !== item?.piece &&
  moveThree?.playable &&
  moveThree?.piece === null &&
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection2nd[index] !== 'bot right'
  ) {

    
    forceFeed3rd.push(forceFeed2nd[index])
  }
  if (
  moveSix?.playable &&
  moveSix?.piece === null &&
  moveFive?.piece !== null &&
  moveFive?.piece !== item?.piece &&
  moveFour?.playable &&
  moveFour?.piece === null &&
  moveThree?.playable &&
  moveThree?.piece === null &&
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection2nd[index] !== 'bot right'
  ) {

    
    forceFeed3rd.push(forceFeed2nd[index])
  }
  if (
  moveSeven?.playable &&
  moveSeven?.piece === null &&
  moveSix?.piece !== null &&
  moveSix?.piece !== item?.piece &&
  moveFive?.playable &&
  moveFive?.piece === null &&
  moveFour?.playable &&
  moveFour?.piece === null &&
  moveThree?.playable &&
  moveThree?.piece === null &&
  moveTwo?.playable &&
  moveTwo?.piece === null &&
  moveOne?.playable &&
  moveOne?.piece === null &&
  jumpDirection2nd[index] !== 'bot right'
  ) {

    
    forceFeed3rd.push(forceFeed2nd[index])
  }
  }
}