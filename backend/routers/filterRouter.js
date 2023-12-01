import express from 'express';
import { writeFile, readFile } from 'fs/promises';
// import { v4 as uuidv4 } from 'uuid';
import util from 'util';
import { exec } from 'child_process';
import { resolve } from 'path';

const filterRouter = express.Router();
const promisifiedExec = util.promisify(exec);

filterRouter
  .post('/', async (req, res) => {
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
      throw new Error('Invalid filetype, must be one of : image/jpeg, image/png, image/bmp, image/gif, image/tiff');
    }
    const path = resolve('../filterApp/index.js');
    const command = `node ${path} ${filterName} ${`${req.body.user}-input${filenameExtension}`} ${`${req.body.user}-output${filenameExtension}`} ${Number(req.body.epsilon)}`;
    await writeFile(`../images/${req.body.user}-input${filenameExtension}`, req.body['file-base64'], { encoding: 'base64' });
    await promisifiedExec(command);
    res.status = 200;
    res.send('OK');
  })
  .get('/', async (req, res) => {
    const { username, type } = req.query;
    let filenameExtension;
    if (type === 'image/jpeg') {
      filenameExtension = '.jpg';
    } else if (type === 'image/png') {
      filenameExtension = '.png';
    } else if (type === 'image/bmp') {
      filenameExtension = '.bmp';
    } else if (type === 'image/gif') {
      filenameExtension = '.gif';
    } else if (type === 'image/tiff') {
      filenameExtension = '.tiff';
    } else {
      throw new Error('Invalid filetype, must be one of : image/jpeg, image/png, image/bmp, image/gif, image/tiff');
    }
    const output = await readFile(`../images/${username}-output${filenameExtension}`, 'base64');
    res.json(output);
  });

export default filterRouter;
