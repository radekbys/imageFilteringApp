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

  const submitLogIn = (event) => {
    event.preventDefault();
    console.log(loginInput);
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
