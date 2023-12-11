import { useState, useEffect } from 'react';
import './Admin.css';
import NewUserForm from '../newUserForm/NewUserForm';
import RemoveUserForm from '../removeUserForm/RemoveUserForm';
import ManagePrivilegesForm from '../managePrivilegesForm/ManagePrivilegesForm';

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
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/admin/user`, {
        method: 'GET',
        headers: {
          'Json-Web-Token': String(localStorage.getItem('token')),
        },
      });

      if (res.status !== 200) {
        // console.log(await res.json());
        window.alert(`Error ${(await res.json()).error}`);
        return;
      }

      setAllUsers(await res.json());
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
