import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginAction } from '../redux/actions';

const Login = ({ login, isLoggedIn }) => {
  const [state, setState] = React.useState({ email: '', error: false });

  const handleChange = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setState({ ...state, [ev.target.name]: value, error: false });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setState({ error: false });
    fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email: state.email, password: state.password }),
    }).then(resp => resp.json()).then(data => {
      if (data.error) {
        setState({ error: true });
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.user.name);
        localStorage.setItem('email', data.user.email);
        login(data.user);
      }
    });
  };

  if (isLoggedIn) return <Redirect to="/" />;
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Login</button>
        {state.error && <div className="error">Invalid email or password.</div>}
      </form>
      New user? <Link to="/register">Register</Link>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });
const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(loginAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
