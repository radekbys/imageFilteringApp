import { sha256 } from 'js-sha256';

class MockDatabase {
  constructor() {
    this.data = [
      {
        username: 'dummyUser1',
        isAdmin: false,
        email: 'dummyUser1@gmail.com',
        passwordHash: sha256('password'),
      },
      {
        username: 'dummyUser2',
        isAdmin: false,
        email: 'dummyUser2@gmail.com',
        passwordHash: sha256('password'),
      },
      {
        username: 'dummyUser3',
        isAdmin: false,
        email: 'dummyUser3@gmail.com',
        passwordHash: sha256('password'),
      },
      {
        username: 'dummyAdmin1',
        isAdmin: true,
        email: 'dummyAdmin1@gmail.com',
        passwordHash: sha256('password'),
      },
    ];
  }

  getUsers() {
    return this.data;
  }

  getUser(username) {
    return this.data.find((element) => element.username === username);
  }

  addUser(username, password, isAdmin, email) {
    const user = {
      username,
      isAdmin,
      email,
      passwordHash: sha256(password),
    };
    this.data.push(user);
  }

  removeUser(username) {
    this.data = this.data.filter((user) => user.username !== username);
  }

  changePrivilege(username, isAdmin) {
    for (let i = 0; i < this.data.length; i += 1) {
      if (this.data[i].username === username) {
        this.data[i].isAdmin = isAdmin;
      }
    }
  }
}
export default MockDatabase;
