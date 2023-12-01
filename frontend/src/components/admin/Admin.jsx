import { useState, useEffect } from 'react';
import './Admin.css';
import NewUserForm from '../newUserForm/NewUserForm';
import RemoveUserForm from '../removeUserForm/RemoveUserForm';
import ManagePrivilegesForm from '../managePrivilegesForm/ManagePrivilegesForm';
import serverUrl from '../../serverURL.json';

function Admin() {
  // eslint-disable-next-line no-unused-vars
  const [allUsers, setAllUsers] = useState([{
    username: '',
    email: '',
    isAdmin: false,
  }]);
  const [getUsersTrigger, setGetUsersTrigger] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const toggleRefreshUsers = () => {
    setGetUsersTrigger(!getUsersTrigger);
  };

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

  useEffect(() => {
    const sequence = async () => {
      const temp = await fetch(`${serverUrl.url}/admin/user`, {
        method: 'GET',
      });
      setAllUsers(await temp.json());
    };
    sequence();
  }, [getUsersTrigger]);

  return (
    <div className="admin-panel">
      <NewUserForm toggleRefreshUsers={toggleRefreshUsers} />
      <br />
      <RemoveUserForm toggleRefreshUsers={toggleRefreshUsers} />
      <br />
      <ManagePrivilegesForm toggleRefreshUsers={toggleRefreshUsers} />
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
