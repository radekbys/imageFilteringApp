This is an image filtering app I'm writing as my engineering project.


Plan:
- A node app that will take command line input and filter image saved on the hard drive. 
  Uses Jimp module for reading and dissecting the bitmap.
  Uses sanitize-filename module to remove any dangerous user input
  Takes as iput the image filename, output image name, used filter acronym.

- An express.js REST API
  IT will run the filtering as an external process.

- React frontend application

- (optional) A GPU version of the filtering app in C


Tech stack:
- JavaScript
- Node
- Jimp module (MIT)
- sanitize-filename module (ISC)
- express.js
- React
- C
- jsonwebtoken module
<<<<<<< HEAD
- dotenv module
=======
>>>>>>> refs/remotes/origin/main
