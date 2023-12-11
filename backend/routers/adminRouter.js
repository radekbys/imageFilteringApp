/* eslint-disable import/extensions */
import express from 'express';
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';
import dbHandler from '../utils/DatabaseHandler.js';

const filterRouter = express.Router();

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
    let throwError = false;
    let username = '';
    jwt.verify(webToken, secret, async (err, user) => {
      if (err) {
        throwError = true;
        return;
      }
      username = user.username;
    });
    if (throwError) {
      const error = new Error('authorization failed, try reloging');
      error.status = 403;
      throw error;
    }

    // checks if such user exists
    const user = await dbHandler.getUser(username);
    if (!user) {
      const error = new Error('no such user exists, try reloging');
      error.status = 403;
      throw error;
    }
    if (!user.isAdmin) {
      const error = new Error('you are not an administrator, try reloging');
      error.status = 403;
      throw error;
    }

    next();
  } catch (error) {
    res.status(error.status || 500);
    res.send({ error: error.message });
  }
};

filterRouter
  .get('/user', authorization, async (req, res) => {
    try {
      const response = (await dbHandler.getUsers()).map((user) => ({
        username: user.username,
        email: user.email,
        isAdmin: Boolean(user.isAdmin),
      }));
      res.json(response);
    } catch (error) {
      res.status(error.status || 500);
      res.send({ error: error.message });
    }
  })

  .delete('/user', authorization, async (req, res) => {
    try {
      const { username } = req.body;
      await dbHandler.deleteUser(username);
      res.send();
    } catch (error) {
      res.status(error.status || 500);
      res.send({ error: error.message });
    }
  })

  .patch('/user', authorization, async (req, res) => {
    try {
      const { username } = req.body;
      const isAdmin = !!req.body.isAdmin;
      if (!username || typeof username !== 'string') {
        const error = new Error('Invalid username, must be not empty');
        error.status = 400;
        throw error;
      }
      await dbHandler.changeUserPrivilege(username, isAdmin);
      res.send();
    } catch (error) {
      res.status(error.status || 500);
      res.send({ error: error.message });
    }
  })

  .post('/user', authorization, async (req, res) => {
    try {
      const newUser = req.body;
      if (!newUser.newUsername || typeof newUser.newUsername !== 'string') {
        const error = new Error('Invalid username, must be not empty');
        error.status = 400;
        throw error;
      }

      if (await dbHandler.getUser(newUser.newUsername)) {
        const error = new Error('Invalid username, must be unique');
        error.status = 400;
        throw error;
      }

      if (!newUser.newPassword || typeof newUser.newPassword !== 'string') {
        const error = new Error('Invalid password, must be not empty');
        error.status = 400;
        throw error;
      }

      if (!newUser.newEmail || typeof newUser.newEmail !== 'string') {
        const error = new Error('Invalid email, must be not empty');
        error.status = 400;
        throw error;
      }

      const isAdmin = !!newUser.newAdmin;
      await dbHandler.addNewUser(
        newUser.newUsername,
        newUser.newEmail,
        sha256(newUser.newPassword),
        isAdmin,
      );

      res.status(200);
      res.send({ message: 'User created successfully' });
    } catch (error) {
      res.status(error.status || 500);
      res.send({ error: error.message });
    }
  });

export default filterRouter;
