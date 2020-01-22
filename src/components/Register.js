import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

import { loginAction } from '../redux/actions';
import AuthAPI from '../api/AuthAPI';

const Register = ({ rxLogin, isLoggedIn }) => {
  const [form, setForm] = React.useState({ name: '', email: '', password: '', passwordConfirmation: '', errorMessage: '' });
  const handleChange = ev => setForm({ ...form, errorMessage: '', [ev.target.name]: ev.target.value });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setForm({ ...form, errorMessage: '' });

    AuthAPI
      .register(form.name, form.email, form.password)
      .then(resp => resp.json()).then(data => {
        if (data.errors) {
          setForm({ ...form, errorMessage: data.errors[0] });
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
      <Typography variant="h4" component="h1">Register</Typography>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="password" name="passwordConfirmation" placeholder="Password confirmation" onChange={handleChange} />
        <button type="submit">Register</button>
        <div className="error">{form.errorMessage}</div>
      </form>
      Already registered? <Link to="/login">Login</Link>
    </div>
  );
};

Register.propTypes = {
  rxLogin: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });
const mapDispatchToProps = (dispatch) => ({
  rxLogin: user => dispatch(loginAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
