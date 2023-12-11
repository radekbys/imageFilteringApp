import { useState, useEffect } from 'react';
import './App.css';
import Nav from '../nav/Nav';
import Filter from '../filter/Filter';
import Admin from '../admin/Admin';
import Login from '../login/Login';

function App() {
  const [main, setMain] = useState({
    login: true,
    filtration: false,
    administration: false,
  });

  const toggleAdmin = () => {
    setMain({
      login: false,
      filtration: false,
      administration: true,
    });
  };

  const toggleFiltration = () => {
    setMain({
      login: false,
      filtration: true,
      administration: false,
    });
  };

  // clearing local storage if token expired
  useEffect(() => {
    const expiration = localStorage.getItem('expires');
    const now = new Date().getTime();
    if (now > expiration) {
      localStorage.clear();
      setMain({
        login: true,
        filtration: false,
        administration: false,
      });
      // reload window only once after clearing local storage
      const reloadCount = sessionStorage.getItem('reloadCount');
      if (reloadCount < 2) {
        sessionStorage.setItem('reloadCount', String(reloadCount + 1));
        window.location.reload();
      } else {
        sessionStorage.removeItem('reloadCount');
      }
    }
  }, []);

  return (
    <div className="App">
      <Nav
        toggleAdmin={toggleAdmin}
        toggleFiltration={toggleFiltration}
      />
      {main.filtration && <Filter />}
      {main.login && <Login />}
      {main.administration && <Admin />}
    </div>
  );
}

export default App;
