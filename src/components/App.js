import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.scss';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Favourites from './Favourites';
import { logoutAction, loginAction } from '../redux/actions';

const App = ({ isLoggedIn, user, rxLogin, rxLogout }) => {
  if (!isLoggedIn && localStorage.getItem('token')) {
    rxLogin({
      name: localStorage.getItem('name'),
      email: localStorage.getItem('email'),
      token: localStorage.getItem('token'),
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    rxLogout();
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>

            {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
            {!isLoggedIn && <li><Link to="/register">New user</Link></li>}

            {isLoggedIn && <li><Link to="/favourites">Favourite providers</Link></li>}
            {isLoggedIn && <li>{user.name}</li>}
            {isLoggedIn && <li><button type="button" onClick={handleLogout}>Logout</button></li>}
          </ul>
        </nav>

        <Switch>
          <Route path="/favourites"><Favourites /></Route>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  rxLogin: PropTypes.func.isRequired,
  rxLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn, user: state.auth.user });
const mapDispatchToProps = (dispatch) => ({
  rxLogin: (user) => dispatch(loginAction(user)),
  rxLogout: () => dispatch(logoutAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
