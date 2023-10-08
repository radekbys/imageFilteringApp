import React from 'react';
import './Nav.css';

// eslint-disable-next-line react/prop-types
function Nav({ toggleLogin, toggleFiltration, toggleAdmin }) {
  return (
    <div>
      <nav className="navigation-bar">
        <div className="navigation-bar--acronym">FO</div>
        <ul className="navigation-bar--elements">
          <li className="navigation-bar--element">
            <button
              type="button"
              className="nav-bar--button"
              onClick={toggleLogin}
            >
              LOG
            </button>
          </li>
          <li className="navigation-bar--element">
            <button
              type="button"
              className="nav-bar--button"
              onClick={toggleFiltration}
            >
              FIL
            </button>
          </li>
          <li className="navigation-bar--element">
            <button
              type="button"
              className="nav-bar--button"
              onClick={toggleAdmin}
            >
              ADM
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
