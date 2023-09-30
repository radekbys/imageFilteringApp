const Jimp = require('jimp');
const {Filter} = require('./Filter');
const lowPassFilters = require('./filters/LowPassFilters');


(async()=>{
const time = Date.now();
Math.floor(Date.now() / 1000)
const bird = await Jimp.read('bird.jpg');
const filteredBuffer = Filter.simpleFilter(bird.bitmap.data, bird.bitmap.width, bird.bitmap.height, lowPassFilters.coneFilter);
bird.bitmap.data = filteredBuffer;
bird.write('output.jpg');
console.log(Date.now() - time);
})();


