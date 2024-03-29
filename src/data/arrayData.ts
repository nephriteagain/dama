export interface data {
  x?: number
  y?: number
  piece?: piece
  playable?: boolean
  highlighted?: boolean
  king?: boolean
  selected?: boolean
  movable?: boolean
}


export type piece = ('x'|'z'|null)

export const arrayData : data[] = [
  {x: 0, y: 7, piece: 'x',  playable: true, highlighted: false, king: false  , selected: false, movable: true},
  {x: 1, y: 7, piece: null, playable: false, highlighted: false},

  {x: 2, y: 7, piece: 'x',  playable: true, highlighted: false, king: false  , selected: false, movable: true},
  {x: 3, y: 7, piece: null, playable: false, highlighted: false},

  {x: 4, y: 7, piece: 'x',  playable: true, highlighted: false, king: false  , selected: false, movable: true},
  {x: 5, y: 7 , piece: null, playable: false, highlighted: false},

  {x: 6, y: 7, piece: 'x',  playable: true, highlighted: false, king: false  , selected: false, movable: true},
  {x: 7, y: 7, piece: null, playable: false, highlighted: false},

  {x: 0, y: 6, piece: null, playable: false, highlighted: false},
  {x: 1, y: 6, piece: 'x',  playable: true, highlighted: false, king: false , selected: false, movable: true},

  {x: 2, y: 6, piece: null, playable: false, highlighted: false},
  {x: 3, y: 6, piece: 'x',  playable: true, highlighted: false, king: false , selected: false, movable: true},
  
  {x: 4, y: 6, piece: null, playable: false, highlighted: false},
  {x: 5, y: 6, piece: 'x',  playable: true, highlighted: false, king: false , selected: false, movable: true},

  {x: 6, y: 6, piece: null, playable: false, highlighted: false},
  {x: 7, y: 6, piece: 'x',  playable: true, highlighted: false, king: false , selected: false, movable: true},

  {x: 0, y: 5, piece: 'x',  playable: true, highlighted: false, king: false , selected: false, movable: true},
  {x: 1, y: 5, piece: null, playable: false, highlighted: false},

  {x: 2, y: 5, piece: 'x',  playable: true, highlighted: false, king: false , selected: false, movable: true},
  {x: 3, y: 5, piece: null, playable: false, highlighted: false},

  {x: 4, y: 5, piece: 'x',  playable: true, highlighted: false, king: false , selected: false, movable: true},
  {x: 5, y: 5, piece: null, playable: false, highlighted: false},

  {x: 6, y: 5, piece: 'x',  playable: true, highlighted: false, king: false , selected: false, movable: true},
  {x: 7, y: 5, piece: null, playable: false, highlighted: false},

  {x: 0, y: 4, piece: null, playable: false, highlighted: false},
  {x: 1, y: 4, piece: null,  playable: true, highlighted: false, king: false  , selected: false, movable: true},

  {x: 2, y: 4, piece: null, playable: false, highlighted: false},
  {x: 3, y: 4, piece: null,  playable: true, highlighted: false, king: false  , selected: false, movable: true},

  {x: 4, y: 4, piece: null, playable: false, highlighted: false},
  {x: 5, y: 4, piece: null,  playable: true, highlighted: false, king: false  , selected: false, movable: true},

  {x: 6, y: 4, piece: null, playable: false, highlighted: false},
  {x: 7, y: 4, piece: null,  playable: true, highlighted: false, king: false  , selected: false, movable: true},

  {x: 0, y: 3, piece: null,  playable: true, highlighted: false, king: false  , selected: false, movable: true},
  {x: 1, y: 3, piece: null, playable: false, highlighted: false},

  {x: 2, y: 3, piece: null,  playable: true, highlighted: false, king: false  , selected: false, movable: true},
  {x: 3, y: 3, piece: null, playable: false, highlighted: false},

  {x: 4, y: 3, piece: null,  playable: true, highlighted: false, king: false  , selected: false, movable: true},
  {x: 5, y: 3, piece: null, playable: false, highlighted: false},

  {x: 6, y: 3, piece: null,  playable: true, highlighted: false, king: false  , selected: false, movable: true},
  {x: 7, y: 3, piece: null, playable: false, highlighted: false},

  {x: 0, y: 2, piece: null, playable: false, highlighted: false},
  {x: 1, y: 2, piece: 'z',  playable: true, highlighted: false, king: false , selected: false, movable: true},

  {x: 2, y: 2, piece: null, playable: false, highlighted: false},
  {x: 3, y: 2, piece: 'z',  playable: true, highlighted: false, king: false , selected: false, movable: true},

  {x: 4, y: 2, piece: null, playable: false, highlighted: false},
  {x: 5, y: 2, piece: 'z',  playable: true, highlighted: false, king: false , selected: false, movable: true},

  {x: 6, y: 2, piece: null, playable: false, highlighted: false},
  {x: 7, y: 2, piece: 'z',  playable: true, highlighted: false, king: false , selected: false, movable: true},

  {x: 0, y: 1, piece: 'z',  playable: true, highlighted: false, king: false , selected: false, movable: true},
  {x: 1, y: 1, piece: null, playable: false, highlighted: false},

  {x: 2, y: 1, piece: 'z',  playable: true, highlighted: false, king: false , selected: false, movable: true},
  {x: 3, y: 1, piece: null, playable: false, highlighted: false},

  {x: 4, y: 1, piece: 'z',  playable: true, highlighted: false, king: false , selected: false, movable: true},
  {x: 5, y: 1, piece: null, playable: false, highlighted: false},

  {x: 6, y: 1, piece: 'z',  playable: true, highlighted: false, king: false , selected: false, movable: true},
  {x: 7, y: 1, piece: null, playable: false, highlighted: false},

  {x: 0, y: 0, piece: null, playable: false, highlighted: false},
  {x: 1, y: 0, piece: 'z',  playable: true, highlighted: false, king: false  , selected: false, movable: true},

  {x: 2, y: 0, piece: null, playable: false, highlighted: false},
  {x: 3, y: 0, piece: 'z',  playable: true, highlighted: false, king: false  , selected: false, movable: true},

  {x: 4, y: 0, piece: null, playable: false, highlighted: false},
  {x: 5, y: 0, piece: 'z',  playable: true, highlighted: false, king: false  , selected: false, movable: true},

  {x: 6, y: 0, piece: null, playable: false, highlighted: false},
  {x: 7, y: 0, piece: 'z',  playable: true, highlighted: false, king: false  , selected: false, movable: true},
]