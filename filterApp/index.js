const Jimp = require('jimp');
const sanitize = require('sanitize-filename');
const { Filter } = require('./utils/Filter');
const { lowPassFilters } = require('./filters/lowPassFilters');
const { highPassFilters } = require('./filters/highPassFilters ');
const { embossingFilters } = require('./filters/embossingFilters');
const { laplaceFilters } = require('./filters/laplaceFilters');
const { contourFilters } = require('./filters/contourFilters');

// check if the filter is in the filters object
// if it is, return the filter
const getFilterIfInObject = (filterName, filtersObject) => {
  if (Object.keys(filtersObject).includes(filterName)) {
    return filtersObject[filterName];
  }
  return null;
};

// check filters objects for searched filter
const usedSimpleFilter = getFilterIfInObject(process.argv[2], lowPassFilters)
|| getFilterIfInObject(process.argv[2], highPassFilters)
|| getFilterIfInObject(process.argv[2], embossingFilters)
|| getFilterIfInObject(process.argv[2], laplaceFilters)
|| getFilterIfInObject(process.argv[2], contourFilters);

const inputFile = `../images/${sanitize(process.argv[3])}`;
const outputFile = `../images/${sanitize(process.argv[4])}`;

if (usedSimpleFilter) {
  (async () => {
    const time = Date.now(); // comment this out
    const image = await Jimp.read(inputFile);
    const filteredBuffer = Filter.simpleFilter(
      image.bitmap.data,
      image.bitmap.width,
      image.bitmap.height,
      usedSimpleFilter,
    );
    image.bitmap.data = filteredBuffer;
    image.write(outputFile);
    console.log(Date.now() - time); // comment this out
  })();
}
if (process.argv[2] === 'median') {
  (async () => {
    const time = Date.now(); // comment this out
    const image = await Jimp.read(inputFile);
    const filteredBuffer = await Filter.medianFilter(
      image.bitmap.data,
      image.bitmap.width,
      image.bitmap.height,
    );
    image.bitmap.data = filteredBuffer;
    image.write(outputFile);
    console.log(Date.now() - time); // comment this out
  })();
}
