/* eslint-disable react/prop-types */
import { useState } from 'react';
import './RemoveUserForm.css';
import serverUrl from '../../serverURL.json';

function RemoveUserForm(props) {
  const { toggleRefreshUsers } = props;
  const [removedUser, setRemovedUser] = useState({ username: '' });

  const updateRemovedUser = (event) => {
    const remUsername = event.target.value;
    setRemovedUser({
      username: remUsername,
    });
  };

  const removeUser = async (event) => {
    event.preventDefault();

    await fetch(`${serverUrl.url}/admin/user`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(removedUser),
    });

    setRemovedUser({
      username: '',
    });

    toggleRefreshUsers();
  };

  return (
    <form className="remove-user-form" onSubmit={removeUser}>
      <h2 className="form-header">Remove User:</h2>
      <div>
        <label className="form-label" htmlFor="form-input-removed">{'Username: '}</label>
        <input
          type="text"
          id="form-input-removed"
          name="formRemovedUser"
          value={removedUser.username}
          onChange={updateRemovedUser}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RemoveUserForm;
