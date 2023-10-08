import React, { useState } from 'react';
import './Main.css';
import Login from '../login/Login';
import Admin from '../admin/Admin';
import Filter from '../filter/Filter';

function Main() {
  const [underpage, setUnderpage] = useState({
    login: true,
    filtration: false,
    administration: false,
  });

  const selectAdmin = (event) => {
    event.preventDefault();
    setUnderpage({
      login: false,
      filtration: false,
      administration: true,
    });
  };

  const selectLogin = (event) => {
    event.preventDefault();
    setUnderpage({
      login: true,
      filtration: false,
      administration: false,
    });
  };

  const selectFiltration = (event) => {
    event.preventDefault();
    setUnderpage({
      login: false,
      filtration: true,
      administration: false,
    });
  };

  return (
    <div>
      <nav className="navigation-bar">
        <div className="navigation-bar--acronym">FO</div>
        <ul className="navigation-bar--elements">
          <li className="navigation-bar--element">
            <button
              type="button"
              className="nav-bar--button"
              onClick={selectLogin}
            >
              LOG
            </button>
          </li>
          <li className="navigation-bar--element">
            <button
              type="button"
              className="nav-bar--button"
              onClick={selectFiltration}
            >
              FIL
            </button>
          </li>
          <li className="navigation-bar--element">
            <button
              type="button"
              className="nav-bar--button"
              onClick={selectAdmin}
            >
              ADM
            </button>
          </li>
        </ul>
      </nav>

      {underpage.filtration && <Filter />}
      {underpage.login && <Login />}
      {underpage.administration && <Admin />}
    </div>
  );
}

export default Main;
