/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './Nav.css';

function Nav({ toggleFiltration, toggleAdmin }) {
  const [filterDisabled, setFilterDisabled] = useState(true);
  const [adminDisabled, setAdminDisabled] = useState(true);

  useEffect(() => {
    setFilterDisabled(!localStorage.getItem('username'));
    setAdminDisabled(!Number(localStorage.getItem('isAdmin')));
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <nav className="navigation-bar">
        <div className="navigation-bar--acronym">IF</div>
        <ul className="navigation-bar--elements">
          <li className="navigation-bar--element">
            <button
              type="button"
              className="nav-bar--button"
              onClick={logout}
            >
              LOGOUT
            </button>
          </li>
          <li className="navigation-bar--element">
            <button
              type="button"
              className="nav-bar--button"
              onClick={toggleFiltration}
              disabled={filterDisabled}
            >
              FILTER
            </button>
          </li>
          <li className="navigation-bar--element">
            <button
              type="button"
              className="nav-bar--button"
              onClick={toggleAdmin}
              disabled={adminDisabled}
            >
              ADMIN
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
