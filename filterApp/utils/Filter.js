const { writeFile, readFile, unlink } = require('fs').promises;
const { exec } = require('child_process');
const { promisify } = require('util');
const { v4: uuid } = require('uuid');

class Filter {
  // function that filters the image using simple filters
  // buffer is the imaga data in buffer format, width and height are the image dimensions in pixels
  // filter is an array of arrays containing the filters weights
  static simpleFilter(buffer, width, height, filter) {
    // transfers the image data into two separate arrays
    const data = [...buffer];
    const copyData = [...buffer];

    // if filter lenght = 3 then pixelOffset = 1, if length =5 then pixelOffset = 3, etc.
    const pixelOffset = (filter.length - 1) / 2;

    // first and last few rows mus be skipped
    for (let i = pixelOffset; i < height - pixelOffset; i += 1) {
      // last and first columns also need to be skipped
      for (let j = pixelOffset * 4; j < (width * 4) - (pixelOffset * 4); j += 1) {
      // one pixel takes 4 bytes of data
      // every 4th byte codes no color, needs to be skipped
        if ((j + 1) % 4 !== 0) {
        // sum of all neighboring pixels multipled by the filter weights
          let sum = 0;
          // divisor is the sum of filter weights
          let divisor = 0;

          // iterates over the whole filter matrix
          for (let k = 0; k < filter.length; k += 1) {
            for (let l = 0; l < filter[0].length; l += 1) {
              // finds the corresponding pixel in the image
              const componentAkl = data[
                ((i + k - pixelOffset) * width * 4) + j + (l - pixelOffset) * 4
              ];
              if (componentAkl) {
                // adds the filter weight
                divisor += filter[k][l];
                // multiplies the pixel by weight and adds it to the sum
                sum += filter[k][l] * componentAkl;
              }
            }
          }
          // makes sure the result is an integer in the value range of a byte
          let result = parseInt(sum / divisor, 10);
          if (result < 0) result = 0;
          if (result > 255) result = 255;

          copyData[(i * width * 4) + j] = result;
        }
      }
    }
    // returns the filtered image in buffer format
    return Buffer.from(copyData);
  }

  // creates a json with parameters and passes it to a C program
  static async medianFilter(buffer, width, height) {
    const promisifiedExec = promisify(exec);
    const passedObject = {
      width,
      height,
      image: [...buffer],
    };
    const passedJson = JSON.stringify(passedObject);
    const name = uuid();
    // save to json
    await writeFile(`./utils/medianFilterC/${name}.json`, passedJson);

    const time = Date.now(); // comment this out

    // run the filter
    await promisifiedExec(`cd utils && cd medianFilterC && ./main ${name}.json`);

    console.log(Date.now() - time); // comment this out

    // read the result
    const result = await readFile(`./utils/medianFilterC/output-${name}.json`, { encoding: 'utf8' });
    // delete temporary files
    await unlink(`./utils/medianFilterC/${name}.json`);
    await unlink(`./utils/medianFilterC/output-${name}.json`);
    // return the buffer
    return Buffer.from(JSON.parse(result).image);
  }
}

module.exports = { Filter };
