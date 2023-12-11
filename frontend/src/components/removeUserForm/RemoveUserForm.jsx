/* eslint-disable react/prop-types */
import { useState } from 'react';
import './RemoveUserForm.css';

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

    const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/admin/user`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Json-Web-Token': String(localStorage.getItem('token')),
      },
      body: JSON.stringify(removedUser),
    });

    if (res.status !== 200) {
      window.alert(`Error ${(await res.json()).error}`);
      return;
    }

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
