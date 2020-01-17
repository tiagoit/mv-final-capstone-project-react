import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.scss';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Favourites from './Favourites';
import { logoutAction } from '../redux/actions';

const App = ({ isLoggedIn, user, logout }) => (
  <Router>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn && <li><Link to="/login">Login</Link></li>}
        {!isLoggedIn && <li><Link to="/register">New user</Link></li>}
        {isLoggedIn && <li><Link to="/favourites">Favourite providers</Link></li>}
        {isLoggedIn && <li>{user.name}</li>}
        {isLoggedIn && <li><button type="button" onClick={() => logout()}>Logout</button></li>}
      </ul>
    </nav>

    <Switch>
      <Route path="/favourites"><Favourites /></Route>
      <Route path="/login"><Login /></Route>
      <Route path="/register"><Register /></Route>
      <Route path="/"><Home /></Route>
    </Switch>
  </Router>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ isLoggedIn: state.auth.isLoggedIn, user: state.auth.user });
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
