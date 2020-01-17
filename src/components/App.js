import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.scss';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Favourites from './Favourites';

const App = () => (
  <Router>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/favourites">Favourite providers</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">New user</Link></li>
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
export default App;
