import React, { useState } from 'react';
import './App.css';
import Nav from '../nav/Nav';
import Footer from '../footer/Footer';
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

  const toggleLogin = () => {
    setMain({
      login: true,
      filtration: false,
      administration: false,
    });
  };

  const toggleFiltration = () => {
    setMain({
      login: false,
      filtration: true,
      administration: false,
    });
  };

  return (
    <div className="App">
      <Nav
        toggleAdmin={toggleAdmin}
        toggleLogin={toggleLogin}
        toggleFiltration={toggleFiltration}
      />
      {main.filtration && <Filter />}
      {main.login && <Login />}
      {main.administration && <Admin />}
      <Footer />
    </div>
  );
}

export default App;
