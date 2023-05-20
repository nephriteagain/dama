import { data } from "../../../data/arrayData"

export function forceCaptureThird(
  item : data,
  index : number,
  boardData : data[],
  jumpIndex : number,
  jumpDirection2nd : string[],
  forceFeed3rd : data[],
  forceFeed2nd : data[],
  number : number
) {
  if (item?.king) return

  if (number === -7) {
    // top right jump
    if (
      boardData[jumpIndex - 7].piece !== null &&
      boardData[jumpIndex - 7]?.piece !== item.piece &&
      boardData[jumpIndex - 14]?.playable &&
      boardData[jumpIndex - 14].piece === null &&
      jumpDirection2nd[index] !== 'bot left'
    ) {
      forceFeed3rd.push(forceFeed2nd[index])
    }
  }

  if (number === -9) {
    // top left
    if (
      boardData[jumpIndex - 9].piece !== null &&
      boardData[jumpIndex - 9]?.piece !== item.piece &&
      boardData[jumpIndex - 18]?.playable &&
      boardData[jumpIndex - 18].piece === null &&
      jumpDirection2nd[index] !== 'bot right'
    ) {
      forceFeed3rd.push(forceFeed2nd[index])
    }
  }
  
  if (number === 7) {
    // bot left
    if (
      boardData[jumpIndex + 7].piece !== null &&
      boardData[jumpIndex + 7]?.piece !== item.piece &&
      boardData[jumpIndex + 14]?.playable &&
      boardData[jumpIndex + 14].piece === null &&
      jumpDirection2nd[index] !== 'top right'
    ) {
      forceFeed3rd.push(forceFeed2nd[index])
    }
  }

  if (number === 9) {
    // bot right
    if (
      boardData[jumpIndex + 9].piece !== null &&
      boardData[jumpIndex + 9]?.piece !== item.piece &&
      boardData[jumpIndex + 18]?.playable &&
      boardData[jumpIndex + 18].piece === null &&
      jumpDirection2nd[index] !== 'top left'
    ) {
      forceFeed3rd.push(forceFeed2nd[index])
    }
  }
          
          
          
}