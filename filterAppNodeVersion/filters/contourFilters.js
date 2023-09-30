// they are used to find contours in the image
const contourFilters = {
  horizontalSobelFilter: [
    [1, 2, 1],
    [0, 0, 0],
    [-1, -2, -1],
  ],
  verticalSobelFilter: [
    [1, 0, -1],
    [2, 0, -2],
    [1, 0, -1],
  ],
  horizontalPrewittFilter: [
    [-1, -1, -1],
    [0, 0, 0],
    [1, 1, 1],
  ],
  verticalPrewittFilter: [
    [1, 0, -1],
    [1, 0, -1],
    [1, 0, -1],
  ],
};

module.exports = { contourFilters };
