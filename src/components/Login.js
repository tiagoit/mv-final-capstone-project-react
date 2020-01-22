import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginAction, addFavouriteAction } from '../redux/actions';
import AuthAPI from '../api/AuthAPI';
import FavouritesAPI from '../api/FavouritesAPI';

const Login = ({ isLoggedIn, rxLogin, rxAddFavorite }) => {
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

          FavouritesAPI
            .getFavourites()
            .then(resp => resp.json()).then(favourites => {
              favourites.forEach(favorite => {
                rxAddFavorite(favorite.provider_id);
              });
            });
        }
      });
  };

  if (isLoggedIn) return <Redirect to="/" />;
  return (
    <div>
      <h2>Login</h2>
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
  rxAddFavorite: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn });
const mapDispatchToProps = (dispatch) => ({
  rxLogin: user => dispatch(loginAction(user)),
  rxAddFavorite: id => dispatch(addFavouriteAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
