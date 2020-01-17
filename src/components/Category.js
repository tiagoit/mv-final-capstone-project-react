import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams } from 'react-router-dom';
import { prettifySlug } from '../helpers';
import categories from '../constants/categories';
import Service from './Service';

const Category = () => {
  const { category } = useParams();
  return (
    <Router>
      <h2>Services</h2>
      {categories[category].map(service => (
        <Link to={`/${category}/${service}`} key={service}>
          {prettifySlug(service)}
        </Link>
      ))}
      <Switch>
        <Route path={`/${category}/:service`}><Service /></Route>
      </Switch>
    </Router>
  );
};
export default Category;
