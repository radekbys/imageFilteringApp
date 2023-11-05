import { useState } from 'react';
import './ManagePrivilegesForm.css';

function ManagePrivilegesForm() {
  const [managePrivilegesInputs, setManagePrivilegesInputs] = useState({
    username: '',
    giveAdmin: false,
    removeAdmin: false,
  });

  const updateManagePrivilegesInputs = (event) => {
    const {
      name, value, checked,
    } = event.target;
    if (name === 'username') {
      setManagePrivilegesInputs({
        ...managePrivilegesInputs,
        [name]: value,
      });
    } else if (name === 'giveAdmin') {
      setManagePrivilegesInputs({
        ...managePrivilegesInputs,
        giveAdmin: checked,
        removeAdmin: checked ? false : managePrivilegesInputs.removeAdmin,
      });
    } else if (name === 'removeAdmin') {
      setManagePrivilegesInputs({
        ...managePrivilegesInputs,
        removeAdmin: checked,
        giveAdmin: checked ? false : managePrivilegesInputs.giveAdmin,
      });
    }
  };

  const submitManagePrivilegesForm = (event) => {
    event.preventDefault();
    console.log(managePrivilegesInputs);
    setManagePrivilegesInputs({
      username: '',
      giveAdmin: false,
      removeAdmin: false,
    });
  };

  return (
    <form className="manage-privileges-form" onSubmit={submitManagePrivilegesForm}>
      <h2>
        Manage Privileges:
      </h2>
      <div className="manage-privileges-username-div">
        <label htmlFor="manage-privileges-username">
          Username:
          <input
            name="username"
            id="manage-privileges-username"
            type="text"
            value={managePrivilegesInputs.username}
            onChange={updateManagePrivilegesInputs}
          />
        </label>
      </div>
      <div className="manage-privileges-give-admin-role-div">
        <label htmlFor="manage-privileges-give-admin-role">
          Give Admin role:
          <input
            name="giveAdmin"
            id="manage-privileges-give-admin-role"
            type="checkbox"
            checked={managePrivilegesInputs.giveAdmin}
            onChange={updateManagePrivilegesInputs}
          />
        </label>
      </div>
      <div className="manage-privileges-remove-admin-role-div">
        <label htmlFor="manage-privileges-remove-admin-role">
          Remove Admin role:
          <input
            name="removeAdmin"
            id="manage-privileges-remove-admin-role"
            type="checkbox"
            checked={managePrivilegesInputs.removeAdmin}
            onChange={updateManagePrivilegesInputs}
          />
        </label>
      </div>
      <button className="manage-privileges-submit-button" type="submit">Submit</button>
    </form>
  );
}

export default ManagePrivilegesForm;
