import { useState } from 'react';
import './RemoveUserForm.css';

function RemoveUserForm() {
  // eslint-disable-next-line no-unused-vars
  const [removedUser, setRemovedUser] = useState({ username: '' });

  const updateRemovedUser = (event) => {
    const remUsername = event.target.value;
    setRemovedUser({
      username: remUsername,
    });
  };

  const removeUser = (event) => {
    event.preventDefault();
    console.log(removedUser);
    setRemovedUser({
      username: '',
    });
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
