const embossingFilters = {
  eastFilter: [
    [-1, 0, 1],
    [-1, 1, 1],
    [-1, 0, 1],
  ],
  southFilter: [
    [-1, -1, -1],
    [0, 1, 0],
    [1, 1, 1],
  ],
  westFilter: [
    [1, 0, -1],
    [1, 1, -1],
    [1, 0, -1],
  ],
  northFilter: [
    [1, 1, 1],
    [0, 1, 0],
    [-1, -1, -1],
  ],
};
module.exports = { embossingFilters };
