/* eslint-disable import/extensions */
import express from 'express';
import filterRouter from './routers/filterRouter.js';

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use('/filter', filterRouter);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
