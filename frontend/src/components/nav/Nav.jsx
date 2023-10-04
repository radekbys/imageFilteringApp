import React from 'react';
import './Nav.css';

function Nav() {
  return (
    <nav className="navigation-bar">
      <div className="navigation-bar--acronym">FO</div>
      <ul className="navigation-bar--elements">
        <li className="navigation-bar--element">
          <button type="button" className="nav-bar--button">LOG</button>
        </li>
        <li className="navigation-bar--element">
          <button type="button" className="nav-bar--button">FIL</button>
        </li>
        <li className="navigation-bar--element">
          <button type="button" className="nav-bar--button">ADM</button>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
