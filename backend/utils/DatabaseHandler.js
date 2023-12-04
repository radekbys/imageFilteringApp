/* eslint-disable import/extensions */
import pool from './database.js';

class DatabaseHandler {
  constructor() {
    this.pool = pool;
  }

  async getUsers() {
    const [usersList] = await this.pool.query('SELECT * FROM Users;');
    return usersList;
  }

  async getUser(username) {
    const [user] = await this.pool.query('SELECT * FROM Users WHERE username = ?;', [username]);
    return user[0];
  }

  async deleteUser(username) {
    await this.pool.query('DELETE FROM Users WHERE username = ?;', [username]);
  }

  async changeUserPrivilege(username, isAdmin) {
    if (isAdmin) {
      await this.pool.query('UPDATE Users SET isAdmin = 1 WHERE username = ?;', [username]);
    } else {
      await this.pool.query('UPDATE Users SET isAdmin = 0 WHERE username = ?;', [username]);
    }
  }

  async addNewUser(username, email, passwordHash, isAdmin) {
    await this.pool.query('INSERT INTO Users (username, email, passwordHash, isAdmin) VALUES (?, ?, ?, ?)', [username, email, passwordHash, isAdmin]);
  }
}
const dbHandler = new DatabaseHandler();

export default dbHandler;
