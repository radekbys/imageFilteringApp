/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import filterRouter from './routers/filterRouter.js';
import adminRouter from './routers/adminRouter.js';
import loginRouter from './routers/loginRouter.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
app.use(bodyParser.raw({
  type: 'image/png',
  limit: '50mb',
}));
app.use(bodyParser.raw({
  type: 'image/gif',
  limit: '50mb',
}));
app.use(bodyParser.raw({
  type: 'image/jpeg',
  limit: '50mb',
}));
app.use(bodyParser.raw({
  type: 'image/bmp',
  limit: '50mb',
}));
app.use(bodyParser.raw({
  type: 'image/tiff',
  limit: '50mb',
}));

app.use('/filter', filterRouter);
app.use('/admin', adminRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}!`);
});
