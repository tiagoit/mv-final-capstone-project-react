import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import Category from './Category';
import categories from '../constants/categories';
import { prettifySlug } from '../helpers';

export default function Home() {
  return (
    <Router>
      <h2>Categories</h2>
      <ul>
        {Object.keys(categories).map(c => (<li key={c}><Link to={`/${c}`}>{prettifySlug(c)}</Link></li>))}
      </ul>

      <Switch>
        <Route path="/:categorySlug"><Category /></Route>
      </Switch>
    </Router>
  );
}
