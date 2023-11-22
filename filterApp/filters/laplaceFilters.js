// used to find contours, they are multidirectional
const laplaceFilters = {
  lapl1Filter: [
    [0, -1, 0],
    [-1, 4, -1],
    [0, -1, 0],
  ],
  lapl2Filter: [
    [-1, -1, -1],
    [-1, 8, -1],
    [-1, -1, -1],
  ],
  lapl3Filter: [
    [1, -2, 1],
    [-2, 4, -2],
    [1, -2, 1],
  ],
  lapldiagFilter: [
    [-1, 0, -1],
    [0, 4, 0],
    [-1, 0, -1],
  ],
};

module.exports = { laplaceFilters };
