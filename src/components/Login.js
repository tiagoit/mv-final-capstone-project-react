import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { loginAction } from '../redux/actions';
import AuthAPI from '../api/AuthAPI';

const Login = ({ isLoggedIn, rxLogin }) => {
  const [form, setForm] = React.useState({ email: '', password: '', valid: true });
  const handleChange = ev => setForm({ ...form, valid: true, [ev.target.name]: ev.target.value });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setForm({ ...form, valid: true });

    AuthAPI
      .login(form.email, form.password)
      .then(resp => resp.json()).then(data => {
        if (data.error) {
          setForm({ ...form, valid: false });
        } else {
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', data.user.name);
          localStorage.setItem('email', data.user.email);
          rxLogin(data.user);
        }
      });
  };

  if (isLoggedIn) return <Redirect to="/" />;
  return (
    <div>
      <Typography variant="h4" component="h1">Login</Typography>

      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit">Login</button>
        {!form.valid && <div className="error">Invalid email or password.</div>}
      </form>
      New user? <Link to="/register">Register</Link>
    </div>
  );
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  rxLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });
const mapDispatchToProps = (dispatch) => ({
  rxLogin: user => dispatch(loginAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
