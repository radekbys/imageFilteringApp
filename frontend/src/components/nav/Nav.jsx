/* eslint-disable react/prop-types */
import './Nav.css';

function Nav({ toggleLogin, toggleFiltration, toggleAdmin }) {
  return (
    <div>
      <nav className="navigation-bar">
        <div className="navigation-bar--acronym">IF</div>
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
