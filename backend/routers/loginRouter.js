/* eslint-disable import/extensions */
import express from 'express';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';
import dbHandler from '../utils/DatabaseHandler.js';

const loginRouter = express.Router();

loginRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;

    const secret = process.env.SECRET_JWT;

    const user = await dbHandler.getUser(username);
    if (!user) {
      const error = new Error('Wrong username or password');
      error.status = 400;
      throw error;
    }
    if (sha256(password) !== user.passwordHash) {
      const error = new Error('Wrong username or password');
      error.status = 400;
      throw error;
    }

    const toTokenObject = { username: user.username };

    const token = jwt.sign(toTokenObject, secret, { expiresIn: 60 * 30 });
    const responseObject = {
      message: 'logged in successfully',
      isAdmin: user.isAdmin,
      username,
      token,
    };
    res.json(responseObject);
  } catch (error) {
    res.status(error.status || 500);
    res.send({ error: error.message });
  }
});

export default loginRouter;
