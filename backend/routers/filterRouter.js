import express from 'express';
import { writeFile, readFile, unlink } from 'fs/promises';
// import { v4 as uuidv4 } from 'uuid';
import util from 'util';
import { exec } from 'child_process';
import { resolve } from 'path';

const filterRouter = express.Router();
const promisifiedExec = util.promisify(exec);

filterRouter
  .post('/', async (req, res) => {
    try {
      const filterName = req.body['filter-name'];
      let filenameExtension;
      if (req.body.type === 'image/jpeg') {
        filenameExtension = '.jpg';
      } else if (req.body.type === 'image/png') {
        filenameExtension = '.png';
      } else if (req.body.type === 'image/bmp') {
        filenameExtension = '.bmp';
      } else if (req.body.type === 'image/gif') {
        filenameExtension = '.gif';
      } else if (req.body.type === 'image/tiff') {
        filenameExtension = '.tiff';
      } else {
        const error = new Error('Invalid filetype, must be one of : image/jpeg, image/png, image/bmp, image/gif, image/tiff');
        error.status = 400;
        throw error;
      }

      // save and filter the file
      const path = resolve('../filterApp/index.js');
      const command = `node ${path} ${filterName} ${`${req.body.user}-input${filenameExtension}`} ${`${req.body.user}-output${filenameExtension}`} ${Number(req.body.epsilon)}`;
      await writeFile(`../images/${req.body.user}-input${filenameExtension}`, req.body['file-base64'], { encoding: 'base64' });
      await promisifiedExec(command);

      // read the output file
      const output = await readFile(`../images/${req.body.user}-output${filenameExtension}`, 'base64');

      // clean up
      const path1 = resolve('../images/', `${req.body.user}-input${filenameExtension}`);
      const path2 = resolve('../images/', `${req.body.user}-output${filenameExtension}`);
      await unlink(path1);
      await unlink(path2);

      // respond
      res.status(200);
      res.json(output);
    } catch (error) {
      res.status(error.status || 500);
      res.send({ error: error.message });
    }
  });

export default filterRouter;
