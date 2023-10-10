import { useState } from 'react';
import './NewUserForm.css';

function NewUserForm() {
// eslint-disable-next-line no-unused-vars
  const [newUser, setNewUser] = useState({
    newUsername: '',
    newEmail: '',
    newAdmin: false,
    newPassword: '',
  });

  const updateNewUser = (event) => {
    const {
      name, value, type, checked,
    } = event.target;
    setNewUser({
      ...newUser,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const submitNewUser = (event) => {
    event.preventDefault();
    console.log(newUser);
    setNewUser({
      newUsername: '',
      newEmail: '',
      newAdmin: false,
      newPassword: '',
    });
  };

  return (
    <form className="add-user-form" onSubmit={submitNewUser}>
      <h2 className="form-header">Add new User:</h2>
      <div>
        <label className="form-label" htmlFor="form-input-username">{'New user\'s username: '}</label>
        <input
          onChange={updateNewUser}
          type="text"
          id="form-input-username"
          name="newUsername"
          value={newUser.newUsername}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="form-input-email">{'New user\'s Email: '}</label>
        <input
          onChange={updateNewUser}
          type="email"
          id="form-input-email"
          name="newEmail"
          value={newUser.newEmail}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="form-input-admin">{'Give Admin role: '}</label>
        <input
          onChange={updateNewUser}
          type="checkbox"
          id="form-input-admin"
          name="newAdmin"
          checked={newUser.newAdmin}
        />
      </div>
      <div>
        <label className="form-label" htmlFor="form-input-password">{'New user\'s password: '}</label>
        <input
          onChange={updateNewUser}
          type="text"
          id="form-input-password"
          name="newPassword"
          value={newUser.newPassword}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NewUserForm;
