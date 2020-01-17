import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './App.scss';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Favourites from './Favourites';

const App = ({ user }) => (
  <Router>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favourites">Favourite providers</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">New user</Link></li>
      </ul>
      { user.name && <div>{user.name}</div>}
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
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

App.defaultProps = {
  user: {},
};

const mapStateToProps = (state) => ({ user: state.auth.user });
export default connect(mapStateToProps)(App);
