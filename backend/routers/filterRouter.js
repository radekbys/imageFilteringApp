/* eslint-disable import/extensions */
import express from 'express';
import { writeFile, readFile, unlink } from 'fs/promises';
import util from 'util';
import { exec } from 'child_process';
import { resolve } from 'path';
import jwt from 'jsonwebtoken';
import sanitize from 'sanitize-filename';
import dbHandler from '../utils/DatabaseHandler.js';

const filterRouter = express.Router();
const promisifiedExec = util.promisify(exec);

const authorization = async (req, res, next) => {
  try {
    const webToken = req.headers['json-web-token'];

    // check if web token has been send
    if (!webToken) {
      const error = new Error('Request lacks authorization token');
      error.status = 401;
      throw error;
    }

    // read the secret from file
    const secret = process.env.SECRET_JWT;

    // check authorization token
    let { username } = jwt.verify(webToken, secret);
    username = sanitize(username);

    // checks if such user exists
    const user = await dbHandler.getUser(username);
    if (!user) {
      const error = new Error('no such user exists, try reloging');
      error.status = 403;
      throw error;
    }
    next();
  } catch (error) {
    res.status(error.status || 500);
    if (error.message === 'jwt expired') error.message += ', try reloging';
    res.send({ error: error.message });
  }
};

filterRouter
  .post('/', authorization, async (req, res) => {
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
      const username = sanitize(req.body.user);
      const command = `node ${path} ${filterName} ${`${username}-input${filenameExtension}`} ${`${username}-output${filenameExtension}`} ${Number(req.body.epsilon)}`;
      await writeFile(`../images/${username}-input${filenameExtension}`, req.body['file-base64'], { encoding: 'base64' });
      await promisifiedExec(command);

      // read the output file
      const output = await readFile(`../images/${username}-output${filenameExtension}`, 'base64');

      // clean up
      const path1 = resolve('../images/', `${username}-input${filenameExtension}`);
      const path2 = resolve('../images/', `${username}-output${filenameExtension}`);
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
