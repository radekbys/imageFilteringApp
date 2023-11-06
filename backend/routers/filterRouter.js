import express from 'express';
import { writeFile, readFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import util from 'util';
import { exec } from 'child_process';

const filterRouter = express.Router();
const promisifiedExec = util.promisify(exec);

filterRouter.get('/', async (req, res) => {
  const filterName = req.body['filter-name'];

  const uuid = uuidv4();

  let filenameExtension;
  if (req.body.file.mime === '@file/jpeg') filenameExtension = '.jpg';

  try {
    await writeFile(`../images/${uuid}.jpg`, req.body.file.data, { encoding: 'base64' });
    await promisifiedExec(`node ../filterAppNodeVersion/index.js ${filterName} ${uuid + filenameExtension} ${`${uuid}-output${filenameExtension}`}`);
    const output = await readFile(`../images/${uuid}-output${filenameExtension}`, 'base64');

    const responseObject = {};
    responseObject.mime = req.body.file.mime;
    responseObject.data = output;

    res.status = 200;
    res.json(responseObject);
  } catch (err) {
    res.status = 500;
    res.send(err.message);
  }
});

export default filterRouter;
