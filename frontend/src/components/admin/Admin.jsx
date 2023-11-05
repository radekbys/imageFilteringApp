import { useState } from 'react';
import './Admin.css';
import NewUserForm from '../newUserForm/NewUserForm';
import RemoveUserForm from '../removeUserForm/RemoveUserForm';
import ManagePrivilegesForm from '../managePrivilegesForm/ManagePrivilegesForm';
import dummyUsers from '../../utils/dummyUsers';

function Admin() {
  // eslint-disable-next-line no-unused-vars
  const [allUsers, setAllUsers] = useState(dummyUsers);

  const users = (
    <ul className="all-users-list">
      {
    allUsers.map((user) => (
      <li className="all-users-list-element" key={user.username}>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.isAdmin && '*'}</p>
      </li>
    ))
      }
    </ul>
  );

  return (
    <div className="admin-panel">
      <NewUserForm />
      <br />
      <RemoveUserForm />
      <br />
      <ManagePrivilegesForm />
      <br />
      <div className="admin-all-users">
        <h2>All Users:</h2>
        <h3>username:</h3>
        <h3>Email:</h3>
        <h3>isAdmin:</h3>
        {users}
      </div>
    </div>
  );
}

export default Admin;
