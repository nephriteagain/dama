import { data } from "../data/arrayData"

export function cursorPointers(
  playerOneTurn : boolean,
  item  : data,
  chipStyle : {[key: string]: string}
) {
  if (playerOneTurn && item?.piece === 'z' && item?.movable) chipStyle.cursor = 'grab'
  if (playerOneTurn && item?.piece === 'x' && item?.movable) chipStyle.cursor = 'not-allowed'
  if (!playerOneTurn && item?.piece === 'x' && item?.movable) chipStyle.cursor = 'grab'
  if (!playerOneTurn && item?.piece === 'z' && item?.movable) chipStyle.cursor = 'not-allowed'
  if (playerOneTurn && item?.piece === 'z' && !item?.movable) chipStyle.cursor = 'not-allowed'
  if (!playerOneTurn && item?.piece === 'x' && !item?.movable) chipStyle.cursor = 'not-allowed'
  }