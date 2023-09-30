lowPassFilters={
  blurrFilter:[
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ], 
  squareBlurrFilter:[
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ],
  roundBlurrFilter:[
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
  ],
  lp1Filter:[
    [1, 1, 1],
    [1, 2, 1],
    [1, 1, 1],
  ], 
  lp2Filter:[
    [1, 1, 1],
    [1, 4, 1],
    [1, 1, 1],
  ], 
  lp3Filter:[
    [1,  1, 1],
    [1, 12, 1],
    [1,  1, 1],
  ], 
  pyramidFilter:[
    [1, 2, 3, 2, 1],
    [2, 4, 6, 4, 2],
    [3, 6, 9, 6, 3],
    [2, 4, 6, 4, 2],
    [1, 2, 3, 2, 1],
  ],
  coneFilter:[
    [0, 0, 1, 0, 0],
    [0, 2, 2, 2, 0],
    [1, 2, 5, 2, 1],
    [0, 2, 2, 2, 0],
    [0, 0, 1, 0, 0],
  ],
}

module.exports = lowPassFilters;