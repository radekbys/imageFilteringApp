import './Admin.css';
import NewUserForm from '../newUserForm/NewUserForm';
import RemoveUserForm from '../removeUserForm/RemoveUserForm';

function Admin() {
  return (
    <div className="admin-panel">
      <NewUserForm />
      <br />
      <RemoveUserForm />
      <div className="admin-all-users">
        <h2>All Users:</h2>
        <p>username</p>
        <p>Email</p>
        <p>isAdmin</p>
      </div>
    </div>
  );
}

export default Admin;
