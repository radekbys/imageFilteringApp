/* eslint-disable import/extensions */
import express from 'express';
import MockDatabase from '../utils/MockDatabase.js';

const database = new MockDatabase();

const filterRouter = express.Router();

filterRouter
  .get('/user', (req, res) => {
    const response = database.getUsers().map((user) => ({
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    }));
    res.json(response);
  })

  .delete('/user', (req, res) => {
    const { username } = req.body;
    database.removeUser(username);
    res.send();
  })

  .patch('/user', (req, res) => {
    const { username } = req.body;
    const isAdmin = !!req.body.isAdmin;
    if (!username || typeof username !== 'string') {
      const error = new Error('Invalid username, must be not empty');
      error.status = 400;
      throw error;
    }
    database.changePrivilege(username, isAdmin);
    res.send();
  })

  .post('/user', (req, res) => {
    const newUser = req.body;
    if (!newUser.newUsername || typeof newUser.newUsername !== 'string') {
      const error = new Error('Invalid username, must be not empty');
      error.status = 400;
      throw error;
    }
    if (database.getUser(newUser.newUsername)) {
      const error = new Error('Invalid username, must be unique');
      error.status = 400;
      throw error;
    }
    if (!newUser.newPassword || typeof newUser.newPassword !== 'string') {
      const error = new Error('Invalid password, must be not empty');
      error.status = 400;
      throw error;
    }
    if (!newUser.newEmail || typeof newUser.newUsername !== 'string') {
      const error = new Error('Invalid email, must be not empty');
      error.status = 400;
      throw error;
    }
    const isAdmin = !!newUser.newAdmin;
    database.addUser(newUser.newUsername, newUser.newPassword, isAdmin, newUser.newEmail);
    res.send();
  });

export default filterRouter;
