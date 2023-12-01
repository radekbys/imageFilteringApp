const Jimp = require('jimp');
const sanitize = require('sanitize-filename');
const { resolve } = require('path');
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

const inputFile = resolve(__dirname, `../images/${sanitize(process.argv[3])}`);
const outputFile = resolve(__dirname, `../images/${sanitize(process.argv[4])}`);

if (usedSimpleFilter) {
  const sequence = async () => {
    const image = await Jimp.read(inputFile);
    const filteredBuffer = Filter.simpleFilter(
      image.bitmap.data,
      image.bitmap.width,
      image.bitmap.height,
      usedSimpleFilter,
    );
    image.bitmap.data = filteredBuffer;
    image.write(outputFile);
  };
  sequence();
}

if (process.argv[2] === 'median') {
  const sequence = async () => {
    const image = await Jimp.read(inputFile);
    const filteredBuffer = await Filter.medianFilter(
      image.bitmap.data,
      image.bitmap.width,
      image.bitmap.height,
    );
    image.bitmap.data = filteredBuffer;
    image.write(outputFile);
  };
  sequence();
}

if (process.argv[2] === 'bayess') {
  const sequence = async () => {
    const image = await Jimp.read(inputFile);
    let epsilon = Number(process.argv[5]);
    if (epsilon < 0.00000000000000000000000006) epsilon = 1;
    const filteredBuffer = await Filter.bayessFilter(
      image.bitmap.data,
      image.bitmap.width,
      image.bitmap.height,
      epsilon,
    );
    image.bitmap.data = filteredBuffer;
    image.write(outputFile);
  };
  sequence();
}
