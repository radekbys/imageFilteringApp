// high pass filters let through elements of high frequency(edges etc.), gives a sharpening effect
// filters are ordered from strongest at the top to mildest at the bottom
const highPassFilters = {
  meanRemovalFilter: [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1],
  ],
  hp1Filter: [
    [0, -1, 0],
    [-1, 5, -1],
    [0, -1, 0],
  ],
  hp2Filter: [
    [1, -2, 1],
    [-2, 5, -2],
    [1, -2, 1],
  ],
  hp3Filter: [
    [0, -1, 0],
    [-1, 20, -1],
    [0, -1, 0],
  ],
};

module.exports = { highPassFilters };
