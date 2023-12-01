import express from 'express';
import MockDatabase from '../utils/MockDatabase';

const database = new MockDatabase();

const filterRouter = express.Router();

filterRouter.get('/', (req, res) => {
  res.json(database.getUsers());
});

export default filterRouter;
