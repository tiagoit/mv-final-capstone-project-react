import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginAction, addFavouriteAction } from '../redux/actions';
import AuthAPI from '../api/AuthAPI';
import FavouritesAPI from '../api/FavouritesAPI';

const Login = ({ isLoggedIn, rxLogin, rxAddFavorite }) => {
  const [state, setState] = React.useState({ email: '', error: false });

  const handleChange = (ev) => {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setState({ ...state, [ev.target.name]: value, error: false });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setState({ error: false });

    AuthAPI
      .login(state.email, state.password)
      .then(resp => resp.json()).then(data => {
        if (data.error) {
          setState({ error: true });
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
