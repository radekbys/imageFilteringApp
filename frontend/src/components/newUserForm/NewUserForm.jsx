/* eslint-disable react/prop-types */
import { useState } from 'react';
import './NewUserForm.css';
import serverUrl from '../../serverURL.json';

function NewUserForm(props) {
  const { toggleRefreshUsers } = props;
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

  const submitNewUser = async (event) => {
    event.preventDefault();

    const res = await fetch(`${serverUrl.url}/admin/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });

    if (res.status !== 200) {
      console.log(await res.json());
      return;
    }

    setNewUser({
      newUsername: '',
      newEmail: '',
      newAdmin: false,
      newPassword: '',
    });
    toggleRefreshUsers();
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
