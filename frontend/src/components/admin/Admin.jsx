/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Admin.css';
import NewUserForm from '../newUserForm/NewUserForm';

function Admin() {
  return (
    <div className="admin-panel">
      <NewUserForm />
      <br />
      <form className="remove-user-form">
        <h2 className="form-header">Remove User:</h2>
        <div>
          <label className="form-label" htmlFor="form-input-removed">{'Username: '}</label>
          <input
            type="text"
            id="form-input-removed"
            name="formRemovedUser"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
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
