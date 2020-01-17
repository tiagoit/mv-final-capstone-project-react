import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';

const Register = ({ user, login }) => {
  const [state, setState] = React.useState({ name: '', email: '', password: '', passwordConfirmation: '', error: false });

  const handleChange = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setState({ ...state, [ev.target.name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setState({ error: false });
    const API_URL = 'http://localhost:4000';
    fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name: state.name, email: state.email, password: state.password }),
    }).then(resp => resp.json()).then(data => {
      if (data.error) {
        setState({ error: true });
      } else {
        localStorage.setItem('token', data.jwt);
        login({ name: data.name, email: data.email });
      }
    });
  };

  if (state.user) return <Redirect to="/" />;
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="password" name="passwordConfirmation" placeholder="Password confirmation" onChange={handleChange} />
        <button type="submit">Register</button>
        {state.error && <div className="error">Please double check the form data.</div>}
      </form>
      Already registered? <Link to="/login">Login</Link>
    </div>
  );
};

Register.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  login: PropTypes.func.isRequired,
};
Register.defaultProps = { user: null };

const mapStateToProps = (state) => ({ user: state.auth.user });
const mapDispatchToProps = (dispatch) => ({
  login: user => dispatch(loginAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
