/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Login.css';

function Login() {
  const [loginInput, setLoginInput] = useState({
    login: '',
    password: '',
  });

  const changeLoginInput = (event) => {
    setLoginInput((oldInput) => ({
      ...oldInput,
      [event.target.name]: event.target.value,
    }));
  };

  const submitLogIn = async (event) => {
    event.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: loginInput.login,
        password: loginInput.password,
      }),
    });
    if (res.status !== 200) {
      window.alert(`Error ${(await res.json()).error}`);
      return;
    }
    const dataToSave = await res.json();

    // save needed information in local storage
    localStorage.setItem('token', dataToSave.token);
    localStorage.setItem('username', dataToSave.username);
    localStorage.setItem('isAdmin', dataToSave.isAdmin);
    const expiration = new Date().getTime() + (1000 * 60 * 30);
    localStorage.setItem('expires', expiration);

    // reload the page
    window.location.reload();

    setLoginInput({
      login: '',
      password: '',
    });
  };

  return (
    <div className="login-main-body">
      <form onSubmit={submitLogIn}>
        <h2>Login:</h2>
        <label className="login-form-label" htmlFor="login-form-username">
          <p>Username:</p>
          <input
            id="login-form-username"
            type="text"
            value={loginInput.login}
            name="login"
            onChange={changeLoginInput}
          />
        </label>
        <label className="login-form-label" htmlFor="login-form-password">
          <p>Password:</p>
          <input
            id="login-form-password"
            type="password"
            value={loginInput.password}
            name="password"
            onChange={changeLoginInput}
          />
        </label>
        <br />
        <button className="login-button" type="submit">Log In</button>
      </form>
    </div>
  );
}

export default Login;
