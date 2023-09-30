const Jimp = require('jimp');
const { Filter } = require('./utils/Filter');
const { lowPassFilters } = require('./filters/lowPassFilters');
const { highPassFilters } = require('./filters/highPassFilters ');
const { embossingFilters } = require('./filters/embossingFilters');
const { laplaceFilters } = require('./filters/laplaceFilters');
const { contourFilters } = require('./filters/contourFilters');

// console.log(process.argv);

(async () => {
  const bird = await Jimp.read('../images/bird.jpg');
  const time = Date.now();
  const filteredBuffer = Filter.simpleFilter(
    bird.bitmap.data,
    bird.bitmap.width,
    bird.bitmap.height,
    contourFilters.verticalSobelFilter,
  );
  console.log(Date.now() - time);
  bird.bitmap.data = filteredBuffer;
  bird.write('../images/output.jpg');
})();
